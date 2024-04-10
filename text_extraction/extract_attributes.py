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
    ref = record.split(sep=" ", maxsplit=1)[0]
    ref = ref.replace("*", "").replace("•", "")

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
    locRegex = (
        r"Broken|broken|Max|max|Actual|actual|Ht.|ht.|Ht|Diam. c.|Diam.|diam.|PLATE"
    )
    startLine = "^\\d+"
    break_points = [
        " Broken",
        " broken",
        " Max ",
        " max ",
        " Actual ",
        " actual ",
        " Ht.",
        " ht.",
        " Ht",
        " Diam. c.",
        " Diam",
        " diam",
        " PLATE",
    ]
    locationOnwards = record.split(sep=" ", maxsplit=1)[1].strip()

    # removing vase number from entry. Location, if exists, is next attribute.
    if re.search(startLine, locationOnwards):
        locationOnwards = locationOnwards.split(sep=" ", maxsplit=1)[1].strip()
    if any(point in record for point in break_points):
        curr_coll = re.split(locRegex, locationOnwards)[0]
    else:
        curr_coll = locationOnwards.split(sep="\n", maxsplit=1)[0].strip()

    # removing 'from' in Location
    if " from " in curr_coll:
        curr_coll = curr_coll.split(sep=" from ", maxsplit=1)[0]

    curr_coll = curr_coll.replace("\n", "").rstrip("., ")

    return curr_coll


def get_prev_coll(location):
    regPrev = r"\(ex |, ex |; ex "
    break_points = [
        ")",
        " Ht.",
        " Diam.",
        " PLATE",
        "\n",
    ]
    if location.startswith("(a)"):
        location = ""

    # If current location is unknown and previous location is known, location starts with 'Once '
    if location.startswith("Once "):
        prev = location
        location = ""
        prev = prev.replace("Once ", "")

    # If current location known and previous location known, location contains 'ex '.
    elif "ex " in location:
        prev = re.split(regPrev, location)[1].strip()
        location = re.split(regPrev, location)[0].strip()
    else:
        prev = ""

    if not "(" in prev:
        prev = prev.replace(").", "").replace("\n", "").rstrip("., ")

    return prev


def get_provenance(record):
    # Provenance starts after "from"
    pattern_index = record.find("from")
    if pattern_index == -1:
        return ""
    provenance = record[pattern_index + len("from") :].strip()

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
    for point in break_points:
        index = provenance.find(point)
        if index != -1:
            provenance = provenance[:index].strip()
            break

    return provenance.rstrip("., ")


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
    # Plate starts after "PLATE/PLATES"
    plate_regex = r"PLATE|PLATES|PLATED"
    break_points = ["PLATE"]
    if any(point in record for point in break_points):
        plate_value = re.split(plate_regex, record)[1].strip()
        plate = plate_value.split("\n", maxsplit=1)[0].strip()
        return plate
    else:
        return ""


# Converting Plate into number format for database image reference
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


def get_publication(record):
    pub_parts = []
    checkPub = r" [0-9]+"

    # tokens that appear in most descriptions, but never in publications
    removeList = ["above", "\\\\", " \\l.", " 1.", " r.", "(a)"]
    publication = []
    # removing first line of entry- never contains publication info
    if "\n" in record:
        firstSplit = record.split(sep="\n", maxsplit=1)[1]
        allPubs = re.split(r"\. \n", firstSplit)[0]
        if "PLATE" in allPubs:
            if "\n" in allPubs:
                allPubs = allPubs.split(sep="PLATE")[1]
                allPubs = allPubs.split("\n")[1]

        # where first line of vase info requires a second line, it always contains a plate as final attribute
        # removing any second lines that end in PLATE
        if re.search(checkPub, allPubs):
            if allPubs[0] != "(":
                pub_parts = allPubs.split(";")
                addPub = pub_parts[len(pub_parts) - 1].split(". \n")
                pub_parts.pop(len(pub_parts) - 1)
                pub_parts.append(addPub[0])

                # Removing description lines
                for p in pub_parts:
                    removeIndex = []
                    for r in removeList:
                        if r in p:
                            removeIndex.append(
                                pub_parts.index(p)
                            )  # record 1/99 has an r. and isn't being removed.

                    removeIndex = list(dict.fromkeys(removeIndex))
                    if len(removeIndex) > 0:
                        n = len(pub_parts)
                        for i in range(0, n - removeIndex[0]):
                            pub_parts.pop()
                    while "" in pub_parts:
                        pub_parts.remove("")
                publication = [p.replace("\n", "") for p in pub_parts]
            else:
                publication = ""
        else:
            publication = ""
    else:
        publication = ""

    publication = ";".join(publication)

    # replacing empty array [] in Publications with ""
    # for i in range(len(Publications)):
    #     if len(Publications[i]) == 0:
    #         Publications[i] = ""

    return publication


def get_description(record):
    desc_regex = r"PP|PAdd|PPSupp|pp. | pi. \d+| p. \d+"
    regpoint = r"Ht.|ht.|Ht|Diam. c.|Diam|diam|PLATES|PLATE"

    if "(a)" in record:
        description = record.split(sep="(a)", maxsplit=1)[1]
        description = "(a)" + description
    elif "\n" in record:  # End of publications
        description = record.split(sep="\n", maxsplit=1)[1].strip()
        if re.search(desc_regex, description):
            if ". \n" in description:
                description = description.split(sep=". \n", maxsplit=1)[1].strip()
                if re.search(desc_regex, description):
                    description = description.split(sep=". \n", maxsplit=1)[1].strip()
        if re.search(regpoint, description):
            if "\n" in description:
                description = description.split(sep="\n", maxsplit=1)[1]
    else:
        description = ""

    # Removing Publications not being caught
    # regPub = r"PAdd|PP"

    # if not "\n" in description:
    #     if re.search(regPub, description):
    #         description = ""
    description = description.replace("\n", "").strip()

    return description


def get_all_attributes(record):
    attributes = {
        "ref_no": get_ref(record),
        "shape": get_shape(record),
        "curr_coll": get_curr_coll(record) if get_curr_coll(record) else None,
        # "prev_coll": get_prev_coll(record) if get_prev_coll(record) else None,
        "provenance": get_provenance(record) if get_provenance(record) else None,
        "height": get_height(record) if get_height(record) else None,
        "diameter": get_diameter(record) if get_diameter(record) else None,
        "plate": get_plate(record) if get_plate(record) else None,
        "publication": get_publication(record) if get_publication(record) else None,
        # "description": get_description(record) if get_description(record) else None,
    }
    json_record = json.dumps(attributes, indent=4)

    return json_record


# Generate a json file for the records
with open("records.json", "w") as f:
    f.write("[\n")
    num_records = len(record_list)
    for i, record in enumerate(record_list):
        if not record.startswith("SHAPE"):
            f.write(get_all_attributes(record))
            if i < num_records - 1:
                f.write(",\n")
    f.write("\n]\n")
