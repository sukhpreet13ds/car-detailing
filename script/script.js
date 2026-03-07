document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.main-header');

    // Sticky Header Logic removed - handled by CSS position: sticky on .navbar-full-width


    // Sidebar Toggle Logic
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (menuToggle && sidebar && sidebarClose && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeSidebar = () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Sidebar Dropdown Logic
    const sidebarDropdowns = document.querySelectorAll('.sidebar-has-dropdown');
    sidebarDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Close other dropdowns (Accordion behavior)
            sidebarDropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });

            dropdown.classList.toggle('active');
        });
    });

    // Handle Dropdown Icon Rotation and Hover (Main Navbar)
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('i.fa-chevron-down');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
                icon.style.transition = 'transform 0.4s ease';
            }
        });
        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('i.fa-chevron-down');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    // Hero Background Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Video Modal Logic
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const videoIframe = document.getElementById('videoIframe');
    const videoUrl = "https://www.youtube.com/embed/hBPvKna1Adw";

    if (playBtn && videoModal && modalClose && videoIframe) {
        playBtn.addEventListener('click', () => {
            videoIframe.src = videoUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeVideo = () => {
            videoModal.classList.remove('active');
            videoIframe.src = ""; // Stop video
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeVideo);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideo();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    function createCounter(selector, start, end, suffix, speed = 80, pause = 2000) {
        const el = document.querySelector(selector);

        function run() {
            let current = start;

            const interval = setInterval(() => {
                el.textContent = current + suffix;
                current++;

                if (current > end) {
                    clearInterval(interval);
                    setTimeout(run, pause);
                }

            }, speed);
        }

        run();
    }

    createCounter(".satisfied-customers-card h3", 1, 24, "K+");
    createCounter(".experience-box h3", 1, 20, "+", 100);

    // Progress Bar Loop — ticks 1 integer unit every N ms, same speed up and down
    function createProgressLoop(barSelector, textSelector, target, tickMs, holdMs) {
        const bar = document.querySelector(barSelector);
        const label = document.querySelector(textSelector);
        if (!bar || !label) return;

        let current = 0;
        let direction = 1;   // 1 = going up, -1 = coming down
        let holding = false;

        // Initialise at exactly 0
        bar.style.width = '0%';
        label.textContent = '0%';

        setInterval(function () {
            if (holding) return;

            current += direction;

            // Clamp to valid range
            if (current > target) current = target;
            if (current < 0) current = 0;

            bar.style.width = current + '%';
            label.textContent = current + '%';

            if (current >= target && direction === 1) {
                // Reached top — pause then reverse
                holding = true;
                setTimeout(function () {
                    direction = -1;
                    holding = false;
                }, holdMs);

            } else if (current <= 0 && direction === -1) {
                // Reached bottom — pause briefly then go up again
                holding = true;
                setTimeout(function () {
                    direction = 1;
                    holding = false;
                }, Math.round(holdMs * 0.4));
            }
        }, tickMs);
    }

    // 90%: ticks every 45ms → 90×45 = 4.05s rise/fall, hold 1.5s
    // 95%: ticks every 55ms → 95×55 = 5.22s rise/fall, hold 1.8s  (different cycle)
    createProgressLoop('.anim-bar-90', '.anim-bar-90 .progress-percent', 90, 45, 1500);
    createProgressLoop('.anim-bar-95', '.anim-bar-95 .progress-percent', 95, 55, 1800);

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    });

    revealElements.forEach(el => revealObserver.observe(el));
});


function buildProcessPath() {
    const svg = document.querySelector('.process-svg');
    const path = document.querySelector('.process-path');
    const icons = document.querySelectorAll('.process-wrapper .step-icon-wrap');

    if (!svg || !path || icons.length < 2) return;

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0) return;

    const VW = 1000; // viewBox width
    const VH = 200;  // viewBox height

    // Map each icon center to SVG viewBox coordinates
    const pts = Array.from(icons).map(icon => {
        const r = icon.getBoundingClientRect();
        return {
            x: ((r.left + r.width / 2) - svgRect.left) / svgRect.width * VW,
            y: ((r.top + r.height / 2) - svgRect.top) / svgRect.height * VH
        };
    });

    // Build smooth cubic bezier S-curve through all points
    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const cx = (a.x + b.x) / 2; // control point x halfway between
        d += ` C ${cx.toFixed(1)},${a.y.toFixed(1)} ${cx.toFixed(1)},${b.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
    }

    path.setAttribute('d', d);
}

// Run once the full layout (including images) has painted
window.addEventListener('load', buildProcessPath);
window.addEventListener('resize', buildProcessPath);

// =============================================
// Team Carousel — Peek Style
// Active card perfectly centred, neighbours peek from sides
// =============================================
(function () {
    const wrapper = document.querySelector('.team-carousel-wrapper');
    const grid = document.getElementById('teamGrid');
    const dots = document.querySelectorAll('.team-dot');
    const cards = grid ? Array.from(grid.querySelectorAll('.team-card')) : [];
    const total = cards.length;

    if (!grid || total === 0) return;

    const GAP = 20;          // gap between cards in px
    const CARD_RATIO = 0.78; // card width as fraction of wrapper width

    let current = 0;
    let timer;

    function isMobile() { return window.innerWidth <= 991; }

    // Set card widths & grid padding so active card is always centred
    function setupPeek() {
        const wW = wrapper.offsetWidth;
        const cW = Math.round(wW * CARD_RATIO);
        const pad = Math.round((wW - cW) / 2); // padding centres first card

        grid.style.paddingLeft = pad + 'px';
        grid.style.paddingRight = pad + 'px';
        grid.style.gap = GAP + 'px';

        cards.forEach(c => {
            c.style.width = cW + 'px';
            c.style.minWidth = cW + 'px';
            c.style.flexShrink = '0';
        });
    }

    // Slide to card [index], centred
    function goTo(index) {
        current = (index + total) % total;

        if (isMobile()) {
            const cW = cards[0].offsetWidth;
            const translate = current * (cW + GAP);
            grid.style.transform = `translateX(-${translate}px)`;
        }

        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }

    function startAuto() {
        clearInterval(timer);
        timer = setInterval(next, 3000);
    }

    function resetLayout() {
        if (isMobile()) {
            setupPeek();
            goTo(current);
            startAuto();
        } else {
            // Desktop: undo all inline styles
            grid.style.transform = '';
            grid.style.paddingLeft = '';
            grid.style.paddingRight = '';
            grid.style.gap = '';
            cards.forEach(c => { c.style.width = ''; c.style.minWidth = ''; });
            clearInterval(timer);
        }
    }

    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            goTo(parseInt(this.dataset.index));
            startAuto();
        });
    });

    // Boot
    window.addEventListener('load', resetLayout);
    window.addEventListener('resize', resetLayout);
    resetLayout();
})();

// Contact Info Toggle (Mobile)
function toggleContactInfo() {
    const wrap = document.getElementById('mobileContactInfo');
    const btn = document.querySelector('.btn-info-toggle');
    if (!wrap || !btn) return;

    const icon = btn.querySelector('i');
    wrap.classList.toggle('show');

    if (wrap.classList.contains('show')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}
