import os, sys, pdfplumber

pdf_path = "RVP.pdf"  # Add RVP.pdf to the same directory as this file
if not os.path.exists(pdf_path):
    print("PDF file path not found!")
    sys.exit(1)


MAX_RECORD_TEXT_SIZE = 11.01  # Including shape names
MIN_RECORD_TEXT_SIZE = 8.99
FALSE_INDENT = 90  # Indent of false records (text with same size but not records)
HEADER_HEIGHT = 48

with open("shapes.txt", "r") as f:
    SHAPE_LIST = f.read().split()


def extract_raw_record(start_page, end_page, outputFile):
    with pdfplumber.open(pdf_path) as pdf:
        with open(outputFile, "w") as out:

            for page in pdf.pages[start_page:end_page]:

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

                    if MIN_RECORD_TEXT_SIZE <= size <= MAX_RECORD_TEXT_SIZE:
                        # Start of a new line
                        if curr_top_pos > prev_top_pos:
                            prev_top_pos = curr_top_pos
                            # If < FALSE_INDENT -> start of a new record
                            if left_pos < FALSE_INDENT:
                                out.write(f"\n\n{text}")
                            # If > FALSE_INDENT -> publication/description
                            else:
                                out.write(f"\n{text}")
                        else:
                            out.write(text)


# Make user input start_page and end_page on the website
extract_raw_record(55, 394, "raw_records.txt")
