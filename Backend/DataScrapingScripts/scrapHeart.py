import json
import fitz  # PyMuPDF
import re
import sys

if len(sys.argv) != 2:
    print("Usage: python scrapHeart.py <pdf_path>")
    sys.exit(1)

pdf_path = sys.argv[1]

try:
    pdf_document = fitz.open(pdf_path)
    page = pdf_document.load_page(0)
    text = page.get_text()

except Exception as e:
    print(f"Error opening PDF: {e}")
    sys.exit(1)


def extract_value(pattern, text, default="0"):
    try:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip()
        return default
    except Exception:
        return default


results = {}

results["Age"] = extract_value(
    r"Age\s*:?\s*(\d+)",
    text,
    "0"
)

results["Sex"] = extract_value(
    r"Sex\s*:?\s*(Male|Female)",
    text,
    "Male"
)

results["Chest pain type"] = extract_value(
    r"Chest pain type\s*:?\s*(\d+)",
    text,
    "0"
)

results["Resting blood pressure"] = extract_value(
    r"Resting blood pressure\s*:?\s*(\d+)",
    text,
    "0"
)

results["Serum cholesterol in mg/dl"] = extract_value(
    r"Serum cholesterol.*?:\s*(\d+)",
    text,
    "0"
)

results["Fasting blood sugar > 120 mg/dl"] = extract_value(
    r"Fasting blood sugar.*?:\s*(\w+)",
    text,
    "Negative"
)

results["Resting Electrocardiographic Results"] = extract_value(
    r"Resting Electrocardiographic Results\s*:?\s*(\d+)",
    text,
    "0"
)

results["Maximum Heart Rate Achieved"] = extract_value(
    r"Maximum Heart Rate Achieved\s*:?\s*(\d+)",
    text,
    "0"
)

results["Exercise Induced Angina"] = extract_value(
    r"Exercise Induced Angina\s*:?\s*(\d+)",
    text,
    "0"
)

results["Old peak"] = extract_value(
    r"Old peak\s*:?\s*(\d+\.?\d*)",
    text,
    "0"
)

results["Slope of the peak exercise ST Segment"] = extract_value(
    r"Slope of the peak exercise ST Segment\s*:?\s*(\d+)",
    text,
    "0"
)

results["Number of major vessels (0-3) colored by fluoroscopy"] = extract_value(
    r"Number of major vessels.*?:\s*(\d+)",
    text,
    "0"
)

results["Thal (Thallium Stress Test Result)"] = extract_value(
    r"Thal.*?:\s*(\d+)",
    text,
    "0"
)

sex_mapping = {
    "Male": 1,
    "Female": 0
}

results["Sex"] = sex_mapping.get(results["Sex"], 1)

print(json.dumps(results))