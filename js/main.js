/* ==========================================================================
   Pearl Smile Clinic - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. AOS Initialization --- */
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    /* --- 2. Header Scroll Effect --- */
    const header = document.getElementById('header');
    const topBar = document.querySelector('.top-info-bar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 3. Mobile Menu Toggle --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const body = document.body;

    function toggleMenu() {
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');

        // Toggle FontAwesome icon
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            icon.style.color = '#0A1128'; /* dark color when menu is open because bg is white */
            body.style.overflow = 'hidden'; /* Lock scroll */
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            icon.style.color = '';
            body.style.overflow = ''; /* Unlock scroll */
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* --- 4. Counter Animation (Intersection Observer) --- */
    const statsSection = document.getElementById('stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const isFloat = counter.classList.contains('float-target');
            let startTimestamp = null;

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * target;

                if (isFloat) {
                    counter.innerText = currentVal.toFixed(1);
                } else {
                    counter.innerText = Math.floor(currentVal);
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    counter.innerText = isFloat ? target.toFixed(1) : target;
                }
            };
            window.requestAnimationFrame(step);
        });
    };

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    /* --- 4b. Counter Animation for Stats V2 (Homepage Redesign) --- */
    const statsV2Section = document.querySelector('.stats-v2-section');
    const statV2Counters = document.querySelectorAll('[data-count-v2]');
    let countersV2Animated = false;

    if (statsV2Section && statV2Counters.length > 0) {
        const observerV2 = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersV2Animated) {
                countersV2Animated = true;
                statV2Counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-count-v2'));
                    const isDecimal = counter.hasAttribute('data-decimal-v2');
                    const duration = 2500;
                    let startTimestamp = null;

                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        let current;

                        if (isDecimal) {
                            current = (eased * target).toFixed(1);
                        } else {
                            current = Math.floor(eased * target);
                            if (target >= 1000) current = current.toLocaleString('en-US');
                        }

                        counter.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            counter.textContent = isDecimal ? target.toFixed(1) : (target >= 1000 ? target.toLocaleString('en-US') : target);
                        }
                    };
                    requestAnimationFrame(step);
                });
                observerV2.unobserve(statsV2Section);
            }
        }, { threshold: 0.3 });

        observerV2.observe(statsV2Section);
    }

    /* --- 5. Before/After Slider --- */
    const baSliders = document.querySelectorAll('.ba-slider-container');
    baSliders.forEach(container => {
        const input = container.querySelector('.ba-slider-input');
        if (input) {
            input.addEventListener('input', (e) => {
                // Update the --position CSS variable, purely driving the clip-path and handle position
                container.style.setProperty('--position', `${e.target.value}%`);
            });
        }
    });

    /* --- 6. Swiper.js Initialization --- */
    if (document.querySelector('.testimonialSwiper')) {
        const swiper = new Swiper('.testimonialSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    /* --- 6b. Doctors Page Testimonials Swiper --- */
    if (document.querySelector('.doctorTestimonialsSwiper')) {
        new Swiper('.doctorTestimonialsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.doctorTestimonialsSwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.doctorTestimonialsSwiper .swiper-button-next',
                prevEl: '.doctorTestimonialsSwiper .swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            },
        });
    }

    /* --- 7. Back to Top Button + Smooth Scroll --- */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }

                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- 8. Booking Form Validation --- */
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('patientName');
            const phoneInput = document.getElementById('patientPhone');
            let isValid = true;

            // Validate Name (min 3 chars)
            if (nameInput.value.trim().length < 3) {
                nameInput.classList.add('invalid');
                nameInput.nextElementSibling.style.display = 'block';
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
                nameInput.nextElementSibling.style.display = 'none';
            }

            // Validate Phone (Saudi format: starts with 05, 10 digits)
            const phoneRegex = /^05\d{8}$/;
            if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                phoneInput.classList.add('invalid');
                phoneInput.nextElementSibling.style.display = 'block';
                isValid = false;
            } else {
                phoneInput.classList.remove('invalid');
                phoneInput.nextElementSibling.style.display = 'none';
            }

            if (isValid) {
                // Form is valid, redirect to WhatsApp
                const name = encodeURIComponent(nameInput.value.trim());
                const phone = encodeURIComponent(phoneInput.value.replace(/\s/g, ''));
                const message = encodeURIComponent(`مرحباً، أود حجز استشارة.
الاسم: ${nameInput.value.trim()}
رقم الجوال: ${phoneInput.value.trim()}`);

                // Open WhatsApp
                window.open(`https://wa.me/966XXXXXXXXX?text=${message}`, '_blank');

                // Reset form
                bookingForm.reset();
            }
        });

        // Remove error state on input
        const inputs = bookingForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                if (input.nextElementSibling) {
                    input.nextElementSibling.style.display = 'none';
                }
            });
        });
    }

    /* --- 9. FAQ Accordion (Premium) --- */
    const faqQuestionsPremium = document.querySelectorAll('.faq-question-premium');

    if (faqQuestionsPremium.length > 0) {
        faqQuestionsPremium.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const answer = question.nextElementSibling;
                const isActive = item.classList.contains('active');

                // Close all others
                document.querySelectorAll('.faq-item-premium').forEach(qItem => {
                    qItem.classList.remove('active');
                    qItem.querySelector('.faq-answer-premium').style.maxHeight = null;
                });

                // If it wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    }

    /* --- 10. FAQ Accordion (Standard - Keep for backwards compatibility) --- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = question.classList.contains('active');

                // Close all others
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                });

                // If it wasn't active, open it
                if (!isActive) {
                    question.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    }

    /* ============================================================
       CONTACT PAGE LOGIC
       ============================================================ */

    /* --- 11. Smart Booking Form Validation & Submission --- */
    const smartBookingForm = document.getElementById('smartBookingForm');

    if (smartBookingForm) {
        // Prevent typing non-numbers in phone input
        const phoneInput = document.getElementById('phoneNum');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^0-9]/g, '');

                // Real-time length check
                if (this.value.length > 10) {
                    this.value = this.value.slice(0, 10);
                }
            });
        }

        smartBookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // 1. Validate Name (min 3 chars)
            const nameInput = document.getElementById('fullName');
            if (nameInput.value.trim().length < 3) {
                nameInput.parentElement.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                nameInput.parentElement.parentElement.classList.remove('has-error');
            }

            // 2. Validate Phone (starts with 05, exactly 10 digits)
            const phoneVal = phoneInput.value.trim();
            const phoneRegex = /^05\d{8}$/;
            if (!phoneRegex.test(phoneVal)) {
                phoneInput.parentElement.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                phoneInput.parentElement.parentElement.classList.remove('has-error');
            }

            // 3. Validate Service Dropdown
            const serviceSelect = document.getElementById('serviceType');
            if (serviceSelect.value === "") {
                serviceSelect.parentElement.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                serviceSelect.parentElement.parentElement.classList.remove('has-error');
            }

            // If valid, build WhatsApp message and redirect
            if (isValid) {
                const name = nameInput.value.trim();
                const phone = phoneVal;
                const service = serviceSelect.value;
                const doctor = document.getElementById('preferredDoctor').value;
                const time = document.querySelector('input[name="preferredTime"]:checked').value;
                const notes = document.getElementById('formNotes').value.trim();

                let message = `مرحباً، أرغب في حجز موعد في عيادة بيرل سمايل\n\n`;
                message += `*الاسم:* ${name}\n`;
                message += `*الجوال:* ${phone}\n`;
                message += `*الخدمة:* ${service}\n`;
                message += `*الطبيب:* ${doctor}\n`;
                message += `*الفترة:* ${time}`;

                if (notes) {
                    message += `\n*ملاحظات:* ${notes}`;
                }

                // Clinic WhatsApp Number
                const waNumber = "9665XXXXXXXX";
                const encodedMessage = encodeURIComponent(message);
                const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

                // Change button state temporarily
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التحويل...';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    window.open(waUrl, '_blank');
                    // Optional: smartBookingForm.reset();
                }, 800);
            }
        });

        // Remove error state on input/change
        const formInputs = smartBookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.parentElement.parentElement.classList.remove('has-error');
            });
            input.addEventListener('change', function () {
                this.parentElement.parentElement.classList.remove('has-error');
            });
        });
    }

    /* --- 12. Working Hours Live Status (Riyadh Time) --- */
    const liveBadge = document.getElementById('liveStatusBadge');
    const scheduleBody = document.getElementById('scheduleBody');

    if (liveBadge && scheduleBody) {
        function updateStoreStatus() {
            // Get current time in Riyadh timezone
            const riyadhTimeOptions = { timeZone: 'Asia/Riyadh', hour12: false, hour: 'numeric', minute: 'numeric', weekday: 'long' };
            const now = new Date();
            const riyadhFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', hour12: false, hour: 'numeric', minute: 'numeric' });
            const [hourStr, minStr] = riyadhFormatter.format(now).split(':');

            const riyadhHour = parseInt(hourStr);
            const riyadhDayMap = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', weekday: 'short' }).format(now);

            // Map JS getDay() equivalents based on Riyadh time
            const dayNameToNum = {
                'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
            };
            const currentRiyadhDay = dayNameToNum[riyadhDayMap];

            // Highlight current day in table
            const allRows = scheduleBody.querySelectorAll('tr');
            allRows.forEach(row => row.classList.remove('current-day'));

            const currentRow = scheduleBody.querySelector(`tr[data-day="${currentRiyadhDay}"]`);
            if (currentRow) currentRow.classList.add('current-day');

            // Check if open (Saturday(6) to Thursday(4), 09:00 to 21:00)
            let isOpen = false;

            if (currentRiyadhDay !== 5) { // If not Friday
                if (riyadhHour >= 9 && riyadhHour < 21) {
                    isOpen = true; // Open between 09:00:00 and 20:59:59
                }
            }

            const statusText = liveBadge.querySelector('.status-text');
            const isEnglish = document.documentElement.lang === 'en';

            if (isOpen) {
                liveBadge.classList.remove('closed');
                liveBadge.classList.add('open');
                statusText.textContent = isEnglish ? "Open Now" : "مفتوح الآن";
            } else {
                liveBadge.classList.remove('open');
                liveBadge.classList.add('closed');
                statusText.textContent = isEnglish ? "Closed Now" : "مغلق حالياً";
            }
        }

        // Run immediately
        updateStoreStatus();

        // Update every minute to catch hour changes
        setInterval(updateStoreStatus, 60000);
    }

    /* --- 13. Blog Category Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn, .p-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterBtns.length > 0 && blogCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                blogCards.forEach(card => {
                    // Slight reset for animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hidden');
                            // Trigger reflow
                            void card.offsetWidth;
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        } else {
                            card.classList.add('hidden');
                        }
                    }, 300); // Wait for fade out
                });
            });
        });
    }

    /* --- 14a. Blog Post — TOC Active State (Intersection Observer) --- */
    const tocLinks = document.querySelectorAll('.toc-link');
    const articleH2s = document.querySelectorAll('.article-content h2[id]');

    if (tocLinks.length > 0 && articleH2s.length > 0) {
        const tocObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });

        articleH2s.forEach(h2 => tocObserver.observe(h2));

        // Smooth scroll for TOC links
        tocLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    const headerH = header ? header.offsetHeight : 80;
                    const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            });
        });
    }

    /* --- 14b. Blog Post — Share Buttons --- */
    const shareTwitterBtn = document.getElementById('shareTwitter');
    const shareWABtn = document.getElementById('shareWhatsApp');
    const shareCopyBtn = document.getElementById('shareCopyLink');
    const copyToast = document.getElementById('copyToast');

    if (shareTwitterBtn) {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        shareTwitterBtn.addEventListener('click', () => {
            window.open('https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle, '_blank');
        });
    }
    if (shareWABtn) {
        shareWABtn.addEventListener('click', () => {
            const pageUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);
            window.open('https://wa.me/?text=' + pageTitle + '%20' + pageUrl, '_blank');
        });
    }
    if (shareCopyBtn && copyToast) {
        shareCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                copyToast.classList.add('show');
                setTimeout(() => copyToast.classList.remove('show'), 2000);
            });
        });
    }

    /* --- 14c. Blog Post Newsletter Form --- */
    const bpNewsletterForm = document.getElementById('bpNewsletterForm');
    if (bpNewsletterForm) {
        bpNewsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && emailRegex.test(emailInput.value.trim())) {
                const btn = this.querySelector('button');
                const orig = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> تم التسجيل';
                btn.disabled = true;
                emailInput.disabled = true;
                setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; emailInput.disabled = false; emailInput.value = ''; }, 3000);
            }
        });
    }

    /* --- 14. Newsletter Subscription Form Validation --- */
    const newsletterForm = document.getElementById('newsletterForm');
    const subscriberEmail = document.getElementById('subscriberEmail');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!subscriberEmail.value.trim() || !emailRegex.test(subscriberEmail.value.trim())) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');

                // Simulate API call / Success
                const btn = this.querySelector('.ns-submit');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    newsletterForm.style.display = 'none';
                    newsletterSuccess.classList.remove('hidden');
                    // Optional: reset form
                    // this.reset();
                }, 1500);
            }
        });

        // Remove error state on input
        if (subscriberEmail) {
            subscriberEmail.addEventListener('input', function () {
                newsletterForm.classList.remove('invalid');
            });
        }
    }

});
