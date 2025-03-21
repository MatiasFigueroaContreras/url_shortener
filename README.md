# URL Shortener

Proyecto que permite acortar URLs desarrollado con **Next.js** en el frontend y **FastAPI** en el backend.  
Está desplegado en **Vercel**, tanto el frontend como el backend, y utiliza una base de datos **MongoDB** en la nube.

🔗 **URL del proyecto en producción:** [https://sho-url.vercel.app](https://sho-url.vercel.app)

## 📌 Requisitos previos

Antes de ejecutar el proyecto en tu entorno local, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (Versión recomendada: 18 o superior)
- [Python](https://www.python.org/) (Versión recomendada: 3.9 o superior)
- [pip](https://pip.pypa.io/en/stable/) (gestor de paquetes de Python)
- [virtualenv](https://virtualenv.pypa.io/en/latest/) (para entornos virtuales en Python)
- [MongoDB](https://www.mongodb.com/try/download/community) (Instalado localmente o una instancia en la nube)

## 🛠️ Variables de entorno

El proyecto utiliza variables de entorno que pueden ser configuradas para ejecutar la aplicación.  

En la raíz del proyecto se encuentra el archivo `.env.example` con las siguientes variables:

```env
MONGODB_URL=mongodb://localhost:27017
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```


## 🚀 Configuración y ejecución en local

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1️⃣ Clonar el repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd url_shortener
```

### 2️⃣ Configurar el frontend (Next.js)

Ejecuta los siguientes comandos para instalar las dependencias del frontend:

```sh
npm install
```

### 3️⃣ Configurar el backend (FastAPI)

Se recomienda crear un entorno virtual para instalar las dependencias de Python:

```sh
# Crear y activar el entorno virtual
python -m venv venv
source venv/bin/activate  # En macOS/Linux
venv\Scripts\activate     # En Windows

# Instalar dependencias
npm run install:api
# o
pip install -r requirements.txt
```

### 4️⃣ Ejecutar el proyecto

Para iniciar el proyecto deberas ejecutar ambos servicios, el frontend y el backend.

```sh
# Iniciar el backend (FastAPI)
npm run dev:api
# o
uvicorn api.index:app --reload

# En otra terminal, iniciar el frontend (Next.js)
npm run dev
```

## 📦 Dependencias principales

### Frontend (Next.js)
- **React** `^19.0.0`
- **Next.js** `15.2.3`
- **Axios** `^1.8.4`

### Backend (FastAPI)
Las dependencias de FastAPI están definidas en `requirements.txt`.

La documentación completa de la API está disponible en:  
📌 [`api/README.md`](api/README.md)  

🔗 **También puedes acceder a la documentación en producción en:**  
[https://sho-url.vercel.app/api/docs](https://sho-url.vercel.app/api/docs)

## 🛠️ Comandos adicionales

### 🔹 Construir la aplicación para producción
```sh
npm run build
```

### 🔹 Ejecutar en modo producción
```sh
npm start
```

### 🔹 Linting (análisis de código)
```sh
npm run lint
```

## 🌐 Despliegue

El proyecto está desplegado en **Vercel**.  
Para desplegar cambios, simplemente se realiza un push a la rama principal del repositorio, o se utiliza el comando `vercel --prod`.
