from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

app = FastAPI()

# ------- CORS (Frontend Access) -------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------- Paths -------
BASE_DIR = Path(__file__).resolve().parent
IMAGE_DIR = BASE_DIR / "images"
PRODUCTS_JSON = BASE_DIR / "products.json"

# ------- Static files (Images) -------
app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")


# ------- API Routes -------
@app.get("/")
async def home():
    return {"message": "FastAPI is running 🚀"}


@app.get("/products")
async def get_products():
    if not PRODUCTS_JSON.exists():
        return {"error": "products.json missing 💀"}

    try:
        with open(PRODUCTS_JSON, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        return {"error": f"Couldn't read file: {e}"}
