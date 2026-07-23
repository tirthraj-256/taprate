import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

REPLACEMENTS = [
    ("₹1,499", "₹999"),
    ("Rs 1,499", "Rs 999"),
    ("From Rs 1,499", "From Rs 999"),
    ('p="1499"', 'p="999"'),
    ("₹1,399", "₹899"),
    ("₹1,299", "₹799"),
    ("₹499", "₹199"),
    ("Rs 499", "Rs 199"),
    ("From Rs 499", "From Rs 199"),
    ('p="499"', 'p="199"'),
    ("₹449", "₹149"),
    ("PVC from ₹399/card", "PVC from ₹99/card"),
    ("From ₹399/card", "From ₹99/card"),
]

# Pricing table PVC 26-100 column only
PVC_BULK = re.compile(
    r"(<strong>PVC NFC Card</strong></td><td style=\"padding:1rem\">₹199</td><td style=\"padding:1rem\">₹149</td><td style=\"padding:1rem\">)₹399"
)

for dirpath, _, files in os.walk(ROOT):
    if "scripts" in dirpath.replace("\\", "/").split("/"):
        continue
    for fn in files:
        if not fn.endswith((".html", ".ps1", ".md")):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        orig = content
        for old, new in REPLACEMENTS:
            content = content.replace(old, new)
        content = PVC_BULK.sub(r"\1₹99", content)
        # Blueprint competitor row: restore TapRate entry price in table
        content = content.replace(
            "| Entry price | ₹199 | ~₹599 | ~₹600 | ~₹899 | ~₹999 | ~₹99 | ~₹450 |",
            "| Entry price | ₹199 | ~₹599 | ~₹600 | ~₹899 | ~₹999 | ~₹399 | ~₹450 |",
        )
        content = content.replace(
            "Transparent published pricing (₹199/₹799/₹999/₹349)",
            "Transparent published pricing (₹199/₹799/₹999/₹349)",
        )
        content = content.replace(
            "**Price anchoring:** ₹199 vs ₹999/year subscription",
            "**Price anchoring:** ₹199 vs ₹999/year subscription",
        )
        content = content.replace("Budget is ₹199–₹699 per card", "Budget is ₹199–₹399 per card")
        if content != orig:
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                f.write(content)
            print("updated:", os.path.relpath(path, ROOT))
