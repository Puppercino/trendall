"""
Authors: Trong Vinh Luu
"""

import os, sys, pdfplumber, re

pdf_path = "RVP.pdf"  # Add RVP.pdf to the same directory as this file
image_path = "images/"  # After running this script, images will be saved here. Put this folder inside public folder

if not os.path.exists(pdf_path):
    print("PDF file path not found!")
    sys.exit(1)

with pdfplumber.open(pdf_path) as pdf:
    # Record images are from pages 484 to 725
    for page in pdf.pages[484:725]:
        plate = page.extract_text()
        image = page.images[0]
        image_bbox = (
            image["x0"],
            page.height - image["y1"],
            image["x1"],
            page.height - image["y0"],
        )
        cropped_page = page.crop(image_bbox)

        # Extract plate number from text
        match = re.search(r"PLATE (\d+)", plate)
        plate_number = int(match.group(1)) if match else None

        # Save image
        image_obj = cropped_page.to_image(resolution=400)
        image_obj.save(image_path + f"{plate_number}.png")
