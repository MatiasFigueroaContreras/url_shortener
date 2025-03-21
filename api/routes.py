from fastapi import APIRouter, Request
from api.models import ShortUrl, ShortUrlCreate, ShortUrlStats
from api import services


shortened_router = APIRouter(
    prefix="/api/v1/shortened", tags=["shortened"]
)


@shortened_router.get("/{suffix}", response_model=ShortUrl)
async def get_shortened_url(suffix: str) -> ShortUrl:
    """
    **Obtener una URL acortada**

    Recupera los detalles de una URL acortada a partir de su `suffix`.

    - **Parámetros**:
        - `suffix` (str): Código único que representa la URL acortada.

    - **Respuesta**:
        - Retorna un objeto `ShortUrl` con la URL original, número de visitas, fecha de creación, etc.
    """
    shortened_url = await services.get_shortened_url(suffix)
    return shortened_url


@shortened_router.post("", response_model=ShortUrl)
async def create_shortened_url(short_url: ShortUrlCreate) -> ShortUrl:
    """
    **Crear una URL acortada**

    Crea una nueva URL acortada a partir de una URL original.

    - **Parámetros**:
        - `short_url` (ShortUrlCreate): Objeto con la URL original un `suffix` y `expiration_time` opcional.

    - **Respuesta**:
        - Retorna un objeto `ShortUrl` con la URL acortada generada.
    """
    generated_url = await services.create_shortened_url(short_url)
    return generated_url


@shortened_router.get("/{suffix}/exists", response_model=bool)
async def check_shortened_url_exists(suffix: str) -> bool:
    """
    **Verificar si una URL acortada existe**

    Comprueba si una URL acortada con el `suffix` proporcionado ya está registrada.

    - **Parámetros**:
        - `suffix` (str): Código único que representa la URL acortada.

    - **Respuesta**:
        - Retorna `True` si la URL acortada existe, de lo contrario `False`.
    """
    return await services.exists_shortened_url(suffix)


@shortened_router.post("/{suffix}/clicks", response_model=ShortUrl)
async def click_shortened_url(suffix: str, request: Request) -> ShortUrl:
    """
    **Registrar un clic en la URL acortada**

    Guarda un nuevo clic en la URL acortada y registra información sobre el usuario.

    - **Parámetros**:
        - `suffix` (str): Código único que representa la URL acortada.

    - **Respuesta**:
        - Retorna el objeto `ShortUrl` actualizado con la nueva información de clics.
    """
    return await services.click_shortened_url(suffix, request)


@shortened_router.get("/{suffix}/stats", response_model=ShortUrlStats)
async def get_shortened_url_stats(suffix: str) -> ShortUrlStats:
    """
    **Obtener estadísticas de una URL acortada**

    Devuelve información sobre el uso de una URL acortada, incluyendo el número total de clics,
    dispositivos utilizados, navegadores y países de origen.

    - **Parámetros**:
        - `suffix` (str): Código único que representa la URL acortada.

    - **Respuesta**:
        - Retorna un objeto `ShortUrlStats` con las estadísticas de la URL acortada.
    """
    return await services.get_shortened_url_stats(suffix)
