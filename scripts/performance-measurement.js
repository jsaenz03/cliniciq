// Performance Measurement Script for Image Optimization
// This script tracks image loading performance after optimization

(function() {
    'use strict';

    const performanceData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        connection: navigator.connection ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink
        } : null,
        images: [],
        coreWebVitals: {},
        totalImagePayload: 0,
        optimizationMetrics: {
            webPSupport: false,
            pictureElementSupport: false,
            responsiveImagesLoaded: 0,
            fallbackImagesLoaded: 0
        }
    };

    // Check WebP support
    function checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const dataURL = canvas.toDataURL('image/webp');
        performanceData.optimizationMetrics.webPSupport = dataURL.indexOf('data:image/webp') === 0;
    }

    // Check picture element support
    function checkPictureElementSupport() {
        performanceData.optimizationMetrics.pictureElementSupport = 'HTMLPictureElement' in window;
    }

    // Measure image loading performance with optimization tracking
    function measureImagePerformance() {
        const images = document.querySelectorAll('img');

        images.forEach((img, index) => {
            const startTime = performance.now();

            // Check if this is inside a picture element
            const isInPicture = img.closest('picture') !== null;
            const pictureSources = isInPicture ? img.closest('picture').querySelectorAll('source') : [];

            if (img.complete) {
                // Image already loaded
                const loadTime = performance.now() - startTime;
                const entry = {
                    src: img.src,
                    alt: img.alt || 'No alt text',
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    loadTime: Math.round(loadTime),
                    size: 0,
                    optimized: isInPicture,
                    webPUsed: img.src.includes('.webp'),
                    responsiveVariant: img.src.includes('-mobile') || img.src.includes('-tablet') || img.src.includes('-desktop')
                };

                if (entry.optimized) {
                    if (entry.webPUsed) {
                        performanceData.optimizationMetrics.responsiveImagesLoaded++;
                    } else {
                        performanceData.optimizationMetrics.fallbackImagesLoaded++;
                    }
                }

                performanceData.images.push(entry);
            } else {
                // Image still loading
                img.addEventListener('load', function() {
                    const loadTime = performance.now() - startTime;
                    const entry = {
                        src: img.src,
                        alt: img.alt || 'No alt text',
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                        loadTime: Math.round(loadTime),
                        size: 0,
                        optimized: isInPicture,
                        webPUsed: img.src.includes('.webp'),
                        responsiveVariant: img.src.includes('-mobile') || img.src.includes('-tablet') || img.src.includes('-desktop')
                    };

                    if (entry.optimized) {
                        if (entry.webPUsed) {
                            performanceData.optimizationMetrics.responsiveImagesLoaded++;
                        } else {
                            performanceData.optimizationMetrics.fallbackImagesLoaded++;
                        }
                    }

                    performanceData.images.push(entry);
                });

                img.addEventListener('error', function() {
                    const entry = {
                        src: img.src,
                        alt: img.alt || 'No alt text',
                        error: true,
                        loadTime: Math.round(performance.now() - startTime),
                        optimized: isInPicture
                    };
                    performanceData.images.push(entry);
                });
            }
        });
    }

    // Estimate optimized image payload
    function estimateOptimizedImagePayload() {
        // Size estimates for optimized images (based on actual optimization results)
        const optimizedSizeEstimates = {
            'services/automations-mobile.webp': 50000,
            'services/automations-tablet.webp': 123000,
            'services/calculators-mobile.webp': 56000,
            'services/calculators-tablet.webp': 109000,
            'services/downloads-mobile.webp': 39000,
            'services/downloads-tablet.webp': 73000,
            'services/websites-mobile.webp': 31000,
            'services/websites-tablet.webp': 56000,
            'hero/top-mobile.webp': 18000,
            'hero/top-tablet.webp': 26000,
            'about/about-office-workspace-mobile.webp': 60000,
            'branding/cliniciq-logo.webp': 78000,
            'branding/cliniciq-logo-optimized.png': 65000
        };

        const images = document.querySelectorAll('img');
        let totalPayload = 0;

        images.forEach(img => {
            let estimatedSize = 30000; // Default 30KB for unknown images

            for (const [pattern, size] of Object.entries(optimizedSizeEstimates)) {
                if (img.src.includes(pattern)) {
                    estimatedSize = size;
                    break;
                }
            }

            // If not an optimized image, use original size estimates
            if (estimatedSize === 30000) {
                const originalSizeEstimates = {
                    'services/automations.png': 2100000,
                    'services/calculators.png': 2000000,
                    'services/downloads.png': 1800000,
                    'services/websites.png': 1700000,
                    'hero/top.png': 216000,
                    'about/about-office-workspace.png': 255000,
                    'about/about-office-workspace2.png': 970000,
                    'branding/cliniciq-logo.png': 376000
                };

                for (const [pattern, size] of Object.entries(originalSizeEstimates)) {
                    if (img.src.includes(pattern)) {
                        estimatedSize = size;
                        break;
                    }
                }
            }

            totalPayload += estimatedSize;
        });

        performanceData.totalImagePayload = totalPayload;
    }

    // Measure Core Web Vitals
    function measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            performanceData.coreWebVitals.LCP = Math.round(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
                performanceData.coreWebVitals.FID = Math.round(entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            performanceData.coreWebVitals.CLS = Math.round(clsValue * 1000) / 1000;
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // Compare with baseline
    function compareWithBaseline() {
        const baseline = localStorage.getItem('performanceBaseline');
        if (baseline) {
            const baselineData = JSON.parse(baseline);
            performanceData.baselineComparison = {
                imagePayloadReduction: Math.round((1 - performanceData.totalImagePayload / baselineData.totalImagePayload) * 100),
                lcpImprovement: baselineData.coreWebVitals.LCP - performanceData.coreWebVitals.LCP,
                optimizationApplied: true
            };
        }
    }

    // Initialize measurements
    function init() {
        console.log('📊 Performance measurement started (optimized images)...');

        checkWebPSupport();
        checkPictureElementSupport();
        measureImagePerformance();
        measureCoreWebVitals();

        // Wait for page to fully load before estimating payload
        window.addEventListener('load', function() {
            setTimeout(() => {
                estimateOptimizedImagePayload();
                compareWithBaseline();

                // Wait a bit more for any late-loading images
                setTimeout(() => {
                    console.log('📊 Performance measurement complete (optimized images):');
                    console.log(JSON.stringify(performanceData, null, 2));

                    // Store in localStorage for comparison
                    localStorage.setItem('performanceOptimized', JSON.stringify(performanceData));

                    // Log optimization summary
                    console.log('=== OPTIMIZATION SUMMARY ===');
                    console.log(`WebP Support: ${performanceData.optimizationMetrics.webPSupport ? '✅' : '❌'}`);
                    console.log(`Picture Element Support: ${performanceData.optimizationMetrics.pictureElementSupport ? '✅' : '❌'}`);
                    console.log(`Responsive Images Loaded: ${performanceData.optimizationMetrics.responsiveImagesLoaded}`);
                    console.log(`Fallback Images Loaded: ${performanceData.optimizationMetrics.fallbackImagesLoaded}`);

                    if (performanceData.baselineComparison) {
                        console.log(`Image Payload Reduction: ${performanceData.baselineComparison.imagePayloadReduction}%`);
                        console.log(`LCP Improvement: ${performanceData.baselineComparison.lcpImprovement}ms`);
                    }

                }, 2000);
            }, 1000);
        });
    }

    // Start measurement when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();