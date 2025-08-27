#!/bin/bash

config_file="init-config.json"
log_file="replace.log"
start_time=$(date +%s)
project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Define color variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Icons for flair
ICON_START="🚀"
ICON_FILE="🔍"
ICON_REPLACE="🔄"
ICON_NO_MATCH="❌"
ICON_REPLACE_SUCCESS="✅"
ICON_RENAME="📁"
ICON_RENAME_SUCCESS="📂"
ICON_CLEAN="🧹"

# Detect OS to set sed in-place option (BSD sed on macOS requires an empty argument)
if [[ "$(uname)" == "Darwin" ]]; then
    SED_INPLACE=(-i '')
else
    SED_INPLACE=(-i)
fi

echo "$ICON_START Pulizia dell'ambiente nella directory: $project_root"

if [ -d "$project_root/node_modules" ]; then
  rm -rf "$project_root/node_modules"
  echo "$ICON_CLEAN node_modules removed"
fi

if [ -f "$project_root/package-lock.json" ]; then
  rm "$project_root/package-lock.json"
  echo "$ICON_CLEAN package-lock.json removed"
fi

echo "$ICON_START Pulizia completata!"


# -------------------------------
# Read and build exclusion parameters
# -------------------------------

ignore_dirs=()
while IFS= read -r line; do
  ignore_dirs+=("$line")
done < <(jq -r '.ignoreDirs[]' "$config_file")

find_ignore_dirs=()
for dir in "${ignore_dirs[@]}"; do
  find_ignore_dirs+=(-path "*/${dir}" -prune -o)
done

ignore_files=()
while IFS= read -r line; do
  ignore_files+=("$line")
done < <(jq -r '.ignoreFiles[]' "$config_file")

find_ignore_files=()
for file in "${ignore_files[@]}"; do
  find_ignore_files+=(! -name "$file")
done

# -------------------------------
# Load replacement rules (file content)
# -------------------------------

old_replacements=()
new_replacements=()
while IFS=$'\t' read -r old new; do
    old_replacements+=("$old")
    new_replacements+=("$new")
done < <(jq -r '.contentReplacement[] | "\(.old)\t\(.new)"' "$config_file")

echo -e "${YELLOW}Replacement rules loaded:${NC}"
for i in "${!old_replacements[@]}"; do
    echo -e "\tRule $((i+1)): '${old_replacements[$i]}' -> '${new_replacements[$i]}'"
done
echo

# -------------------------------
# Load file rename rules
# -------------------------------

rename_old_patterns=()
rename_new_patterns=()
while IFS=$'\t' read -r old new; do
    rename_old_patterns+=("$old")
    rename_new_patterns+=("$new")
done < <(jq -r '.filenameReplacement[] | "\(.old)\t\(.new)"' "$config_file")

# -------------------------------
# Process file replacements
# -------------------------------

echo -e "${ICON_START} ${GREEN}Starting file replacements...${NC}"

find ../ "${find_ignore_dirs[@]}" -type f "${find_ignore_files[@]}" -print0 | while IFS= read -r -d '' file; do
    echo -e "${ICON_FILE} ${BLUE}Processing file:${NC} $file"

    for i in "${!old_replacements[@]}"; do
        old="${old_replacements[$i]}"
        new="${new_replacements[$i]}"
        echo -e "\t${ICON_REPLACE} Replacing '${old}' with '${new}' in file content"
        original_content=$(cat "$file")
        sed "${SED_INPLACE[@]}" "s/${old}/${new}/g" "$file"
        updated_content=$(cat "$file")

        if [[ "$original_content" != "$updated_content" ]]; then
            echo -e "\t${ICON_REPLACE_SUCCESS} ${GREEN}Content updated${NC}"
            echo -e "Replaced '$old' with '$new' in '$file'" >> "$log_file"
        else
            echo -e "\t${ICON_NO_MATCH} ${YELLOW}No change for '${old}'${NC}"
        fi
    done

    filename=$(basename "$file")
    dir=$(dirname "$file")
    new_filename="$filename"

    for i in "${!rename_old_patterns[@]}"; do
        old="${rename_old_patterns[$i]}"
        new="${rename_new_patterns[$i]}"
        if [[ "$new_filename" == *"$old"* ]]; then
            new_filename="${new_filename//$old/$new}"
        fi
    done

    if [[ "$filename" != "$new_filename" ]]; then
        new_filepath="$dir/$new_filename"
        echo -e "\t${ICON_RENAME} Renaming file: ${YELLOW}${filename}${NC} -> ${GREEN}${new_filename}${NC}"
        mv "$file" "$new_filepath"
        echo -e "\t${ICON_RENAME_SUCCESS} Renamed to: $new_filepath"
        echo -e "File renamed from '$file' to '$new_filepath'" >> "$log_file"
    fi

    echo -e "\t${BLUE}-------------------------------------------------------------${NC}"

done

# -------------------------------
# Cleanup
# -------------------------------

echo -e "${ICON_CLEAN} ${GREEN}Cleaning up .DS_Store files and backups...${NC}"
find .. -type f \( -name "*.DS_Store" -o -name ".*.DS_Store" \) -exec rm -f {} +

end_time=$(date +%s)
elapsed_time=$((end_time - start_time))
echo -e "${GREEN}Elapsed time: $elapsed_time seconds${NC}"
