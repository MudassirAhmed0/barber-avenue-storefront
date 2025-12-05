import os

file_path = r"c:\Users\mudas\OneDrive\Desktop\projects\barber\barber-storefront\app\globals.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Generate lines
lines = []
lines.append("  /* Generated VW Utilities */")
for i in range(1, 201):
    val = f"var(--vw{i})"
    lines.append(f"  --spacing-vw{i}: {val};")
    lines.append(f"  --text-vw{i}: {val};")
    lines.append(f"  --radius-vw{i}: {val};")
    lines.append(f"  --leading-vw{i}: {val};")

generated_css = "\n".join(lines)

# Find insertion point (end of @theme inline)
# It ends with '}' before :root usually. 
# Step 262 showed @theme inline {...} ending at line 57.
# We look for the closing brace of @theme inline.
# Simplest strategy: Find the string "  --font-inter: \"Inter\", sans-serif;\n}"
# and replace it with "  --font-inter: \"Inter\", sans-serif;\n" + generated_css + "\n}"

marker = '--font-inter: "Inter", sans-serif;'
if marker in content:
    new_content = content.replace(marker, marker + "\n" + generated_css)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully injected CSS utilities.")
else:
    print("Marker not found in globals.css")
