"""
Authors: Trong Vinh Luu
"""

import json, re

# Create a list of shape references
with open("shapes.txt", "r") as f:
    shape_list = [line.strip() for line in f if line.strip()]


with open("raw_records.txt", "r") as f:
    record_list = (
        f.read().replace("[", "(").replace("]", ")").replace("{", "(").replace("}", ")")
    ).split("\n\n")


# Remove false records IF they don't start with a number/asterisk/bullet OR if they aren't shapes
def clean_record_list(raw_list):
    text_regex = r"^(?!\d+|\*|\•).*"
    record_regex = r" Once | once | coll\.|, from |\) from |\. Ht\. |, Ht\. |\. Ht |\. ht\. |; ht\. | Diam\. | diam\. | PLATE|\(a\)"

    for i, record in enumerate(raw_list):
        # Remove paragraph lines
        if re.search(text_regex, record):
            if record.upper().strip() in shape_list:
                raw_list[i] = f"SHAPE: {record}"
            else:
                raw_list[i] = ""
        # Records have more than 1 row
        elif "\n" in record:
            raw_list[i] = record
        # Remove paragraph lines starting with a number and not records
        elif re.search(record_regex, record):
            raw_list[i] = record
        else:
            raw_list[i] = ""

    raw_list = [record for record in raw_list if record != ""]

    return raw_list


# Clean the record list of false records
record_list = clean_record_list(record_list)


def get_ref(record):
    pattern = r"\b\d+\b"

    # Find the first number
    ref = re.search(pattern, record)
    ref = ref.group() if ref else ""

    return ref


def get_shape(record):
    shape = None
    for i, record_it in enumerate(record_list):
        if record_it == record:
            break

    while i >= 0:
        if "SHAPE" in record_list[i]:
            shape = record_list[i].split(":")[1].strip()
            break
        else:
            i -= 1

    return shape


def get_curr_coll(record):
    # This is can be added
    break_points = [
        "Once",
        "once",
        "from",
        "ex",
        "Gift",
        "Fragmentary",
        "Broken",
        "broken",
        "Max ",
        "max ",
        "Actual",
        "actual",
        "Ht",
        "ht.",
        "Diam",
        "diam",
        "PLATE",
        "\n",
    ]

    curr_coll = ""
    if "\n" in record:
        # Remove '*\d+'
        curr_coll = record.split(sep=" ", maxsplit=1)[1].strip()
        # Some records have format '* \d+'. Remove number after *
        if re.search(r"^\d+", curr_coll):
            curr_coll = curr_coll.split(sep=" ", maxsplit=1)[1].strip()

        # Keep the first line only
        curr_coll = curr_coll.split(sep="\n", maxsplit=1)[0].strip()

        for point in break_points:
            index = curr_coll.find(point)
            if index != -1:
                curr_coll = curr_coll[:index].strip()
                break

    curr_coll = curr_coll.rstrip(".,( ")

    return curr_coll


def get_prev_coll(record):
    prev_regex = r"Once |once |\(ex |, ex |; ex "

    # This is can be added
    break_points = [
        "Once",
        "once",
        "from",
        "ex",
        "Gift",
        "Fragmentary",
        "Broken",
        "broken",
        "Max ",
        "max ",
        "Actual",
        "actual",
        "Ht",
        "ht.",
        "Diam",
        "diam",
        "PLATE",
        "\n",
    ]

    # Remove '*\d+'
    prev_coll = record.split(sep=" ", maxsplit=1)[1].strip()
    # Some records have format '* \d+'. Remove number after *
    if re.search(r"^\d+", prev_coll):
        prev_coll = prev_coll.split(sep=" ", maxsplit=1)[1].strip()

    # Keep the first 2 lines only
    prev_coll = prev_coll.split("\n")[:2]
    prev_coll = "".join(prev_coll)

    if re.search(prev_regex, prev_coll):
        prev_coll = re.split(prev_regex, prev_coll)[1].strip()
    else:
        prev_coll = ""

    for point in break_points:
        index = prev_coll.find(point)
        if index != -1:
            prev_coll = prev_coll[:index].strip()
            break

    prev_coll = prev_coll.rstrip(".,) ")

    return prev_coll


