from datetime import datetime
from fastapi import Request
from api.db import get_mongo_client
from api.exceptions import BadRequestException, NotFoundException
from api.models import ShortUrl, ShortUrlCreate, ShortUrlStats
import api.utils as utils


async def get_shortened_url(suffix: str) -> ShortUrl:
    db = get_mongo_client()
    shortened_url = db.shortened_urls.find_one({"suffix": suffix})
    if not shortened_url:
        raise NotFoundException("La URL ingresada no existe")
    return ShortUrl(
        url=shortened_url.get("url"),
        suffix=shortened_url.get("suffix"),
        created_at=shortened_url.get("created_at"),
        expiration_time=shortened_url.get("expiration_time"),
        hits=shortened_url.get("hits", 0),
        clicks=shortened_url.get("clicks", [])
    )


async def exists_shortened_url(suffix: str):
    db = get_mongo_client()
    shortened_url = db.shortened_urls.find_one({"suffix": suffix})
    return shortened_url is not None


async def create_shortened_url(short_url: ShortUrlCreate) -> ShortUrl:
    if not utils.is_valid_url(short_url.url):
        raise BadRequestException("La URL ingresada no es válida")
    
    suffix = short_url.suffix
    if suffix and await exists_shortened_url(suffix):
        raise BadRequestException("La URL personalizada ya está en uso")
    
    if suffix and not utils.is_valid_suffix(suffix):
        raise BadRequestException("La URL personalizada no es válida")
    
    if (not suffix):
        suffix = utils.generate_suffix()
        while await exists_shortened_url(suffix):
            suffix = utils.generate_suffix()

    default_expiration_time = 3 * 24 * 60 * 60  # 3 days

    shortened_url = ShortUrl(
        url=short_url.url,
        suffix=suffix,
        created_at=str(datetime.now()),
        expiration_time=short_url.expiration_time if short_url.expiration_time else default_expiration_time,
        hits=0,
        clicks=[]
    )
    db = get_mongo_client()
    db.shortened_urls.insert_one(shortened_url.model_dump())
    return shortened_url


async def click_shortened_url(suffix: str, request: Request) -> ShortUrl:
    db = get_mongo_client()
    shortened_url = db.shortened_urls.find_one({"suffix": suffix})
    if not shortened_url:
        raise NotFoundException("La URL ingresada no existe")

    current_timestamp = datetime.now().timestamp()
    expiration_timestamp = utils.get_expiration_timestamp(
        shortened_url.get("created_at"), shortened_url.get("expiration_time"))

    if current_timestamp > expiration_timestamp:
        raise BadRequestException("La URL ingresada ha expirado")

    click_info = utils.extract_click_info(request)
    shortened_url["hits"] += 1
    shortened_url["clicks"] = shortened_url.get("clicks", [])
    shortened_url["clicks"].append(click_info)

    db.shortened_urls.update_one(
        {"suffix": suffix},
        {"$set": shortened_url}
    )

    return ShortUrl(
        url=shortened_url.get("url"),
        suffix=shortened_url.get("suffix"),
        created_at=shortened_url.get("created_at"),
        expiration_time=shortened_url.get("expiration_time"),
        hits=shortened_url.get("hits", 1),
        clicks=shortened_url.get("clicks", [click_info]))


async def get_shortened_url_stats(suffix: str) -> ShortUrlStats:
    db = get_mongo_client()
    shortened_url = db.shortened_urls.find_one({"suffix": suffix})
    if not shortened_url:
        raise NotFoundException("La URL ingresada no existe")

    hits = shortened_url.get("hits", 0)
    clicks = shortened_url.get("clicks", [])

    countries_hits = {}
    browsers_hits = {}
    platforms_hits = {}
    devices_hits = {}
    ip_hits = {}
    unique_hits = 0

    for click in clicks:
        # Verificar si la IP ya ha sido contada
        ip_hits[click["ip"]] = ip_hits.get(click["ip"], 0) + 1
        if (not click["ip"] == "Unknown") and (ip_hits[click["ip"]] == 1):
            unique_hits += 1

        country = click.get("country")
        browser = click.get("browser")
        platform = click.get("platform")
        device = click.get("device")

        countries_hits[country] = countries_hits.get(country, 0) + 1
        browsers_hits[browser] = browsers_hits.get(browser, 0) + 1
        platforms_hits[platform] = platforms_hits.get(platform, 0) + 1
        devices_hits[device] = devices_hits.get(device, 0) + 1

    return ShortUrlStats(
        hits=hits,
        unique_hits=unique_hits,
        countries_hits=countries_hits,
        browsers_hits=browsers_hits,
        platforms_hits=platforms_hits,
        devices_hits=devices_hits
    )
