from typing import Optional
from pydantic import BaseModel


class ClickInfo(BaseModel):
    """
    **Información de un clic en una URL acortada**

    Representa los datos recopilados cuando un usuario hace clic en una URL acortada.
    """
    ip: str  # Dirección IP del usuario
    country: str  # País de origen del usuario
    browser: str  # Navegador utilizado
    platform: str  # Sistema operativo del usuario
    device: str  # Tipo de dispositivo
    created_at: str  # Fecha y hora en la que se registró el clic


class ShortUrl(BaseModel):
    """
    **Modelo de una URL acortada**
    
    Representa una URL que ha sido acortada con su información asociada.
    """
    url: str  # URL original antes de ser acortada
    suffix: str  # Código corto generado para la URL
    created_at: str  # Fecha y hora en la que se creó la URL acortada
    expiration_time: int  # Tiempo de expiración en segundos
    hits: int  # Número total de veces que se ha accedido a esta URL
    clicks: list[ClickInfo] # Lista de clics registrados con información del usuario


class ShortUrlStats(BaseModel):
    """
    **Estadísticas de una URL acortada**

    Contiene información detallada sobre el uso de una URL acortada.
    """
    hits: int  # Total de clics en la URL
    unique_hits: int  # Total de usuarios únicos que hicieron clic
    countries_hits: dict[str, int] # Clics por país (clave: país, valor: cantidad)
    browsers_hits: dict[str, int]  # Clics por navegador
    platforms_hits: dict[str, int]  # Clics por sistema operativo
    devices_hits: dict[str, int]  # Clics por tipo de dispositivo


# Request models
class ShortUrlCreate(BaseModel):
    """
    **Modelo para la creación de una URL acortada**

    Se utiliza para recibir datos cuando un usuario solicita acortar una URL.
    """
    url: str
    suffix: Optional[str] = None
    expiration_time: Optional[int] = None
