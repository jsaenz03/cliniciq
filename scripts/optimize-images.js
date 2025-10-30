#!/usr/bin/env node

/**
 * Image Optimization Script for ClinicIQ Website
 *
 * This script optimizes images by:
 * 1. Converting PNG to WebP format (85% quality)
 * 2. Creating PNG fallbacks (80% quality)
 * 3. Generating responsive variants (mobile, tablet, desktop)
 * 4. Maintaining original aspect ratios
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    webpQuality: 85,
    pngQuality: 80,
    sizes: [
        { width: 640, suffix: '-mobile' },
        { width: 1024, suffix: '-tablet' },
        { width: 1920, suffix: '-desktop' }
    ],
    // Images to optimize with responsive variants
    responsiveImages: [
        'photos/services/automations.png',
        'photos/services/calculators.png',
        'photos/services/downloads.png',
        'photos/services/websites.png',
        'photos/hero/top.png',
        'photos/about/about-office-workspace.png',
        'photos/about/about-office-workspace2.png'
    ],
    // Images to optimize with single size (logos, icons)
    singleSizeImages: [
        'photos/branding/cliniciq-logo.png'
    ]
};

/**
 * Get image dimensions
 */
async function getImageDimensions(inputPath) {
    try {
        const metadata = await sharp(inputPath).metadata();
        return {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format
        };
    } catch (error) {
        console.error(`Error getting dimensions for ${inputPath}:`, error.message);
        return null;
    }
}

/**
 * Optimize a single image with responsive variants
 */
async function optimizeResponsiveImage(inputPath) {
    try {
        console.log(`🔄 Processing responsive image: ${inputPath}`);

        const dimensions = await getImageDimensions(inputPath);
        if (!dimensions) return false;

        const dir = path.dirname(inputPath);
        const name = path.basename(inputPath, path.extname(inputPath));

        console.log(`   Original: ${dimensions.width}x${dimensions.height} (${dimensions.format})`);

        // Generate WebP and PNG variants for each size
        for (const size of CONFIG.sizes) {
            // Skip if original is smaller than target size
            if (dimensions.width < size.width) {
                console.log(`   Skipping ${size.suffix} - original smaller than target`);
                continue;
            }

            const targetWidth = Math.min(size.width, dimensions.width);

            // Generate WebP variant
            const webpPath = path.join(dir, `${name}${size.suffix}.webp`);
            await sharp(inputPath)
                .resize(targetWidth, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: CONFIG.webpQuality })
                .toFile(webpPath);

            // Generate PNG fallback
            const pngPath = path.join(dir, `${name}${size.suffix}.png`);
            await sharp(inputPath)
                .resize(targetWidth, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .png({
                    quality: CONFIG.pngQuality,
                    compressionLevel: 9
                })
                .toFile(pngPath);

            console.log(`   ✅ Generated ${size.suffix} variants (WebP + PNG)`);
        }

        return true;
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return false;
    }
}

/**
 * Optimize a single-size image (logos, icons)
 */
async function optimizeSingleSizeImage(inputPath) {
    try {
        console.log(`🔄 Processing single-size image: ${inputPath}`);

        const dimensions = await getImageDimensions(inputPath);
        if (!dimensions) return false;

        const dir = path.dirname(inputPath);
        const name = path.basename(inputPath, path.extname(inputPath));

        console.log(`   Original: ${dimensions.width}x${dimensions.height} (${dimensions.format})`);

        // Generate WebP version (same size)
        const webpPath = path.join(dir, `${name}.webp`);
        await sharp(inputPath)
            .webp({ quality: CONFIG.webpQuality })
            .toFile(webpPath);

        // Generate optimized PNG (same size)
        const pngPath = path.join(dir, `${name}-optimized.png`);
        await sharp(inputPath)
            .png({
                quality: CONFIG.pngQuality,
                compressionLevel: 9
            })
            .toFile(pngPath);

        console.log(`   ✅ Generated WebP + optimized PNG`);
        return true;
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return false;
    }
}

/**
 * Clean up unused placeholder files
 */
async function cleanupPlaceholderFiles() {
    console.log('\n🧹 Cleaning up placeholder files...');

    const placeholderPatterns = [
        'photos/testimonials/*.jpg',
        'photos/portfolio/*.jpg',
        'photos/services/feature-*.jpg'
    ];

    let removedCount = 0;

    for (const pattern of placeholderPatterns) {
        try {
            const files = await fs.glob(pattern);
            for (const file of files) {
                const stats = await fs.stat(file);
                if (stats.size === 0) {
                    await fs.unlink(file);
                    console.log(`   🗑️  Removed: ${file}`);
                    removedCount++;
                }
            }
        } catch (error) {
            console.log(`   ℹ️  No files found for pattern: ${pattern}`);
        }
    }

    console.log(`   ✅ Removed ${removedCount} placeholder files`);
}

/**
 * Main optimization function
 */
async function optimizeImages() {
    console.log('🚀 Starting image optimization process...\n');

    let successCount = 0;
    let errorCount = 0;

    // Process responsive images
    console.log('📱 Processing responsive images...');
    for (const imagePath of CONFIG.responsiveImages) {
        const fullPath = path.join(__dirname, imagePath);
        try {
            await fs.access(fullPath);
            const success = await optimizeResponsiveImage(fullPath);
            if (success) successCount++;
            else errorCount++;
        } catch (error) {
            console.log(`   ⚠️  File not found: ${imagePath}`);
            errorCount++;
        }
    }

    // Process single-size images
    console.log('\n🎯 Processing single-size images...');
    for (const imagePath of CONFIG.singleSizeImages) {
        const fullPath = path.join(__dirname, imagePath);
        try {
            await fs.access(fullPath);
            const success = await optimizeSingleSizeImage(fullPath);
            if (success) successCount++;
            else errorCount++;
        } catch (error) {
            console.log(`   ⚠️  File not found: ${imagePath}`);
            errorCount++;
        }
    }

    // Clean up placeholder files
    await cleanupPlaceholderFiles();

    console.log('\n📊 Optimization Summary:');
    console.log(`   ✅ Successfully processed: ${successCount} images`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log('\n🎉 Image optimization complete!');
    console.log('\nNext steps:');
    console.log('1. Update HTML files to use <picture> elements');
    console.log('2. Test the optimized images in browsers');
    console.log('3. Measure performance improvements');
}

// Check if Sharp is available
try {
    require('sharp');
} catch (error) {
    console.error('❌ Sharp library not found. Please install it first:');
    console.error('   npm install sharp');
    process.exit(1);
}

// Run optimization
optimizeImages().catch(error => {
    console.error('❌ Fatal error during optimization:', error);
    process.exit(1);
});