def get_provenance(record):
    # This list can be added
    break_points = [
        "Rim",
        "Only",
        "Badly",
        "Neck",
        "Foot",
        "Top",
        "Broken",
        "broken",
        "Max",
        "max",
        "Actual",
        "actual",
        "Original",
        "Part",
        "Ht.",
        "ht.",
        "Ht",
        "Fragment",
        "fragment",
        "Diam",
        "diam",
        "\n",
        "but",
        "shows",
        "PLATE",
        "In",
        "Very",
    ]

    # Keep the first line only
    provenance = record.split(sep="\n", maxsplit=1)[0].strip()

    # Provenance starts after "from"
    pattern_index = provenance.find("from")
    if pattern_index == -1:
        return ""
    provenance = provenance[pattern_index + len("from") :].strip()

    for point in break_points:
        index = provenance.find(point)
        if index != -1:
            provenance = provenance[:index].strip()
            break

    provenance = provenance.rstrip("., ")

    return provenance


def get_height(record):
    # Height starts after "Ht"/"ht"
    pattern_index = record.find("Ht") if "Ht." in record else record.find("ht.")
    if pattern_index == -1:
        return ""
    height = record[pattern_index + len("Ht.") :].strip()

    break_points = ["Ht", "ht."]
    for point in break_points:
        index = height.find(point)
        if index != -1:
            height = height[:index].strip()
            break

    # Get first number value
    height_value = re.search(r"\d+(?:-\d+)?(?:/\d+)?", height)
    if height_value:
        height = height_value.group()
        return height.replace("-", ".")

    return ""


def get_diameter(record):
    # Diameter starts after "Diam"/"diam"
    pattern_index = record.find("Diam.") if "Diam." in record else record.find("diam.")
    if pattern_index == -1:
        return ""
    diameter = record[pattern_index + len("Diam.") :].strip()

    break_points = ["Diam.", "diam."]
    for point in break_points:
        index = diameter.find(point)
        if index != -1:
            diameter = diameter[:index].strip()
            break

    # Get first number value
    diameter_value = re.search(r"\d+(?:-\d+)?(?:/\d+)?", diameter)
    if diameter_value:
        diameter = diameter_value.group()
        return diameter.replace("-", ".")

    return ""


def get_plate(record):
    # Plate starts after "PLATE/PLATES/PLATED"
    plate_regex = r"PLATE|PLATES|PLATED"
    break_points = ["PLATE"]
    if any(point in record for point in break_points):
        plate_value = re.split(plate_regex, record)[1].strip()
        plate = plate_value.split("\n", maxsplit=1)[0].strip()

        # Handle wrong encoding of plate number
        plate = (
            plate.replace("\\", "1")
            .replace("I", "1")
            .replace("H", "11")
            .replace("a>", "d, e")
            .replace("c,*", "c, d")
            .replace("34*", "34b")
            .replace("a,*", "a,b")
            .replace("/", "f")
            .replace('^0"', "c, d")
            .replace("erf", "c, d")
            .replace('a"', "d")
            .replace("a'", "d")
            .replace("o'", "d")
            .replace('0"', "d")
            .replace("A", "b")
            .replace("a,o", "a, b")
            .replace("a,i", "a, b")
            .replace("a,6", "a, b")
            .replace("a,4", "a, b")
            .replace("f,^", "f, g")
            .replace("<r", "c")
            .replace("<;", "c")
            .replace('SS^o"', "85 c, d")
            .replace("830", "83 d")
            .replace("c, a", "c, d")
            .replace("c,^", "c, d")
            .replace("c,rf", "c, d")
            .replace("62*", "62 b")
            .replace("llb", "115")
            .replace("c,f", "e, f")
            .replace("^", "g")
            .replace("134 b", "134 h")
            .replace("134?", "134 i")
            .replace(" 4", " b")
            .replace("b9", "49")
            .replace("Ulfig", "141 f, g")
            .replace("1424", "142 b")
            .replace("142c", "142 e")
            .replace("142b", "142 h")
            .replace("142f", "142 j")
            .replace("142*", "142 k")
            .replace("143a", "143 d")
            .replace("143c", "143 e")
            .replace("*", "b")
            .replace("144a", "144 d")
            .replace("144 c", "144 e")
            .replace("U", "14")
            .replace("1494c", "149 d, e")
            .replace("163 0g", "163 b, c")
            .replace("band", "b and")
            .replace("171 c", "171 e")
            .replace("173 c", "173 e")
            .replace("176 c", "176 e")
            .replace("185 c", "185 e")
            .replace("189 c", "189 e")
            .replace("193 c", "193 e")
            .replace("200 c", "200 e")
            .replace("201 c", "201 e")
            .replace("178c", "178 e")
            .replace("1744", "174 b")
            .replace("1754", "175 b")
            .replace("1794", "179 b")
            .replace("183 0g", "183 d, e")
            .replace(",", ", ")
        )
        plate = re.sub(r"(\d)([a-zA-Z])", r"\1 \2", plate)

        return plate
    else:
        return ""


