import os
import sys

import pdfplumber
import spacy

# Load the English language model
nlp = spacy.load("en_core_web_sm")

pdf_path = "RVP.pdf"  # Add RVP.pdf to the same directory as this file
if not os.path.exists(pdf_path):
    print("PDF file path not found!")
    sys.exit(1)


RECORD_TEXT_SIZE = 9.01
RECORD_INDENT = 61  # Records are indented at start
HEADER_HEIGHT = 48


def get_raw_record(outputFile):
    with pdfplumber.open(pdf_path) as pdf:
        with open(outputFile, "w") as out:

            for page in pdf.pages:
                # page = pdf.pages[194]

                # Crop out the header
                _, _, width, height = page.bbox
                crop_box = (0, HEADER_HEIGHT, width, height - HEADER_HEIGHT)
                cropped_page = page.within_bbox(crop_box)

                prev_top_pos = 0
                for char in cropped_page.chars:
                    curr_top_pos = char.get("top")  # Position of text from top
                    left_pos = char.get("x0")  # Position of text from left
                    size = char.get("size")
                    text = char.get("text")

                    if size >= RECORD_TEXT_SIZE:
                        continue
                    else:
                        # Start of a new line
                        if curr_top_pos > prev_top_pos:
                            text = "\n" + text
                            prev_top_pos = curr_top_pos

                            # Start of a new record
                            out.write("\n" + text if left_pos < RECORD_INDENT else text)
                        else:
                            out.write(text)


# Calling FilterFontSize function 3 times, for the 3 parts in the RVP with the specified startPage and endPage for each part
# FilterFontSize(55, 82, "Part1.txt")
# FilterFontSize(88, 293, "Part2.txt")
# FilterFontSize(301, 394, "Part3.txt")
# FilterFontSize(55, 394, "Part4.txt")
get_raw_record("test.txt")
