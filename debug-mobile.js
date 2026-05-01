const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });

  console.log('Loading page at http://localhost:8000');
  await page.goto('http://localhost:8000');

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Check if ps-scene-image elements exist and are visible
  const images = await page.evaluate(() => {
    const imgElements = document.querySelectorAll('.ps-scene-image');
    const results = [];

    imgElements.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(img);
      const parent = img.closest('.ps-animation-content');
      const parentStyle = parent ? window.getComputedStyle(parent) : null;

      results.push({
        index,
        src: img.src,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        width: rect.width,
        height: rect.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        loaded: img.complete && img.naturalWidth > 0,
        position: computedStyle.position,
        parentDisplay: parentStyle ? parentStyle.display : 'no parent',
        parentPosition: parentStyle ? parentStyle.position : 'no parent',
        parentWidth: parent ? parent.offsetWidth : 'no parent',
        parentHeight: parent ? parent.offsetHeight : 'no parent',
      });
    });

    return results;
  });

  console.log('\n=== PS-SCENE-IMAGE INSPECTION ===');
  console.log(JSON.stringify(images, null, 2));

  // Also check the placeholder containers
  const placeholders = await page.evaluate(() => {
    const elements = document.querySelectorAll('.ps-animation-placeholder');
    const results = [];

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);

      results.push({
        index,
        width: rect.width,
        height: rect.height,
        display: computedStyle.display,
        position: computedStyle.position,
        offsetWidth: el.offsetWidth,
        offsetHeight: el.offsetHeight,
      });
    });

    return results;
  });

  console.log('\n=== PS-ANIMATION-PLACEHOLDER INSPECTION ===');
  console.log(JSON.stringify(placeholders, null, 2));

  // Take a screenshot
  await page.screenshot({ path: 'mobile-debug.png', fullPage: false });
  console.log('\nScreenshot saved to mobile-debug.png');

  await browser.close();
})();
