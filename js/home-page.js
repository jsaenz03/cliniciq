        // Hero Video Loading Handler
        (function() {
            const heroVideo = document.querySelector('.hero-video');

            // Handle hero background video
            function setupHeroVideo(video) {
                if (!video) return;

                // Play as soon as possible
                video.play().catch(() => {});

                // Add loaded class when video can play through
                const handleVideoCanPlay = function() {
                    video.classList.add('loaded');
                    video.removeEventListener('canplaythrough', handleVideoCanPlay);
                    video.removeEventListener('loadeddata', handleVideoCanPlay);
                };

                // Listen for video ready state
                video.addEventListener('canplaythrough', handleVideoCanPlay);
                video.addEventListener('loadeddata', handleVideoCanPlay);

                // Fallback: Show video after timeout (2s) in case events don't fire
                setTimeout(() => {
                    if (!video.classList.contains('loaded')) {
                        video.classList.add('loaded');
                    }
                }, 2000);
            }

            setupHeroVideo(heroVideo);

            // Optional: Pause hero video when tab is not visible to save resources
            document.addEventListener('visibilitychange', function() {
                if (heroVideo) {
                    if (document.hidden) {
                        heroVideo.pause();
                    } else {
                        heroVideo.play().catch(function() {
                            // Autoplay was prevented - user may need to interact first
                        });
                    }
                }
            });
        })();
        // SINGLE SOURCE OF TRUTH for the "All episodes" modal list.
        // To add a video: append one {id, title, desc} entry here. The modal list updates automatically.
        // The bento grid above stays hand-curated (featured/standard tiles are a marketing layout).
        const CLINICIQ_VIDEOS = [
            { id: '2DtBSGJ4mXY', title: 'Stop Spinning Plates: How Systems & AI Buy Back Your Clinic Shift', desc: 'Why systems and AI are the only way out of the plate-spinning chaos of a modern GP clinic shift.' },
            { id: 'DZmu-4rWiM0', title: 'The Waiting-Room QR Code Most GP Clinics Are Missing', desc: 'A simple QR code in the waiting room that cuts front-desk load and saves nursing time every shift.' },
            { id: 'yZoljrfMfYs', title: 'Solo Clinic Nurse? Stop Missing Tasks With This Simple System', desc: 'A task system built for the solo practice nurse so nothing slips through the cracks on a busy day.' },
            { id: 'kUXetWV7JYM', title: 'How to Handle Impromptu Care Plan Requests Without the Panic', desc: 'A calm, repeatable workflow for the surprise care plan request that used to derail your afternoon.' },
            { id: 'cOzTymoEThc', title: 'Never Run Out of Clinic Stock: The Treatment-Room-First Method', desc: 'The treatment-room-first stock method that keeps every room and trolley fully kitted, every shift.' },
            { id: 'tZrluyIzsSQ', title: 'What Is RAG? The AI Librarian For Your Clinic\'s Policies & FAQs', desc: 'Retrieval-augmented generation explained as the AI librarian that actually knows your clinic policies.' },
            { id: 'kBEGuxyIYlQ', title: 'Time Management for Nurses: The Task System That Ends the Chaos', desc: 'A task system that turns a chaotic nursing shift into a calm, prioritised, end-to-end workflow.' },
            { id: '9-DBKaPQZjY', title: 'Stop Guessing at PipQBoard — Track and Benchmark Every Action', desc: 'How to track and benchmark every PipQBoard indicator so you stop guessing and start proving your QI work.' },
            { id: 'AMMUzUPzCSM', title: 'Find Your Target Patients in Seconds With These Excel Basics', desc: 'Excel basics for clinic nurses to find target patient cohorts in seconds, not hours of filtering.' },
            { id: 'p2xXeJ7lh28', title: 'Map Your Clinic Rooms to the Real Patient Journey', desc: 'A practical room-mapping exercise that surfaces bottlenecks in the real patient journey through your clinic.' },
            { id: 'nwlVH_u3w8U', title: 'Two Storage Rules That Kill the Rummaging in Your Clinic', desc: 'Two simple storage rules that end the daily rummage through clinic cupboards and drawers.' },
            { id: 'RDZ8zamhk9k', title: 'One Gate, Two Paths, Three Services — Clean Every Time', desc: 'A single intake gate that routes patients down the right path and the right service, every time.' },
            { id: 'nEnlFbWcCVU', title: 'Stop Retyping the Same Paragraph Fifty Times — One Page, Two Jobs', desc: 'One reusable page that does two jobs, so you stop retyping the same paragraph shift after shift.' },
            { id: 'BtgAPUFbzyk', title: 'The GP Nurse Workflow That Ends Every Care Plan With No Rejections', desc: 'A nurse-led care-plan workflow that catches every gap before billing, so plans stop coming back rejected.' },
            { id: 'VxEJ23Ew4AM', title: 'Free GP Calculators: Incentives, ROI & Savings', desc: 'Free GP calculators for incentives, ROI and savings — work out the numbers that actually move your practice.' },
            { id: 'c3nZU4oz-UQ', title: 'Smooth GP Clinic Patient Flow: Booking, Check-in & Recalls', desc: 'How to smooth patient flow from booking to check-in to recalls, so the clinic runs on time.' },
            { id: 'eib_68oixcw', title: 'Stop the Stock Count Guesswork — Three Ways to Run Your Stock App', desc: 'Three ways to run your stock app that end the guesswork and keep counts honest.' },
            { id: 'Y2QRZ4Y6SQU', title: 'GP Clinic Stock Expiry: Colour Dots = Year, Number = Month', desc: 'A colour-dot-and-number system that makes stock expiry dates readable at a glance, so expired stock never slips through.' },
            { id: 'HhBXObnlQ_Y', title: 'Best Practice Hotkeys That Save You 30 Minutes a Day', desc: 'The Best Practice hotkeys that cut clicks and reclaim around 30 minutes of nursing time every single day.' },
            { id: 'DNB8cfg1KII', title: 'Clean Your Clinic Data for Accurate PipQBoard Marks (and Better Targeting)', desc: 'How to clean and structure your clinic data so PipQBoard marks are accurate and patient targeting actually works.' },
            { id: '9PRY3sYkNL8', title: 'How New Patients Find Your GP Clinic Online (Without Going Viral)', desc: 'GP clinic marketing that works — being found nearby when patients need you, not going viral. Claim your Google Business Profile and run small-budget local ads.' },
            { id: 'hCzjEz_xWVI', title: 'Stop Rebuilding the Same PenCS Filters Every Quarter — Do This Instead', desc: 'Save your PipQBoard searches in PenCS as reusable templates, so you stop rebuilding filter sets every quarter — open, refresh and export in minutes.' }
        ];

        (function() {
            const modal = document.getElementById('videos-modal');
            const trigger = document.getElementById('videos-modal-trigger');
            const closeBtn = document.getElementById('videos-modal-close');
            const backdrop = document.getElementById('videos-modal-backdrop');
            const player = document.getElementById('videos-modal-player');
            const playerFrame = document.getElementById('videos-modal-player-frame');
            const titleEl = document.getElementById('videos-modal-title');
            const listLabel = document.getElementById('videos-modal-list-label');
            const listEl = document.getElementById('videos-modal-list');

            // Build the modal list from CLINICIQ_VIDEOS so the grid and modal never drift.
            const PLAY_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>';
            CLINICIQ_VIDEOS.forEach(function(v) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'video-list-item';
                btn.setAttribute('data-video', v.id);
                btn.setAttribute('aria-label', 'Play: ' + v.title);
                btn.innerHTML =
                    '<div class="video-list-thumbnail">' +
                        '<img src="https://img.youtube.com/vi/' + v.id + '/maxresdefault.jpg" width="1280" height="720"' +
                            ' alt="' + v.title.replace(/"/g, '&quot;') + '" loading="lazy">' +
                        '<div class="video-list-play">' + PLAY_SVG + '</div>' +
                    '</div>' +
                    '<div class="video-list-info"><h3>' + v.title + '</h3><p>' + v.desc + '</p></div>';
                // Thumbnail fallback without inline handlers (CSP: no unsafe-inline)
                const thumb = btn.querySelector('img');
                thumb.addEventListener('error', function handleErr() {
                    thumb.removeEventListener('error', handleErr);
                    thumb.src = 'https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg';
                });
                listEl.appendChild(btn);
            });

            function loadPlayer(videoId, title) {
                playerFrame.innerHTML = '';
                const iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
                iframe.title = title || 'YouTube video';
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('loading', 'lazy');
                playerFrame.appendChild(iframe);
                player.hidden = false;
                if (title) {
                    titleEl.textContent = title;
                    listLabel.textContent = 'Up next';
                }
            }

            function stopPlayer() {
                playerFrame.innerHTML = '';
                player.hidden = true;
                titleEl.textContent = 'Surviving GP Clinic';
                listLabel.textContent = 'All episodes';
            }

            function openModal(videoId, title) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                trigger.setAttribute('aria-expanded', 'true');
                if (videoId) {
                    loadPlayer(videoId, title);
                } else {
                    stopPlayer();
                }
            }

            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                trigger.setAttribute('aria-expanded', 'false');
                stopPlayer();
                modal.querySelectorAll('.video-list-item.is-active').forEach(function(el) {
                    el.classList.remove('is-active');
                });
            }

            trigger.addEventListener('click', function() { openModal(); });
            closeBtn.addEventListener('click', closeModal);
            backdrop.addEventListener('click', closeModal);

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    closeModal();
                }
            });

            // Bento grid cards: open modal with the video playing large
            document.querySelectorAll('.video-card[data-video]').forEach(function(card) {
                card.addEventListener('click', function() {
                    const videoId = card.getAttribute('data-video');
                    const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
                    openModal(videoId, title);
                });
            });

            // Suite demo link: same modal viewer, no new tab
            document.querySelectorAll('.practice-demo[data-video]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    openModal(link.getAttribute('data-video'), link.getAttribute('data-video-title') || 'Demo');
                });
            });

            // Modal list items: switch the player without reopening the modal
            modal.querySelectorAll('.video-list-item').forEach(function(item) {
                item.addEventListener('click', function() {
                    const videoId = item.getAttribute('data-video');
                    const title = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
                    modal.querySelectorAll('.video-list-item.is-active').forEach(function(el) {
                        el.classList.remove('is-active');
                    });
                    item.classList.add('is-active');
                    loadPlayer(videoId, title);
                    // Scroll the player back into view inside the modal
                    player.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        })();

// ===== CSP: static YouTube thumbnail fallbacks (previously inline onerror) =====
document.querySelectorAll('img[src*="img.youtube.com"]').forEach(function (img) {
  img.addEventListener('error', function handler() {
    img.removeEventListener('error', handler);
    img.src = img.src.replace('/maxresdefault.jpg', '/hqdefault.jpg');
  });
});
