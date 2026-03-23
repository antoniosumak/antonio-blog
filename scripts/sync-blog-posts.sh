#!/bin/bash
# Syncs published blog posts from content-writer to this project.
# Copies new or updated files based on content comparison.

SOURCE="C:/Projects/content-writer/published/blog/"
DEST="C:/Projects/antonio-sumak-blog/content/blog/"

if [ ! -d "$SOURCE" ]; then
  echo "Error: Source directory not found: $SOURCE"
  exit 1
fi

mkdir -p "$DEST"

copied=0
skipped=0

for file in "$SOURCE"*.md; do
  filename=$(basename "$file")
  dest_file="$DEST$filename"

  if [ -f "$dest_file" ] && cmp -s "$file" "$dest_file"; then
    skipped=$((skipped + 1))
  else
    cp "$file" "$dest_file"
    echo "Copied: $filename"
    copied=$((copied + 1))
  fi
done

total=$(ls -1 "$DEST"*.md 2>/dev/null | wc -l)
echo ""
echo "Done. Copied $copied, skipped $skipped unchanged. $total total posts."
