/**
 * Demo Dental — Announcement Bar + Conversion Elements
 * 
 * Features:
 * 1. Dynamic header positioning (accounts for announcement bar height)
 * 2. Countdown timer to end of current month
 * 3. Announcement bar dismiss with smooth animation (sessionStorage)
 * 4. Clinic open/closed status (Riyadh timezone)
 * 5. Hero padding adjustment when announcement bar is present
 */
(function () {
    'use strict';

    /* ══════════════════════════════════════════
       ARABIC MONTH NAMES
       ══════════════════════════════════════════ */
    var arabicMonths = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    /* ══════════════════════════════════════════
       1. DYNAMIC HEADER + HERO POSITIONING
       The header default CSS top is 40px (for the info bar).
       When the announcement bar exists, we add its height.
       We also adjust the hero-v2 section padding.
       ══════════════════════════════════════════ */
    function getAnnouncementHeight() {
        var bar = document.getElementById('announcementBar');
        if (bar && !bar.classList.contains('bar-hidden') && bar.offsetHeight > 0) {
            return bar.offsetHeight;
        }
        return 0;
    }

    function recalcHeaderTop() {
        var header = document.getElementById('header');
        if (!header) return;

        var announcementH = getAnnouncementHeight();
        var topBar = document.getElementById('topInfoBar') || document.querySelector('.top-info-bar');
        var topBarH = 0;
        if (topBar && topBar.offsetParent !== null) {
            topBarH = topBar.offsetHeight;
        }

        // Only adjust when NOT scrolled (scrolled state sets top:0)
        if (!header.classList.contains('scrolled')) {
            header.style.top = (topBarH + announcementH) + 'px';
        }
    }

    function adjustHeroPadding() {
        var hero = document.querySelector('.hero-v2');
        if (!hero) return;
        var announcementH = getAnnouncementHeight();
        // Base padding is 120px (covers info-bar + header). Add announcement bar height.
        hero.style.paddingTop = (120 + announcementH) + 'px';
    }

    function patchScrollHandler() {
        var header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.top = '0px';
            } else {
                recalcHeaderTop();
            }
        });
    }

    /* ══════════════════════════════════════════
       2. COUNTDOWN TIMER — End of current month
       ══════════════════════════════════════════ */
    function initCountdown() {
        var daysEl = document.getElementById('cdDays');
        var hoursEl = document.getElementById('cdHours');
        var minsEl = document.getElementById('cdMins');
        var secsEl = document.getElementById('cdSecs');
        var monthEl = document.getElementById('offerMonth');

        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        function update() {
            var now = new Date();

            if (monthEl) {
                monthEl.textContent = arabicMonths[now.getMonth()];
            }

            var endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            var diff = endOfMonth.getTime() - now.getTime();

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minsEl.textContent = '00';
                secsEl.textContent = '00';
                return;
            }

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var secs = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minsEl.textContent = mins < 10 ? '0' + mins : mins;
            secsEl.textContent = secs < 10 ? '0' + secs : secs;
        }

        update();
        setInterval(update, 1000);
    }

    /* ══════════════════════════════════════════
       3. ANNOUNCEMENT BAR — Dismiss logic
       ══════════════════════════════════════════ */
    function initAnnouncementBar() {
        var bar = document.getElementById('announcementBar');
        var closeBtn = document.getElementById('announcementClose');

        if (!bar) return;

        // Check if already dismissed in this session
        if (sessionStorage.getItem('announcementDismissed') === 'true') {
            bar.style.display = 'none';
            bar.classList.add('bar-hidden');
            setTimeout(function () {
                recalcHeaderTop();
                adjustHeroPadding();
            }, 50);
            return;
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                // Smooth slide-up animation
                bar.style.transition = 'max-height 0.4s ease, opacity 0.3s ease, padding 0.4s ease';
                bar.style.maxHeight = bar.offsetHeight + 'px';
                bar.style.overflow = 'hidden';
                void bar.offsetHeight; // force reflow

                bar.style.maxHeight = '0';
                bar.style.opacity = '0';
                bar.style.padding = '0';

                setTimeout(function () {
                    bar.style.display = 'none';
                    bar.classList.add('bar-hidden');
                    recalcHeaderTop();
                    adjustHeroPadding();
                }, 400);

                sessionStorage.setItem('announcementDismissed', 'true');
            });
        }
    }

    /* ══════════════════════════════════════════
       4. CLINIC STATUS — Open/Closed (Riyadh TZ)
       ══════════════════════════════════════════ */
    function initClinicStatus() {
        var statusEl = document.getElementById('clinicStatusTopbar');
        if (!statusEl) return;

        var dotEl = statusEl.querySelector('.status-dot');
        var labelEl = statusEl.querySelector('.status-label');
        if (!dotEl || !labelEl) return;

        function updateStatus() {
            var now = new Date();

            var riyadhFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Riyadh',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric'
            });
            var timeParts = riyadhFormatter.format(now).split(':');
            var riyadhHour = parseInt(timeParts[0]);

            var dayFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Riyadh',
                weekday: 'short'
            });
            var dayName = dayFormatter.format(now);

            var isFriday = (dayName === 'Fri');
            var isOpen = !isFriday && (riyadhHour >= 9 && riyadhHour < 21);

            var isArabic = document.documentElement.lang === 'ar' ||
                           document.documentElement.dir === 'rtl';

            if (isOpen) {
                statusEl.classList.remove('closed');
                statusEl.classList.add('open');
                labelEl.textContent = isArabic ? 'مفتوح الآن' : 'Open Now';
            } else {
                statusEl.classList.remove('open');
                statusEl.classList.add('closed');
                labelEl.textContent = isArabic ? 'مغلق حالياً' : 'Closed Now';
            }
        }

        updateStatus();
        setInterval(updateStatus, 60000);
    }

    /* ══════════════════════════════════════════
       5. BOOTSTRAP
       ══════════════════════════════════════════ */
    function init() {
        initCountdown();
        initAnnouncementBar();
        initClinicStatus();
        patchScrollHandler();

        // Initial layout calculations after DOM renders
        setTimeout(function () {
            recalcHeaderTop();
            adjustHeroPadding();
        }, 100);

        window.addEventListener('resize', function () {
            recalcHeaderTop();
            adjustHeroPadding();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
