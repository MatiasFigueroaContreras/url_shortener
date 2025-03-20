from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import shortened_router

app = FastAPI(title="URL Shortener API", description="API to shorten URLs",
              docs_url="/api/v1/docs", openapi_url="/api/v1/openapi.json")

app.include_router(shortened_router)

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8000"
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])
