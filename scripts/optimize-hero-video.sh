#!/bin/bash

# ClinicIQ Solutions - Hero Video Optimization Script
# This script creates responsive video versions from the source hero.mp4

set -e  # Exit on error

SOURCE_VIDEO="photos/hero/hero.mp4"
OUTPUT_DIR="photos/hero"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== ClinicIQ Hero Video Optimizer ===${NC}"
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: FFmpeg is not installed${NC}"
    echo "Install with: brew install ffmpeg (macOS) or sudo apt install ffmpeg (Ubuntu)"
    exit 1
fi

# Check if source video exists
if [ ! -f "$SOURCE_VIDEO" ]; then
    echo -e "${RED}Error: Source video not found: $SOURCE_VIDEO${NC}"
    exit 1
fi

echo -e "${YELLOW}Creating responsive video versions...${NC}"
echo ""

# Desktop versions (1920x1080)
echo -e "${GREEN}[1/6]${NC} Creating desktop WebM (1920x1080, 1.5Mbps)..."
ffmpeg -i "$SOURCE_VIDEO" \
  -c:v libvpx-vp9 -b:v 1500k \
  -c:a libopus -b:a 128k \
  -vf "scale=1920:1080" \
  "$OUTPUT_DIR/hero-desktop.webm" \
  -y 2>/dev/null

echo -e "${GREEN}[2/6]${NC} Creating desktop MP4 (1920x1080, 2Mbps)..."
ffmpeg -i "$SOURCE_VIDEO" \
  -c:v libx264 -b:v 2000k \
  -c:a aac -b:a 128k \
  -vf "scale=1920:1080" \
  "$OUTPUT_DIR/hero-desktop.mp4" \
  -y 2>/dev/null

# Tablet versions (1024x768)
echo -e "${GREEN}[3/6]${NC} Creating tablet WebM (1024x768, 1Mbps)..."
ffmpeg -i "$SOURCE_VIDEO" \
  -c:v libvpx-vp9 -b:v 1000k \
  -c:a libopus -b:a 96k \
  -vf "scale=1024:768" \
  "$OUTPUT_DIR/hero-tablet.webm" \
  -y 2>/dev/null

echo -e "${GREEN}[4/6]${NC} Creating tablet MP4 (1024x768, 1.2Mbps)..."
ffmpeg -i "$SOURCE_VIDEO" \
  -c:v libx264 -b:v 1200k \
  -c:a aac -b:a 96k \
  -vf "scale=1024:768" \
  "$OUTPUT_DIR/hero-tablet.mp4" \
  -y 2>/dev/null

# Mobile versions (640x480)
echo -e "${GREEN}[5/6]${NC} Creating mobile WebM (640x480, 500Kbps)..."
ffmpeg -i "$SOURCE_VIDEO" \
  -c:v libvpx-vp9 -b:v 500k \
  -c:a libopus -b:a 64k \
  -vf "scale=640:480" \
  "$OUTPUT_DIR/hero-mobile.webm" \
  -y 2>/dev/null

echo -e "${GREEN}[6/6]${NC} Creating mobile MP4 (640x480, 700Kbps)..."
ffmpeg -i "$SOURCE_VIDEO" \
  -c:v libx264 -b:v 700k \
  -c:a aac -b:a 64k \
  -vf "scale=640:480" \
  "$OUTPUT_DIR/hero-mobile.mp4" \
  -y 2>/dev/null

echo ""
echo -e "${GREEN}=== Optimization Complete! ===${NC}"
echo ""
echo "Created files:"
ls -lh "$OUTPUT_DIR"/hero-{desktop,tablet,mobile}.{webm,mp4} 2>/dev/null | awk '{print "  " $9 " - " $5}'
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Test the video in your browser"
echo "2. Check file sizes are reasonable"
echo "3. Deploy to production"
echo ""
echo -e "${YELLOW}Expected sizes:${NC}"
echo "  Desktop: ~1.5-2MB"
echo "  Tablet: ~800KB-1MB"
echo "  Mobile: ~300KB-500KB"
