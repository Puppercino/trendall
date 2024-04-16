# This python script generates web compatible thumbnails (JPEG) from
# TGA images provided by the Trendall Centre.
from PIL import Image

# GLOBALS
# Set compression quality.
JPG_QUALITY = 100

TGA_PATH = "./TGA/"  # Where the TGAs are.
JPG_PATH = "./JPG/"  # Where you want the JPGs saved.


def generate_thumbnails(record_id, ):
    # Some records might not contain an image.
    try:
        tga = Image.open(tga_path)
    except FileNotFoundError:
        print(f"[!] No TGA File at {tga_path}, skipping.")
        return
    except OSError:
        print(f"[!] Error: Could not open the TGA file.")
        return

    # Correct the color mode if it isn't
    if tga.mode != "RGB":
        tga = tga.convert("RGB")

