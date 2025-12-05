from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import json

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent

IMAGE_DIR = BASE_DIR / "www" / "images"
app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")

PRODUCTS_JSON = BASE_DIR / "products.json"

@app.get("/products")
def get_products():
    with PRODUCTS_JSON.open("r", encoding="utf-8") as f:
        return json.load(f)
