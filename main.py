from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import json
from pathlib import Path

app = FastAPI()

# 1) Serve images / static files
# Adjust this path to your real images directory
IMAGE_DIR = Path(r"E: \New folder (2)\hotwheels\Speedy-Collectibles\www\images")  # e.g. A:\images
app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")

# 2) Read products from JSON file and return as JSON
PRODUCTS_JSON = Path("products.json")

@app.get("/products")
def get_products():
    with PRODUCTS_JSON.open("r", encoding="utf-8") as f:
        data = json.load(f)
    return data
