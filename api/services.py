
from datetime import datetime
from api.db import db
from api.exceptions import BadRequestException, NotFoundException
from api.models import ShortUrl, ShortUrlCreate
import api.utils as utils


async def get_shortened_url(suffix: str) -> ShortUrl:
    shortened_url = await db.shortened_urls.find_one({"suffix": suffix})
    if not shortened_url:
        raise NotFoundException("La URL ingresada no existe")

    return ShortUrl(
        url=shortened_url.get("url"),
        suffix=shortened_url.get("suffix"),
        created_at=shortened_url.get("created_at"),
        expiration_time=shortened_url.get("expiration_time"),
        hits=shortened_url.get("hits", 0)
    )


async def exists_shortened_url(suffix: str):
    shortened_url = await db.shortened_urls.find_one({"suffix": suffix})
    return shortened_url is not None


async def create_shortened_url(short_url: ShortUrlCreate) -> ShortUrl:
    if not utils.is_valid_url(short_url.url):
        raise BadRequestException("La URL ingresada no es válida")

    suffix = utils.generate_suffix()
    while await exists_shortened_url(suffix):
        suffix = utils.generate_suffix()

    shortened_url = ShortUrl(
        url=short_url.url,
        suffix=suffix,
        created_at=str(datetime.now()),
        expiration_time=short_url.expiration_time if short_url.expiration_time else 3 * 24 * 60 * 60,
        hits=0
    )

    await db.shortened_urls.insert_one(shortened_url.model_dump())
    return shortened_url
