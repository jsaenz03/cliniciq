        // Download functionality
        function downloadFile(filename) {
            // In a real implementation, this would trigger an actual download
            // For now, we'll show a notification
            alert(`Starting download: ${filename}\n\nNote: This is a demo. In production, this would download the actual file.`);
        }

// ===== CSP: bind download buttons previously on inline attributes =====
document.querySelectorAll('[data-download]').forEach(function (el) {
  el.addEventListener('click', function () { downloadFile(el.dataset.download); });
});
