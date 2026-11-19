        (function () {
            var modal = document.getElementById('samples-modal');
            var btn = document.getElementById('sample-websites-btn');
            if (!modal || !btn) return;
            var lastFocus = null;

            function openModal() {
                lastFocus = document.activeElement;
                modal.hidden = false;
                requestAnimationFrame(function () { modal.classList.add('active'); });
                document.body.style.overflow = 'hidden';
                modal.querySelector('.samples-modal-close').focus();
            }

            function closeModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                modal.addEventListener('transitionend', function handler() {
                    if (!modal.classList.contains('active')) modal.hidden = true;
                    modal.removeEventListener('transitionend', handler);
                });
                if (lastFocus) lastFocus.focus();
            }

            btn.addEventListener('click', openModal);
            modal.addEventListener('click', function (e) {
                if (e.target.closest('[data-samples-close]')) closeModal();
            });
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && !modal.hidden) closeModal();
            });
        })();
