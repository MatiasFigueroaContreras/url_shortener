from fastapi import FastAPI
from mangum import Mangum

app = FastAPI(title="URL Shortener API", description="API to shorten URLs", docs_url="/api/v1/docs", openapi_url="/api/v1/openapi.json")

@app.get("/api/v1/root")
async def root():
    return {"message": "Hello World"}
