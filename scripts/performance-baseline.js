// Performance Baseline Measurement Script
// This script measures current image loading performance before optimization

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
        totalImagePayload: 0
    };

    // Measure image loading performance
    function measureImagePerformance() {
        const images = document.querySelectorAll('img');

        images.forEach((img, index) => {
            if (img.complete) {
                // Image already loaded
                const entry = {
                    src: img.src,
                    alt: img.alt || 'No alt text',
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    loadTime: 0, // Already loaded
                    size: 0 // Will be estimated
                };
                performanceData.images.push(entry);
            } else {
                // Image still loading
                const startTime = performance.now();
                img.addEventListener('load', function() {
                    const loadTime = performance.now() - startTime;
                    const entry = {
                        src: img.src,
                        alt: img.alt || 'No alt text',
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                        loadTime: Math.round(loadTime),
                        size: 0 // Will be estimated
                    };
                    performanceData.images.push(entry);
                });

                img.addEventListener('error', function() {
                    const entry = {
                        src: img.src,
                        alt: img.alt || 'No alt text',
                        error: true,
                        loadTime: Math.round(performance.now() - startTime)
                    };
                    performanceData.images.push(entry);
                });
            }
        });
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

    // Estimate total image payload
    function estimateImagePayload() {
        // This is a rough estimation based on common image sizes
        // In a real scenario, you'd want to get actual file sizes from the server
        const sizeEstimates = {
            'services/automations.png': 2100000,
            'services/calculators.png': 2000000,
            'services/downloads.png': 1800000,
            'services/websites.png': 1700000,
            'hero/top.png': 216000,
            'about/about-office-workspace.png': 255000,
            'about/about-office-workspace2.png': 970000,
            'branding/cliniciq-logo.png': 376000
        };

        const images = document.querySelectorAll('img');
        let totalPayload = 0;

        images.forEach(img => {
            let estimatedSize = 50000; // Default 50KB for unknown images

            for (const [pattern, size] of Object.entries(sizeEstimates)) {
                if (img.src.includes(pattern)) {
                    estimatedSize = size;
                    break;
                }
            }

            totalPayload += estimatedSize;
        });

        performanceData.totalImagePayload = totalPayload;
    }

    // Initialize measurements
    function init() {
        console.log('📊 Performance baseline measurement started...');

        measureImagePerformance();
        measureCoreWebVitals();

        // Wait for page to fully load before estimating payload
        window.addEventListener('load', function() {
            setTimeout(() => {
                estimateImagePayload();

                // Wait a bit more for any late-loading images
                setTimeout(() => {
                    console.log('📊 Performance baseline measurement complete:');
                    console.log(JSON.stringify(performanceData, null, 2));

                    // Store in localStorage for comparison
                    localStorage.setItem('performanceBaseline', JSON.stringify(performanceData));

                    // Also log to console for easy copying
                    console.log('=== PERFORMANCE BASELINE DATA ===');
                    console.log('Copy this data for comparison:');
                    console.log(JSON.stringify(performanceData, null, 2));

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