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

