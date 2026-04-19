/**
 * Pearl Smile — Dental Bot Chatbot Widget
 * 
 * Pure CSS/SVG 3D dental mascot — zero external dependencies
 * Guaranteed transparent background, works on any page.
 *
 * This script:
 *  1. Loads Botpress in hidden-widget mode
 *  2. Builds a cute CSS tooth mascot with golden crown, blinking eyes, sparkles
 *  3. Shows a Glassmorphism welcome tooltip
 *  4. On click: opens Botpress chat, hides mascot
 *  5. When chat closes: restores mascot
 */
(function () {
    'use strict';

    /* ── Helpers ── */
    function isArabic() {
        return document.documentElement.lang === 'ar' ||
               document.documentElement.dir === 'rtl';
    }

    /* ══════════════════════════════════════════
       1. LOAD & INIT BOTPRESS (hidden widget)
       ══════════════════════════════════════════ */
    function loadBotpress() {
        var script = document.createElement('script');
        script.src = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
        script.async = true;
        script.onload = function () {
            if (window.botpress && window.botpress.init) {
                window.botpress.init({
                    botId: 'f3303645-fddc-459e-ae3d-a4fec0dc2cc6',
                    clientId: '0a4c9471-14ed-4b48-847f-1781f7946b78',
                    hideWidget: true,
                    configuration: {
                        color: '#D4AF37',
                        variant: 'solid',
                        themeMode: 'light',
                        fontFamily: 'inter',
                        radius: 4,
                        composerPlaceholder: isArabic()
                            ? 'اكتب رسالتك هنا...'
                            : 'Type your message here...'
                    }
                });
                watchBotpressState();
                forceBotpressLauncherHidden();
            }
        };
        document.body.appendChild(script);
    }

    /* Hide default Botpress launcher button via JS */
    function forceBotpressLauncherHidden() {
        function hideElements() {
            var container = document.getElementById('bp-web-widget-container');
            if (!container) return;
            // Find all direct child divs that are NOT containing an iframe
            var children = container.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (!child.querySelector('iframe')) {
                    child.style.display = 'none';
                    child.style.width = '0';
                    child.style.height = '0';
                    child.style.overflow = 'hidden';
                    child.style.position = 'absolute';
                }
            }
        }

        // Run immediately
        hideElements();

        // Watch for dynamic changes
        var observer = new MutationObserver(function () {
            hideElements();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Periodic fallback
        setInterval(hideElements, 1000);
    }

    /* ══════════════════════════════════════════
       2. BUILD THE TOOTH MASCOT (Pure CSS + inline SVG)
       ══════════════════════════════════════════ */
    function buildBotWidget() {
        // ── Main Container ──
        var container = document.createElement('div');
        container.id = 'custom-3d-bot';
        container.setAttribute('role', 'button');
        container.setAttribute('aria-label', isArabic() ? 'افتح المحادثة' : 'Open chat');
        container.setAttribute('tabindex', '0');

        // ── Tooth Mascot ──
        var mascot = document.createElement('div');
        mascot.className = 'tooth-mascot';

        // Crown SVG
        var crown = document.createElement('div');
        crown.className = 'tooth-crown';
        crown.innerHTML = '<svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M4 22L8 6L14 16L20 4L26 16L32 6L36 22H4Z" fill="url(#crownGrad)" stroke="#B8960C" stroke-width="1"/>' +
            '<circle cx="8" cy="8" r="2" fill="#FFF5CC"/>' +
            '<circle cx="20" cy="5" r="2.5" fill="#FFF5CC"/>' +
            '<circle cx="32" cy="8" r="2" fill="#FFF5CC"/>' +
            '<defs><linearGradient id="crownGrad" x1="20" y1="4" x2="20" y2="22">' +
            '<stop offset="0%" stop-color="#F5D060"/>' +
            '<stop offset="50%" stop-color="#D4AF37"/>' +
            '<stop offset="100%" stop-color="#B8960C"/>' +
            '</linearGradient></defs></svg>';
        mascot.appendChild(crown);

        // Tooth body
        var body = document.createElement('div');
        body.className = 'tooth-body';
        mascot.appendChild(body);

        // Roots
        var rootL = document.createElement('div');
        rootL.className = 'tooth-root-left';
        body.appendChild(rootL);

        var rootR = document.createElement('div');
        rootR.className = 'tooth-root-right';
        body.appendChild(rootR);

        // Face container
        var face = document.createElement('div');
        face.className = 'tooth-face';

        // Eyes
        var eyeL = document.createElement('div');
        eyeL.className = 'eye eye-left';
        face.appendChild(eyeL);

        var eyeR = document.createElement('div');
        eyeR.className = 'eye eye-right';
        face.appendChild(eyeR);

        // Blush
        var blushL = document.createElement('div');
        blushL.className = 'blush blush-left';
        face.appendChild(blushL);

        var blushR = document.createElement('div');
        blushR.className = 'blush blush-right';
        face.appendChild(blushR);

        // Smile
        var smile = document.createElement('div');
        smile.className = 'smile';
        face.appendChild(smile);

        body.appendChild(face);

        // Sparkles
        for (var i = 1; i <= 3; i++) {
            var sparkle = document.createElement('div');
            sparkle.className = 'sparkle sparkle-' + i;
            mascot.appendChild(sparkle);
        }

        container.appendChild(mascot);

        // ── Notification Dot ──
        var dot = document.createElement('div');
        dot.className = 'bot-notification-dot';
        container.appendChild(dot);

        // ── Welcome Tooltip ──
        var tooltip = document.createElement('div');
        tooltip.className = 'bot-tooltip';
        tooltip.id = 'bot-tooltip';

        var emoji = document.createElement('span');
        emoji.className = 'tooltip-emoji';
        emoji.textContent = '🦷';

        var text = document.createTextNode(
            isArabic()
                ? ' كيف يمكنني مساعدتك اليوم؟'
                : ' How can I help you today?'
        );

        if (isArabic()) {
            tooltip.appendChild(text);
            tooltip.appendChild(emoji);
        } else {
            tooltip.appendChild(emoji);
            tooltip.appendChild(text);
        }

        container.appendChild(tooltip);

        // ── Inject ──
        document.body.appendChild(container);

        // ── Events ──
        container.addEventListener('click', handleBotClick);
        container.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBotClick();
            }
        });

        // Auto-hide tooltip
        setTimeout(function () {
            var tip = document.getElementById('bot-tooltip');
            if (tip && !tip.classList.contains('tooltip-hide')) {
                tip.classList.add('tooltip-hide');
            }
        }, 10000);
    }

    /* ══════════════════════════════════════════
       3. CLICK HANDLER
       ══════════════════════════════════════════ */
    function handleBotClick() {
        var container = document.getElementById('custom-3d-bot');
        var tooltip = document.getElementById('bot-tooltip');

        if (tooltip) tooltip.classList.add('tooltip-hide');
        if (container) container.classList.add('bot-hidden');

        openBotpress();
    }

    function openBotpress() {
        if (window.botpress) {
            try { window.botpress.open(); return; } catch (e) {}
        }
        if (window.botpressWebChat) {
            try { window.botpressWebChat.sendEvent({ type: 'show' }); return; } catch (e) {}
        }
        var btn = document.querySelector('.bpw-widget-btn, .bpw-floating-button, [id^="bp-widget"] button');
        if (btn) btn.click();
    }

    /* ══════════════════════════════════════════
       4. WATCH BOTPRESS STATE
       ══════════════════════════════════════════ */
    function watchBotpressState() {
        if (window.botpress && window.botpress.on) {
            window.botpress.on('webchat:closed', restoreBot);
            window.botpress.on('webchat:hidden', restoreBot);
        }

        var observer = new MutationObserver(function () {
            var bot = document.getElementById('custom-3d-bot');
            if (!bot || !bot.classList.contains('bot-hidden')) return;
            if (!isChatOpen()) restoreBot();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        setInterval(function () {
            var bot = document.getElementById('custom-3d-bot');
            if (!bot || !bot.classList.contains('bot-hidden')) return;
            if (!isChatOpen()) restoreBot();
        }, 2000);
    }

    function isChatOpen() {
        var c = document.getElementById('bp-web-widget-container');
        if (!c) return false;
        var f = c.querySelector('iframe');
        return f && f.offsetHeight > 100 &&
               window.getComputedStyle(c).display !== 'none';
    }

    function restoreBot() {
        var c = document.getElementById('custom-3d-bot');
        if (c) c.classList.remove('bot-hidden');
    }

    /* ══════════════════════════════════════════
       5. BOOTSTRAP
       ══════════════════════════════════════════ */
    function init() {
        loadBotpress();
        buildBotWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
