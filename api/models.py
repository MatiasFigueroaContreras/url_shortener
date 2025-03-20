from typing import Optional
from pydantic import BaseModel


class ShortUrl(BaseModel):
    url: str
    suffix: str
    created_at: str
    expiration_time: int
    hits: int


# Request models
class ShortUrlCreate(BaseModel):
    url: str
    expiration_time: Optional[int] = None
