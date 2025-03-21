## 📄 Documentación de la API

🔗 **URL de la documentación en producción:**  
[https://tu-url-acortador.vercel.app/api/docs](https://tu-url-acortador.vercel.app/api/docs)  

La API proporciona los siguientes endpoints:

### 📌 Endpoints

| Método | Endpoint                            | Descripción                                                                                |
| ------ | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/shortened/{suffix}`        | Obtiene los datos de una URL acortada a partir de su `suffix`.                             |
| `POST` | `/api/v1/shortened`                 | Crea una nueva URL acortada. Recibe un JSON con la URL original y un `suffix` opcional.    |
| `GET`  | `/api/v1/shortened/{suffix}/exists` | Verifica si una URL acortada existe. Retorna `true` o `false`.                             |
| `POST` | `/api/v1/shortened/{suffix}/clicks` | Registra un clic en la URL acortada y devuelve la información actualizada.                 |
| `GET`  | `/api/v1/shortened/{suffix}/stats`  | Obtiene estadísticas sobre el uso de una URL acortada (clics, países, dispositivos, etc.). |

## 🏗️ Modelo de Datos

La API maneja los siguientes modelos de datos:

### 📌 `ShortUrl`
Representa una URL acortada.

```json
{
  "url": "https://example.com",
  "suffix": "abc123",
  "created_at": "2024-03-21T12:00:00",
  "expiration_time": 3600,
  "hits": 10,
  "clicks": [
    {
      "ip": "192.168.1.1",
      "country": "US",
      "browser": "Chrome",
      "platform": "Windows",
      "device": "Desktop",
      "created_at": "2024-03-21T12:30:00"
    }
  ]
}
```

### 📌 `ShortUrlCreate`
Modelo utilizado para crear una URL acortada.

```json
{
  "url": "https://example.com",
  "suffix": "abc123",
  "expiration_time": 3600
}
```

- `url` (requerido): La URL original a acortar.
- `suffix` (opcional): Un identificador personalizado para la URL acortada.
- `expiration_time` (opcional): Tiempo en segundos antes de que la URL expire.

### 📌 `ShortUrlStats`
Modelo utilizado para mostrar estadísticas de una URL acortada.

```json
{
  "hits": 100,
  "unique_hits": 80,
  "countries_hits": {
    "US": 50,
    "ES": 30
  },
  "browsers_hits": {
    "Chrome": 60,
    "Firefox": 20
  },
  "platforms_hits": {
    "Windows": 40,
    "MacOS": 30
  },
  "devices_hits": {
    "Desktop": 70,
    "Mobile": 30
  }
}
```