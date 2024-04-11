import json, re, pandas

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


# print(get_curr_coll("""673a Lekanis 21616, from C. Andriuolo (1969), T. 61. """))


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
                and not line in description
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

    else:
        description = ""

    # Remove publications not being caught
    if "\n" in description and re.search(pub_regex, description):
        description = description.split(sep="\n", maxsplit=1)[1]

    description = description.replace("\n", "").strip()

    return description


# TODO: Match record with image based on reference number
def match_plate(Plate, referenceNo, imagePlate, refImage):
    NewPlate = []
    Text = ""

    for i in range(len(Plate)):
        plate = Plate[i].replace(" ", "-")
        plate = Plate[i].lower()
        for char in plate:
            if char.islower():
                charNum = ord(char) - 96
                Text = Text + " " + str(charNum)
            else:
                Text = Text + str(char)
        NewPlate.append(Text)
        Text = ""

    regSpace = re.compile(r"\s+")
    for i in range(len(NewPlate)):
        NewPlate[i] = NewPlate[i].strip()
        NewPlate[i] = NewPlate[i].replace(",", " ")
        NewPlate[i] = regSpace.sub(" ", NewPlate[i])
        NewPlate[i] = NewPlate[i].replace(" ", "-")
        NewPlate[i] = NewPlate[i].replace("--", "-")

    for i in range(len(NewPlate)):
        count = NewPlate[i].count("-", 0, len(NewPlate[i]))
        if count < 2:
            imagePlate.append(NewPlate[i])
            refImage.append(referenceNo[i])
        else:
            imageID = NewPlate[i].split(sep="-", maxsplit=count)[0]
            plateList = NewPlate[i].split(sep="-", maxsplit=count)
            for j in range(1, len(plateList)):
                imagePlate.append(imageID + "-" + plateList[j])
                refImage.append(referenceNo[i])

    for i in range(len(imagePlate)):
        if imagePlate[i] == "":
            refImage[i] = refImage[i].replace(refImage[i], "")

    while "" in imagePlate:
        imagePlate.remove("")

    while "" in refImage:
        refImage.remove("")


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
