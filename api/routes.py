from fastapi import APIRouter, Request
from api.models import ShortUrl, ShortUrlCreate, ShortUrlStats
from api import services


shortened_router = APIRouter(
    prefix="/api/v1/shortened", tags=["shortened"]
)


@shortened_router.get("/{suffix}", response_model=ShortUrl)
async def get_shortened_url(suffix: str) -> ShortUrl:
    print("get_shortened_url")
    shortened_url = await services.get_shortened_url(suffix)
    return shortened_url


@shortened_router.post("", response_model=ShortUrl)
async def create_shortened_url(short_url: ShortUrlCreate) -> ShortUrl:
    generated_url = await services.create_shortened_url(short_url)
    return generated_url


@shortened_router.get("/{suffix}/exists", response_model=bool)
async def check_shortened_url_exists(suffix: str) -> bool:
    return await services.exists_shortened_url(suffix)


@shortened_router.post("/{suffix}/clicks", response_model=ShortUrl)
async def click_shortened_url(suffix: str, request: Request) -> ShortUrl:
    return await services.click_shortened_url(suffix, request)


@shortened_router.get("/{suffix}/stats", response_model=ShortUrlStats)
async def get_shortened_url_stats(suffix: str) -> ShortUrlStats:
    return await services.get_shortened_url_stats(suffix)
