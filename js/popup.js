/**
 * Demo Dental — Lead Capture Popup
 * Self-contained: injects its own CSS + HTML
 * Triggers: Exit-intent (desktop), Timer (10s), Scroll 50% (mobile)
 */
(function () {
    'use strict';

    /* ── Config ─────────────────────────────────────────── */
    var CFG = {
        timerMs: 10000,
        scrollPct: 50,
        cooldownDays: 3,
        autoCloseMs: 4000,
        keyShown: 'ps_popup_ts',
        keySubmitted: 'ps_popup_done'
    };

    /* ── Guard: should we show? ─────────────────────────── */
    function shouldShow() {
        try {
            if (localStorage.getItem(CFG.keySubmitted)) return false;
            var ts = localStorage.getItem(CFG.keyShown);
            if (ts) {
                var diff = (Date.now() - parseInt(ts, 10)) / 864e5;
                if (diff < CFG.cooldownDays) return false;
            }
        } catch (e) { /* private browsing */ }
        return true;
    }
    if (!shouldShow()) return;

    /* ── Language ────────────────────────────────────────── */
    var lang = (document.documentElement.lang || 'ar').substring(0, 2);
    var isAR = lang === 'ar';

    var T = isAR ? {
        badge: 'عرض حصري',
        discountNum: '20%',
        discountWord: 'خصم',
        discountSub: 'على أول زيارة لك',
        title: 'عرض خاص لزوّارنا الجدد!',
        subtitle: 'سجّل الآن واحصل على كود خصم 20% على أول زيارة — يصلك فوراً على بريدك الإلكتروني.',
        phName: 'الاسم الكامل',
        phEmail: 'البريد الإلكتروني',
        cta: 'احصل على العرض',
        privacy: 'بياناتك آمنة ومحمية تماماً',
        errName: 'الرجاء إدخال اسمك',
        errEmail: 'الرجاء إدخال بريد إلكتروني صحيح',
        successTitle: 'تم التسجيل بنجاح!',
        successMsg: 'تحقق من بريدك الإلكتروني للحصول على كود الخصم الخاص بك.',
        noThanks: 'لا، شكراً'
    } : {
        badge: 'Exclusive Offer',
        discountNum: '20%',
        discountWord: 'OFF',
        discountSub: 'on your first visit',
        title: 'Special Offer for New Visitors!',
        subtitle: 'Register now and get a 20% discount code on your first visit — delivered instantly to your email.',
        phName: 'Full Name',
        phEmail: 'Email Address',
        cta: 'Get the Offer',
        privacy: 'Your data is safe and fully protected',
        errName: 'Please enter your name',
        errEmail: 'Please enter a valid email',
        successTitle: 'Successfully Registered!',
        successMsg: 'Check your email for your exclusive discount code.',
        noThanks: 'No, thanks'
    };

    /* ── Inject CSS ─────────────────────────────────────── */
    var css = [
        '/* ===== Lead Capture Popup ===== */',

        /* Overlay */
        '#psPopupOverlay{position:fixed;inset:0;z-index:99999;background:rgba(10,17,40,.75);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .4s ease,visibility .4s ease;padding:20px}',
        '#psPopupOverlay.ps-visible{opacity:1;visibility:visible}',

        /* Modal */
        '.ps-modal{background:#fff;border-radius:24px;overflow:hidden;max-width:780px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.35);display:grid;grid-template-columns:260px 1fr;transform:translateY(30px) scale(.95);transition:transform .45s cubic-bezier(.22,1,.36,1);position:relative}',
        '#psPopupOverlay.ps-visible .ps-modal{transform:translateY(0) scale(1)}',

        /* Close */
        '.ps-close{position:absolute;top:16px;z-index:2;width:34px;height:34px;border-radius:50%;border:2px solid #e8ecef;background:#fff;color:#6C7A89;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;line-height:1;padding:0;box-shadow:0 2px 8px rgba(0,0,0,.06)}',
        '[dir="rtl"] .ps-close,.ps-close.ps-close-rtl{left:16px;right:auto}',
        '[dir="ltr"] .ps-close,.ps-close.ps-close-ltr{right:16px;left:auto}',
        '.ps-close:hover{background:#f8f9fa;color:#0A1128;border-color:#D4AF37;transform:rotate(90deg);box-shadow:0 2px 12px rgba(212,175,55,.2)}',

        /* Visual panel */
        '.ps-visual{background:linear-gradient(135deg,#0A1128 0%,#16203A 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;position:relative;overflow:hidden}',
        '.ps-visual::before{content:"";position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;background:rgba(212,175,55,.1);pointer-events:none}',
        '.ps-visual::after{content:"";position:absolute;bottom:-30px;left:-30px;width:100px;height:100px;border-radius:50%;background:rgba(212,175,55,.08);pointer-events:none}',
        '.ps-vis-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(212,175,55,.15);color:#D4AF37;font-size:13px;font-weight:700;padding:6px 16px;border-radius:30px;margin-bottom:24px}',
        '.ps-vis-badge i{font-size:12px}',
        '.ps-vis-discount{text-align:center;margin-bottom:12px}',
        '.ps-vis-num{display:block;font-size:72px;font-weight:700;color:#D4AF37;line-height:1;letter-spacing:-2px}',
        '.ps-vis-word{display:block;font-size:22px;font-weight:700;color:rgba(255,255,255,.85);margin-top:4px}',
        '.ps-vis-sub{color:rgba(255,255,255,.55);font-size:14px;text-align:center}',
        '.ps-vis-tooth{margin-top:28px;font-size:36px;color:rgba(212,175,55,.25)}',

        /* Form panel */
        '.ps-form-area{padding:40px 36px;display:flex;flex-direction:column;justify-content:center}',
        '.ps-title{font-size:22px;font-weight:700;color:#0A1128;margin:0 0 10px;line-height:1.4}',
        '.ps-subtitle{font-size:14px;color:#6C7A89;line-height:1.7;margin:0 0 24px}',

        /* Inputs */
        '.ps-field{position:relative;margin-bottom:14px}',
        '.ps-field i.ps-ico{position:absolute;top:50%;transform:translateY(-50%);color:#BDC3C7;font-size:15px;pointer-events:none;transition:color .3s;z-index:1}',
        '[dir="rtl"] .ps-field i.ps-ico{right:16px;left:auto}',
        '[dir="ltr"] .ps-field i.ps-ico{left:16px;right:auto}',
        '.ps-field input{width:100%;height:50px;border:2px solid #e8ecef;border-radius:12px;font-size:15px;font-family:"Cairo",sans-serif;color:#2C3E50;background:#f9fafb;outline:none;transition:all .3s ease;box-sizing:border-box}',
        '[dir="rtl"] .ps-field input{padding:0 44px 0 16px;text-align:right}',
        '[dir="ltr"] .ps-field input{padding:0 16px 0 44px;text-align:left}',
        '.ps-field input::placeholder{color:#BDC3C7}',
        '.ps-field input:focus{border-color:#D4AF37;background:#fff;box-shadow:0 0 0 4px rgba(212,175,55,.1)}',
        '.ps-field input:focus ~ i.ps-ico{color:#D4AF37}',
        /* error state */
        '.ps-field.ps-err input{border-color:#e74c3c;background:#fff5f5}',
        '.ps-field .ps-err-msg{display:none;font-size:12px;color:#e74c3c;margin-top:4px;padding:0 4px}',
        '.ps-field.ps-err .ps-err-msg{display:block}',

        /* Submit */
        '.ps-submit{width:100%;height:50px;border:none;border-radius:12px;background:linear-gradient(135deg,#D4AF37,#b5952f);color:#fff;font-size:16px;font-weight:700;font-family:"Cairo",sans-serif;cursor:pointer;transition:all .3s ease;margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px}',
        '.ps-submit:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(212,175,55,.35)}',
        '.ps-submit:active{transform:translateY(0)}',
        '.ps-submit.ps-loading{pointer-events:none;opacity:.8}',

        /* Privacy + No thanks */
        '.ps-privacy{display:flex;align-items:center;gap:6px;font-size:12px;color:#BDC3C7;margin-top:14px;justify-content:center}',
        '.ps-privacy i{color:#D4AF37;font-size:13px}',
        '.ps-no-thanks{background:none;border:none;color:#BDC3C7;font-size:13px;cursor:pointer;margin-top:8px;font-family:"Cairo",sans-serif;transition:color .2s;align-self:center}',
        '.ps-no-thanks:hover{color:#6C7A89}',

        /* Success */
        '.ps-success{display:none;flex-direction:column;align-items:center;justify-content:center;padding:50px 36px;text-align:center}',
        '.ps-success.ps-show{display:flex}',
        '.ps-success-icon{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#2ecc71,#27ae60);display:flex;align-items:center;justify-content:center;margin-bottom:20px;animation:psPopIn .5s cubic-bezier(.22,1,.36,1)}',
        '.ps-success-icon i{font-size:36px;color:#fff}',
        '.ps-success h3{font-size:24px;color:#0A1128;margin:0 0 10px;font-weight:700}',
        '.ps-success p{font-size:15px;color:#6C7A89;margin:0;max-width:320px;line-height:1.7}',

        /* Shake animation */
        '@keyframes psShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}',
        '.ps-shake{animation:psShake .4s ease}',

        /* Pop in */
        '@keyframes psPopIn{0%{transform:scale(0)}60%{transform:scale(1.15)}100%{transform:scale(1)}}',

        /* ── Mobile ───────────────────────── */
        '@media(max-width:700px){',
        '  .ps-modal{grid-template-columns:1fr;max-width:400px}',
        '  .ps-visual{display:none}',
        '  .ps-form-area{padding:32px 24px 24px}',
        '  .ps-mob-header{display:flex;align-items:center;gap:10px;margin-bottom:16px}',
        '  .ps-mob-discount{background:linear-gradient(135deg,#0A1128,#16203A);color:#D4AF37;font-size:15px;font-weight:700;padding:8px 16px;border-radius:10px;white-space:nowrap}',
        '  .ps-title{font-size:19px;margin-bottom:6px}',
        '  .ps-subtitle{font-size:13px;margin-bottom:18px}',
        '}',
        '@media(min-width:701px){.ps-mob-header{display:none}}'
    ].join('\n');

    var styleEl = document.createElement('style');
    styleEl.id = 'psPopupStyles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── Build HTML ──────────────────────────────────────── */
    var dirClass = isAR ? 'ps-close-rtl' : 'ps-close-ltr';

    var html = [
        '<div class="ps-modal">',
        '  <button class="ps-close ' + dirClass + '" id="psClose" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>',

        /* Visual panel */
        '  <div class="ps-visual">',
        '    <div class="ps-vis-badge"><i class="fa-solid fa-gift"></i> ' + T.badge + '</div>',
        '    <div class="ps-vis-discount">',
        '      <span class="ps-vis-num">' + T.discountNum + '</span>',
        '      <span class="ps-vis-word">' + T.discountWord + '</span>',
        '    </div>',
        '    <p class="ps-vis-sub">' + T.discountSub + '</p>',
        '    <div class="ps-vis-tooth"><i class="fa-solid fa-tooth"></i></div>',
        '  </div>',

        /* Form panel */
        '  <div class="ps-form-area" id="psFormArea">',

        /* Mobile-only header */
        '    <div class="ps-mob-header">',
        '      <span class="ps-mob-discount">' + T.discountWord + ' ' + T.discountNum + '</span>',
        '    </div>',

        '    <h3 class="ps-title">' + T.title + '</h3>',
        '    <p class="ps-subtitle">' + T.subtitle + '</p>',

        '    <form id="psPopupForm" novalidate>',
        '      <div class="ps-field" id="psNameField">',
        '        <i class="fa-regular fa-user ps-ico"></i>',
        '        <input type="text" id="psName" placeholder="' + T.phName + '" autocomplete="name">',
        '        <div class="ps-err-msg">' + T.errName + '</div>',
        '      </div>',
        '      <div class="ps-field" id="psEmailField">',
        '        <i class="fa-regular fa-envelope ps-ico"></i>',
        '        <input type="email" id="psEmail" placeholder="' + T.phEmail + '" autocomplete="email">',
        '        <div class="ps-err-msg">' + T.errEmail + '</div>',
        '      </div>',
        '      <button type="submit" class="ps-submit" id="psSubmit">',
        '        <i class="fa-solid fa-arrow-right-to-bracket"></i> ' + T.cta,
        '      </button>',
        '    </form>',

        '    <div class="ps-privacy"><i class="fa-solid fa-shield-halved"></i> ' + T.privacy + '</div>',
        '    <button class="ps-no-thanks" id="psNoThanks">' + T.noThanks + '</button>',
        '  </div>',

        /* Success */
        '  <div class="ps-success" id="psSuccess">',
        '    <div class="ps-success-icon"><i class="fa-solid fa-check"></i></div>',
        '    <h3>' + T.successTitle + '</h3>',
        '    <p>' + T.successMsg + '</p>',
        '  </div>',

        '</div>'
    ].join('\n');

    var overlay = document.createElement('div');
    overlay.id = 'psPopupOverlay';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    /* ── References ──────────────────────────────────────── */
    var closeBtn = document.getElementById('psClose');
    var form = document.getElementById('psPopupForm');
    var nameField = document.getElementById('psNameField');
    var emailField = document.getElementById('psEmailField');
    var nameInput = document.getElementById('psName');
    var emailInput = document.getElementById('psEmail');
    var submitBtn = document.getElementById('psSubmit');
    var formArea = document.getElementById('psFormArea');
    var success = document.getElementById('psSuccess');
    var noThanks = document.getElementById('psNoThanks');

    var isOpen = false;
    var triggered = false;

    /* ── Show / Hide ─────────────────────────────────────── */
    function show() {
        if (isOpen || triggered) return;
        triggered = true;
        isOpen = true;
        overlay.classList.add('ps-visible');
        document.body.style.overflow = 'hidden';
        try { localStorage.setItem(CFG.keyShown, String(Date.now())); } catch (e) {}
    }

    function hide() {
        if (!isOpen) return;
        isOpen = false;
        overlay.classList.remove('ps-visible');
        document.body.style.overflow = '';
    }

    /* ── Close handlers ──────────────────────────────────── */
    closeBtn.addEventListener('click', hide);
    noThanks.addEventListener('click', hide);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) hide();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) hide();
    });

    /* ── Validation ──────────────────────────────────────── */
    function clearErr(field) { field.classList.remove('ps-err', 'ps-shake'); }

    nameInput.addEventListener('input', function () { clearErr(nameField); });
    emailInput.addEventListener('input', function () { clearErr(emailField); });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        var nameVal = nameInput.value.trim();
        var emailVal = emailInput.value.trim();

        clearErr(nameField);
        clearErr(emailField);

        if (nameVal.length < 2) {
            nameField.classList.add('ps-err', 'ps-shake');
            valid = false;
        }

        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailVal)) {
            emailField.classList.add('ps-err', 'ps-shake');
            valid = false;
        }

        if (!valid) return;

        /* Simulate submit */
        submitBtn.classList.add('ps-loading');
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(function () {
            formArea.style.display = 'none';
            closeBtn.style.display = 'none';
            success.classList.add('ps-show');
            try { localStorage.setItem(CFG.keySubmitted, '1'); } catch (e) {}

            setTimeout(hide, CFG.autoCloseMs);
        }, 1200);
    });

    /* ── Triggers ────────────────────────────────────────── */
    var timerID = null;

    /* 1. Timer — 10 seconds */
    timerID = setTimeout(show, CFG.timerMs);

    /* 2. Exit-intent (desktop only) */
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mouseout', function handler(e) {
            if (e.clientY <= 0 && !isOpen) {
                show();
                document.removeEventListener('mouseout', handler);
            }
        });
    }

    /* 3. Scroll threshold (mobile fallback) */
    var scrollFired = false;
    window.addEventListener('scroll', function () {
        if (scrollFired || isOpen) return;
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        if (docH <= 0) return;
        var pct = (window.scrollY / docH) * 100;
        if (pct >= CFG.scrollPct) {
            scrollFired = true;
            show();
        }
    }, { passive: true });

})();