def get_publication(record):
    # This list can be added
    break_points = [
        "Rim",
        "Only",
        "Badly",
        "Neck",
        "Foot",
        "Top",
        "Broken",
        "broken",
        "Max",
        "max",
        "Actual",
        "actual",
        "Original",
        "Part",
        "Ht.",
        "ht.",
        "Ht",
        "Fragment",
        "fragment",
        "Diam",
        "diam",
        "PLATE",
    ]

    pub_regex = r"Ex |PP|LCS|PAdd|pp. |pi. \d+|p. \d+|GRFP|IIIC"
    description = get_description(record)

    if "\n" in record:
        pub_lines = []
        publication = ""
        record_lines = record.split("\n")
        for line in record_lines:
            if (
                re.search(pub_regex, line)
                and not line.strip() in description
                and not any(point in line for point in break_points)
            ):
                pub_lines.append(line)
        publication = "".join(pub_lines).strip()

    else:
        publication = ""

    return publication


def get_description(record):
    pub_regex = r"Ex |PP|LCS|PAdd|pp. |pi. \d+|p. \d+|GRFP|IIIC"
    break_regex = r"Ht|ht.|Diam|diam|PLATE"

    if "(a)" in record:
        description = record.split(sep="(a)", maxsplit=1)[1]
        description = "(a)" + description
    elif "\n" in record:
        # Skip first line
        description = record.split(sep="\n", maxsplit=1)[1].strip()
        if "\n" in description and re.search(break_regex, description):
            description = description.split(sep="\n", maxsplit=1)[1]

        if re.search(pub_regex, description):
            if ". \n" in description:
                description = description.split(sep=". \n", maxsplit=1)[1].strip()
            elif " \n" in description:
                description = description.split(sep=" \n", maxsplit=1)[1].strip()

        # Remove publications not being caught
        if "\n" in description and re.search(pub_regex, description):
            description = description.split(sep="\n", maxsplit=1)[1]

    else:
        description = ""
    description = description.replace("\n", "").strip()

    return description


def get_image(record):
    plate = get_plate(record)
    plate_no = re.search(r"\d+", plate)

    return plate_no.group() if plate_no else ""


def get_all_attributes(record):
    attributes = {
        "ref_no": get_ref(record),  # Every record has a reference number
        "shape": get_shape(record),  # Every record belongs to a shape type
        "curr_coll": get_curr_coll(record) if get_curr_coll(record) else None,
        "prev_coll": get_prev_coll(record) if get_prev_coll(record) else None,
        "provenance": get_provenance(record) if get_provenance(record) else None,
        "height": get_height(record) if get_height(record) else None,
        "diameter": get_diameter(record) if get_diameter(record) else None,
        "plate": get_plate(record) if get_plate(record) else None,
        "publication": get_publication(record) if get_publication(record) else None,
        "description": get_description(record) if get_description(record) else None,
        "image": get_image(record) + ".png" if get_image(record) else None,
    }
    json_record = json.dumps(attributes, indent=4)

    return json_record


# Generate a json file for the records
with open("records.json", "w") as f:
    f.write("[\n")
    for i, record in enumerate(record_list):
        if not record.startswith("SHAPE"):
            f.write(get_all_attributes(record))
            if i < len(record_list) - 1:
                f.write(",\n")
    f.write("\n]\n")
