#!/bin/bash

# Script to update sitemap and robots.txt
# Usage: ./scripts/update-sitemap.sh

echo "🗺️  Updating sitemap and robots.txt..."

# Generate sitemap
npm run sitemap

if [ $? -eq 0 ]; then
    echo "✅ Sitemap generated successfully"
    echo "📄 Generated files:"
    echo "   - /public/sitemap.xml"
    echo "   - /public/robots.txt"
    echo ""
    echo "🚀 Ready for deployment!"
else
    echo "❌ Failed to generate sitemap"
    exit 1
fi
