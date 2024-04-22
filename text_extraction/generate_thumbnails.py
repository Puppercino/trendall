# This python script generates web compatible thumbnails (JPEG) from
# TIF images provided by the Trendall Centre.
import os
import glob

from PIL import Image
from pathlib import Path

# GLOBALS
# Set compression quality.
JPG_QUALITY = 100

TIF_PATH = "./TIF/"  # Where the TIFs are.
JPG_PATH = "./JPG/"  # Where you want the JPGs saved.


def get_tifs(directory):
    return glob.glob(f'{directory}/*.tif')


# aspect_crop: crops the image to a square for thumbnail.
def aspect_crop(image):
    # Get the aspect ratio of the image.
    aspect = image.width / image.height

    # If the image is wider than it is tall, crop the sides.
    if aspect > 1:
        new_width = image.height
        left = (image.width - new_width) / 2
        right = (image.width + new_width) / 2
        top = 0
        bottom = image.height
        return image.crop((left, top, right, bottom))

    # If the image is taller than it is wide, crop the top and bottom.
    elif aspect < 1:
        new_height = image.width
        left = 0
        right = image.width
        top = (image.height - new_height) / 2
        bottom = (image.height + new_height) / 2
        return image.crop((left, top, right, bottom))

    # If the image is square, return the image.
    else:
        return image


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

    # Correct the color mode if it isn't RGB
    if tif.mode != "RGB":
        tif = tif.convert("RGB")

    tif = aspect_crop(tif)
    tif = tif.resize((150, 150))

    tif.save(jpg_out, quality=JPG_QUALITY, format="JPEG", optimize=True)


if __name__ == "__main__":
    queue = get_tifs(TIF_PATH)
    for original in queue:
        generate_thumbnail(original)

