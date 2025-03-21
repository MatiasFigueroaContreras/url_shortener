from typing import Optional
from pydantic import BaseModel


class ClickInfo(BaseModel):
    ip: str
    country: str
    browser: str
    platform: str
    device: str
    created_at: str


class ShortUrl(BaseModel):
    url: str
    suffix: str
    created_at: str
    expiration_time: int
    hits: int
    clicks: list[ClickInfo]


class ShortUrlStats(BaseModel):
    hits: int
    unique_hits: int
    countries_hits: dict[str, int]
    browsers_hits: dict[str, int]
    platforms_hits: dict[str, int]
    devices_hits: dict[str, int]


# Request models
class ShortUrlCreate(BaseModel):
    url: str
    expiration_time: Optional[int] = None
