# This python script generates web compatible thumbnails (JPEG) from
# TIF images provided by the Trendall Centre.
import os

from PIL import Image
from pathlib import Path

# GLOBALS
# Set compression quality.
JPG_QUALITY = 75

TIF_PATH = "./TIF/"  # Where the TIFs are.
JPG_PATH = "./JPG/"  # Where you want the JPGs saved.


def generate_thumbnail(tif_file):
    # Some records might not contain an image.
    try:
        tif = Image.open(tif_file)
    except FileNotFoundError:
        print(f"[!] No TIF File at {TIF_PATH}, skipping.")
        return
    except OSError:
        print(f"[!] Error: Could not open the TIF file.")
        return

    # Retain filename for JPG output.
    jpg_out = JPG_PATH + Path(os.path.basename(tif_file)).stem + ".jpeg"

    # Correct the color mode if it isn't
    if tif.mode != "RGB":
        tif = tif.convert("RGB")

    tif.save(jpg_out, quality=JPG_QUALITY, format="JPEG", optimize=True)


if __name__ == "__main__":
    generate_thumbnail("./TIF/P-9-2.tif")

