/**
 * Booking System — Multi-step Full-screen Takeover Modal
 * Self-contained JS that injects HTML and hooks into booking buttons
 */
(function () {
    'use strict';

    /* ── Language Detection ── */
    var lang = (document.documentElement.lang || 'ar').substring(0, 2);
    var isAR = lang === 'ar';

    /* ── Data ── */
    var SERVICES = [
        { id: 'implants', icon: 'fa-solid fa-tooth', ar: 'زراعة الأسنان', en: 'Dental Implants' },
        { id: 'whitening', icon: 'fa-solid fa-wand-magic-sparkles', ar: 'تبييض الأسنان', en: 'Teeth Whitening' },
        { id: 'orthodontics', icon: 'fa-solid fa-teeth', ar: 'تقويم الأسنان', en: 'Orthodontics' },
        { id: 'veneers', icon: 'fa-solid fa-star', ar: 'ابتسامة هوليوود', en: 'Hollywood Smile' },
        { id: 'endodontics', icon: 'fa-solid fa-microscope', ar: 'علاج العصب', en: 'Root Canal' },
        { id: 'pediatric', icon: 'fa-solid fa-child', ar: 'أسنان الأطفال', en: 'Pediatric' },
        { id: 'cleaning', icon: 'fa-solid fa-droplet', ar: 'تنظيف وتلميع', en: 'Cleaning' },
        { id: 'crowns', icon: 'fa-solid fa-puzzle-piece', ar: 'تركيبات وجسور', en: 'Crowns & Bridges' }
    ];

    var DOCTORS = [
        { id: 'ahmed', ar: 'د. أحمد الراشدي', en: 'Dr. Ahmed Al-Rashedi', specAr: 'استشاري زراعة الأسنان', specEn: 'Implant Consultant', rating: '4.9', services: ['implants', 'crowns'] },
        { id: 'fatima', ar: 'د. فاطمة الحسن', en: 'Dr. Fatima Al-Hassan', specAr: 'أخصائية تقويم الأسنان', specEn: 'Orthodontics Specialist', rating: '4.8', services: ['orthodontics'] },
        { id: 'khalid', ar: 'د. خالد المنصور', en: 'Dr. Khalid Al-Mansour', specAr: 'استشاري تجميل الأسنان', specEn: 'Cosmetic Consultant', rating: '4.9', services: ['veneers', 'whitening', 'cleaning'] },
        { id: 'noura', ar: 'د. نورة العتيبي', en: 'Dr. Noura Al-Otaibi', specAr: 'أخصائية أسنان الأطفال', specEn: 'Pediatric Specialist', rating: '5.0', services: ['pediatric'] }
    ];

    var TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

    var DAY_NAMES = isAR
        ? ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var MONTH_NAMES = isAR
        ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var T = isAR ? {
        title: 'احجز موعدك',
        step1: 'اختر الخدمة', step1d: 'حدد نوع العلاج المطلوب',
        step2: 'اختر الطبيب', step2d: 'اختر الطبيب المناسب لعلاجك',
        step3: 'التاريخ والوقت', step3d: 'حدد التاريخ والوقت المناسبين لك',
        step4: 'بياناتك', step4d: 'أدخل بياناتك لتأكيد الحجز',
        step5: 'تأكيد الحجز',
        next: 'التالي', back: 'رجوع', confirm: 'تأكيد الحجز',
        name: 'الاسم الكامل', phone: 'رقم الجوال', notes: 'ملاحظات (اختياري)',
        errName: 'الرجاء إدخال اسمك', errPhone: 'الرجاء إدخال رقم جوال صحيح',
        selectTime: 'اختر الوقت', booked: 'محجوز',
        service: 'الخدمة', doctor: 'الطبيب', date: 'التاريخ', time: 'الوقت',
        successTitle: 'تم الحجز بنجاح!', successMsg: 'سيتواصل معك فريقنا خلال ساعة لتأكيد موعدك. شكراً لاختيارك عيادتنا.',
        fri: 'الجمعة مغلقة', allDocs: 'جميع الأطباء متاحون لهذه الخدمة',
        trust1: 'استشارة مجانية', trust2: 'إلغاء مجاني', trust3: 'تأكيد فوري'
    } : {
        title: 'Book Appointment',
        step1: 'Select Service', step1d: 'Choose the treatment you need',
        step2: 'Select Doctor', step2d: 'Choose your preferred doctor',
        step3: 'Date & Time', step3d: 'Pick a date and time that works for you',
        step4: 'Your Details', step4d: 'Enter your details to confirm',
        step5: 'Confirm Booking',
        next: 'Next', back: 'Back', confirm: 'Confirm Booking',
        name: 'Full Name', phone: 'Phone Number', notes: 'Notes (optional)',
        errName: 'Please enter your name', errPhone: 'Please enter a valid phone number',
        selectTime: 'Select Time', booked: 'Booked',
        service: 'Service', doctor: 'Doctor', date: 'Date', time: 'Time',
        successTitle: 'Booking Confirmed!', successMsg: 'Our team will contact you within an hour to confirm your appointment. Thank you for choosing our clinic.',
        fri: 'Closed on Friday', allDocs: 'All doctors available for this service',
        trust1: 'Free consultation', trust2: 'Free cancellation', trust3: 'Instant confirmation'
    };

    /* ── State ── */
    var state = { step: 1, service: null, doctor: null, date: null, time: null, calMonth: null, calYear: null, bookedSlots: {} };
    var now = new Date();
    state.calMonth = now.getMonth();
    state.calYear = now.getFullYear();

    // Generate random booked slots for realism
    function seedBookedSlots() {
        var d = new Date();
        for (var i = 0; i < 30; i++) {
            var day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
            if (day.getDay() === 5) continue;
            var key = day.toISOString().split('T')[0];
            var count = Math.floor(Math.random() * 4) + 1;
            state.bookedSlots[key] = [];
            for (var j = 0; j < count; j++) {
                var idx = Math.floor(Math.random() * TIMES.length);
                if (state.bookedSlots[key].indexOf(TIMES[idx]) === -1) state.bookedSlots[key].push(TIMES[idx]);
            }
        }
    }
    seedBookedSlots();

    /* ── Build HTML ── */
    function buildModal() {
        var overlay = document.createElement('div');
        overlay.id = 'bkOverlay';

        var modal = document.createElement('div');
        modal.className = 'bk-modal';

        // Header
        modal.innerHTML = '<div class="bk-header"><h2><i class="fa-solid fa-calendar-check" style="color:#D4AF37;margin-' + (isAR ? 'left' : 'right') + ':8px"></i>' + T.title + '</h2><button class="bk-close" id="bkClose"><i class="fa-solid fa-xmark"></i></button></div>';

        // Progress
        var prog = '<div class="bk-progress">';
        for (var i = 1; i <= 5; i++) {
            prog += '<div class="bk-step-dot" data-s="' + i + '">' + i + '</div>';
            if (i < 5) prog += '<div class="bk-step-line" data-sl="' + i + '"></div>';
        }
        prog += '</div>';
        modal.innerHTML += prog;

        // Body
        modal.innerHTML += '<div class="bk-body" id="bkBody"></div>';

        // Footer
        modal.innerHTML += '<div class="bk-footer" id="bkFooter"></div>';

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        return overlay;
    }

    var overlay = buildModal();
    var bodyEl = document.getElementById('bkBody');
    var footerEl = document.getElementById('bkFooter');

    /* ── Render Helpers ── */
    function svcName(s) { return isAR ? s.ar : s.en; }
    function docName(d) { return isAR ? d.ar : d.en; }
    function docSpec(d) { return isAR ? d.specAr : d.specEn; }

    function updateProgress() {
        for (var i = 1; i <= 5; i++) {
            var dot = overlay.querySelector('[data-s="' + i + '"]');
            dot.className = 'bk-step-dot' + (i < state.step ? ' done' : (i === state.step ? ' active' : ''));
            dot.innerHTML = i < state.step ? '<i class="fa-solid fa-check" style="font-size:12px"></i>' : i;
            if (i < 5) {
                var line = overlay.querySelector('[data-sl="' + i + '"]');
                line.className = 'bk-step-line' + (i < state.step ? ' done' : '');
            }
        }
    }

    function renderFooter() {
        var h = '';
        if (state.step > 1 && state.step <= 5) {
            h += '<button class="bk-btn bk-btn-back" id="bkBack"><i class="fa-solid fa-arrow-' + (isAR ? 'right' : 'left') + '"></i> ' + T.back + '</button>';
        } else {
            h += '<div></div>';
        }
        if (state.step < 5) {
            h += '<button class="bk-btn bk-btn-next" id="bkNext">' + T.next + ' <i class="fa-solid fa-arrow-' + (isAR ? 'left' : 'right') + '"></i></button>';
        } else if (state.step === 5) {
            h += '<button class="bk-btn bk-btn-next" id="bkConfirm"><i class="fa-solid fa-check"></i> ' + T.confirm + '</button>';
        }
        footerEl.innerHTML = h;

        var nextBtn = document.getElementById('bkNext');
        if (nextBtn) nextBtn.disabled = !canProceed();

        var backBtn = document.getElementById('bkBack');
        if (backBtn) backBtn.addEventListener('click', function () { state.step--; render(); });

        if (nextBtn) nextBtn.addEventListener('click', function () { state.step++; render(); });

        var confirmBtn = document.getElementById('bkConfirm');
        if (confirmBtn) confirmBtn.addEventListener('click', handleConfirm);
    }

    function canProceed() {
        if (state.step === 1) return !!state.service;
        if (state.step === 2) return !!state.doctor;
        if (state.step === 3) return !!(state.date && state.time);
        if (state.step === 4) return false; // handled by form validation
        return true;
    }

    /* ── Step Renderers ── */
    function renderStep1() {
        var h = '<div class="bk-panel active"><h3>' + T.step1 + '</h3><p class="bk-desc">' + T.step1d + '</p><div class="bk-svc-grid">';
        SERVICES.forEach(function (s) {
            h += '<div class="bk-svc-card' + (state.service === s.id ? ' selected' : '') + '" data-svc="' + s.id + '"><i class="' + s.icon + '"></i><span>' + svcName(s) + '</span></div>';
        });
        h += '</div></div>';
        bodyEl.innerHTML = h;

        bodyEl.querySelectorAll('.bk-svc-card').forEach(function (card) {
            card.addEventListener('click', function () {
                state.service = this.dataset.svc;
                state.doctor = null; // reset doctor when service changes
                render();
            });
        });
    }

    function renderStep2() {
        var relevant = DOCTORS.filter(function (d) { return d.services.indexOf(state.service) !== -1; });
        // If no specialist, show all
        if (relevant.length === 0) relevant = DOCTORS;

        var h = '<div class="bk-panel active"><h3>' + T.step2 + '</h3><p class="bk-desc">' + T.step2d + '</p><div class="bk-doc-grid">';
        relevant.forEach(function (d) {
            h += '<div class="bk-doc-card' + (state.doctor === d.id ? ' selected' : '') + '" data-doc="' + d.id + '">';
            h += '<div class="bk-doc-avatar"><i class="fa-solid fa-user-doctor"></i></div>';
            h += '<h4>' + docName(d) + '</h4>';
            h += '<p>' + docSpec(d) + '</p>';
            h += '<div class="bk-doc-rating"><i class="fa-solid fa-star"></i> ' + d.rating + '</div>';
            h += '</div>';
        });
        h += '</div></div>';
        bodyEl.innerHTML = h;

        bodyEl.querySelectorAll('.bk-doc-card').forEach(function (card) {
            card.addEventListener('click', function () {
                state.doctor = this.dataset.doc;
                render();
            });
        });
    }

    function renderStep3() {
        var h = '<div class="bk-panel active"><h3>' + T.step3 + '</h3><p class="bk-desc">' + T.step3d + '</p>';
        h += renderCalendar();
        if (state.date) h += renderTimeSlots();
        h += '</div>';
        bodyEl.innerHTML = h;

        // Calendar nav
        var prev = document.getElementById('bkCalPrev');
        var next = document.getElementById('bkCalNext');
        if (prev) prev.addEventListener('click', function () {
            state.calMonth--;
            if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
            renderStep3();
            renderFooter();
        });
        if (next) next.addEventListener('click', function () {
            state.calMonth++;
            if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
            renderStep3();
            renderFooter();
        });

        // Day clicks
        bodyEl.querySelectorAll('.bk-cal-day:not(.disabled)').forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.date = this.dataset.date;
                state.time = null;
                renderStep3();
                renderFooter();
            });
        });

        // Time clicks
        bodyEl.querySelectorAll('.bk-time-slot:not(.booked)').forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.time = this.dataset.time;
                renderStep3();
                renderFooter();
            });
        });
    }

    function renderCalendar() {
        var y = state.calYear, m = state.calMonth;
        var h = '<div class="bk-cal-header">';
        h += '<button class="bk-cal-nav" id="bkCalPrev"><i class="fa-solid fa-chevron-' + (isAR ? 'right' : 'left') + '"></i></button>';
        h += '<h4>' + MONTH_NAMES[m] + ' ' + y + '</h4>';
        h += '<button class="bk-cal-nav" id="bkCalNext"><i class="fa-solid fa-chevron-' + (isAR ? 'left' : 'right') + '"></i></button>';
        h += '</div><div class="bk-cal-grid">';

        DAY_NAMES.forEach(function (d) { h += '<div class="bk-cal-day-name">' + d + '</div>'; });

        var firstDay = new Date(y, m, 1).getDay();
        var daysInMonth = new Date(y, m + 1, 0).getDate();
        var today = new Date(); today.setHours(0, 0, 0, 0);

        for (var i = 0; i < firstDay; i++) h += '<div></div>';

        for (var d = 1; d <= daysInMonth; d++) {
            var dt = new Date(y, m, d);
            var key = dt.toISOString().split('T')[0];
            var isFri = dt.getDay() === 5;
            var isPast = dt < today;
            var isSelected = state.date === key;
            var isToday = dt.getTime() === today.getTime();
            var cls = 'bk-cal-day';
            if (isPast || isFri) cls += ' disabled';
            if (isSelected) cls += ' selected';
            if (isToday) cls += ' today';
            h += '<button class="' + cls + '" data-date="' + key + '"' + (isFri ? ' title="' + T.fri + '"' : '') + '>' + d + '</button>';
        }
        h += '</div>';
        return h;
    }

    function renderTimeSlots() {
        var booked = state.bookedSlots[state.date] || [];
        var h = '<h4 class="bk-time-label">' + T.selectTime + '</h4><div class="bk-time-grid">';
        TIMES.forEach(function (t) {
            var isBooked = booked.indexOf(t) !== -1;
            var isSel = state.time === t;
            var cls = 'bk-time-slot' + (isBooked ? ' booked' : '') + (isSel ? ' selected' : '');
            h += '<button class="' + cls + '" data-time="' + t + '">' + t + '</button>';
        });
        h += '</div>';
        return h;
    }

    function renderStep4() {
        var h = '<div class="bk-panel active"><h3>' + T.step4 + '</h3><p class="bk-desc">' + T.step4d + '</p>';
        h += '<div class="bk-form-group"><label>' + T.name + '</label><input type="text" id="bkName" autocomplete="name"><div class="bk-err">' + T.errName + '</div></div>';
        h += '<div class="bk-form-group"><label>' + T.phone + '</label><input type="tel" id="bkPhone" dir="ltr" autocomplete="tel"><div class="bk-err">' + T.errPhone + '</div></div>';
        h += '<div class="bk-form-group"><label>' + T.notes + '</label><textarea id="bkNotes" rows="2"></textarea></div>';
        h += '</div>';
        bodyEl.innerHTML = h;

        // Override next button for form validation
        setTimeout(function () {
            var nextBtn = document.getElementById('bkNext');
            if (nextBtn) {
                nextBtn.disabled = false;
                // Clone to remove old listeners
                var newBtn = nextBtn.cloneNode(true);
                nextBtn.parentNode.replaceChild(newBtn, nextBtn);
                newBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (validateStep4()) { state.step = 5; render(); }
                });
            }
        }, 50);
    }

    function validateStep4() {
        var nameEl = document.getElementById('bkName');
        var phoneEl = document.getElementById('bkPhone');
        var ok = true;
        nameEl.parentNode.classList.remove('has-error');
        phoneEl.parentNode.classList.remove('has-error');
        if (nameEl.value.trim().length < 2) { nameEl.parentNode.classList.add('has-error'); ok = false; }
        if (!/^[\d\+\-\s]{7,15}$/.test(phoneEl.value.trim())) { phoneEl.parentNode.classList.add('has-error'); ok = false; }
        return ok;
    }

    function renderStep5() {
        var svc = SERVICES.filter(function (s) { return s.id === state.service; })[0];
        var doc = DOCTORS.filter(function (d) { return d.id === state.doctor; })[0];
        var dateObj = new Date(state.date);
        var dateStr = dateObj.getDate() + ' ' + MONTH_NAMES[dateObj.getMonth()] + ' ' + dateObj.getFullYear();

        var h = '<div class="bk-panel active"><h3>' + T.step5 + '</h3><div class="bk-confirm-card">';
        h += '<div class="bk-confirm-row"><span class="bk-label">' + T.service + '</span><span class="bk-value">' + svcName(svc) + '</span></div>';
        h += '<div class="bk-confirm-row"><span class="bk-label">' + T.doctor + '</span><span class="bk-value">' + docName(doc) + '</span></div>';
        h += '<div class="bk-confirm-row"><span class="bk-label">' + T.date + '</span><span class="bk-value">' + dateStr + '</span></div>';
        h += '<div class="bk-confirm-row"><span class="bk-label">' + T.time + '</span><span class="bk-value">' + state.time + '</span></div>';
        h += '</div>';
        h += '<div class="bk-trust"><span><i class="fa-solid fa-check-circle"></i> ' + T.trust1 + '</span><span><i class="fa-solid fa-check-circle"></i> ' + T.trust2 + '</span><span><i class="fa-solid fa-check-circle"></i> ' + T.trust3 + '</span></div>';
        h += '</div>';

        // Success (hidden)
        h += '<div class="bk-success" id="bkSuccess"><div class="bk-success-icon"><i class="fa-solid fa-check"></i></div><h3>' + T.successTitle + '</h3><p>' + T.successMsg + '</p></div>';

        bodyEl.innerHTML = h;
    }

    function handleConfirm() {
        var confirmBtn = document.getElementById('bkConfirm');
        if (confirmBtn) { confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; confirmBtn.disabled = true; }
        setTimeout(function () {
            bodyEl.querySelector('.bk-panel').style.display = 'none';
            document.getElementById('bkSuccess').classList.add('show');
            footerEl.style.display = 'none';
            overlay.querySelector('.bk-progress').style.display = 'none';
            // Mark slot as booked
            if (!state.bookedSlots[state.date]) state.bookedSlots[state.date] = [];
            state.bookedSlots[state.date].push(state.time);
            setTimeout(closeModal, 5000);
        }, 1500);
    }

    /* ── Main Render ── */
    function render() {
        updateProgress();
        if (state.step === 1) renderStep1();
        else if (state.step === 2) renderStep2();
        else if (state.step === 3) renderStep3();
        else if (state.step === 4) renderStep4();
        else if (state.step === 5) renderStep5();
        renderFooter();
    }

    /* ── Open / Close ── */
    function openModal() {
        state = { step: 1, service: null, doctor: null, date: null, time: null, calMonth: now.getMonth(), calYear: now.getFullYear(), bookedSlots: state.bookedSlots };
        overlay.classList.add('bk-open');
        document.body.style.overflow = 'hidden';
        footerEl.style.display = '';
        overlay.querySelector('.bk-progress').style.display = '';
        render();
    }

    function closeModal() {
        overlay.classList.remove('bk-open');
        document.body.style.overflow = '';
    }

    // Close handlers
    document.getElementById('bkClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('bk-open')) closeModal(); });

    /* ── Hook into Booking Buttons ── */
    function hookButtons() {
        var selector = [
            'a[href*="#booking"]',
            'a[href*="booking"]',
            '.btn-book-header',
            '.pdc-cta-btn',
            '.dtp-btn',
            '.doc-book-btn',
            '.cta-v2-primary',
            'a.btn-primary[href*="contact"]',
            'a.btn-outline[href*="contact"]'
        ].join(', ');

        document.querySelectorAll(selector).forEach(function (el) {
            // Skip WhatsApp and popup elements
            if (el.classList.contains('floating-wa') || el.classList.contains('btn-whatsapp')) return;
            if (el.closest && el.closest('.floating-wa')) return;
            if (el.closest && (el.closest('.ps-popup-form') || el.closest('#psPopupOverlay') || el.closest('#bkOverlay'))) return;
            if (el.classList.contains('lang-switch')) return;
            // Skip navigation links (the "Contact Us" nav item should go to contact.html)
            if (el.classList.contains('nav-link')) return;
            // Skip links inside nav menus, footer, dropdown menus
            if (el.closest && (el.closest('.nav-list') || el.closest('.nav-menu') || el.closest('.dropdown-menu'))) return;
            // Skip footer links
            if (el.closest && el.closest('.footer')) return;
            // Skip links that go to other pages without booking intent
            var href = (el.getAttribute('href') || '').toLowerCase();
            if (href.indexOf('services.html') === 0 || href.indexOf('about.html') === 0 || href.indexOf('doctors.html') === 0 || href.indexOf('blog') === 0 || href.indexOf('index') === 0) return;
            if (el.dataset.bkHooked) return;
            el.dataset.bkHooked = '1';
            el.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openModal();
                return false;
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hookButtons);
    } else {
        hookButtons();
    }
    // Also hook after a delay for dynamically loaded content
    setTimeout(hookButtons, 1000);
    setTimeout(hookButtons, 3000);

})();
