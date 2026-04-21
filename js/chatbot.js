/**
 * Pearl Smile — Dental Bot Chatbot Widget
 * 
 * NUCLEAR APPROACH: Instead of guessing Botpress CSS selectors,
 * we use a MutationObserver to detect ANY element Botpress injects
 * into the DOM and forcibly hide it. We only reveal the Botpress
 * chat panel when the user clicks our custom tooth mascot.
 *
 * This script:
 *  1. Loads Botpress script
 *  2. Immediately hides EVERYTHING Botpress creates (via MutationObserver)
 *  3. Builds a cute CSS tooth mascot
 *  4. On click: reveals Botpress chat, hides mascot
 *  5. When chat closes: hides Botpress again, restores mascot
 */
(function () {
    'use strict';

    // ── Known IDs of elements WE created (whitelist) ──
    var OUR_ELEMENTS = ['custom-3d-bot', 'bot-tooltip'];

    // ── Track all Botpress-injected elements so we can hide/show them ──
    var botpressElements = [];
    var chatIsOpen = false;
    var observer = null;

    /* ── Helpers ── */
    function isArabic() {
        return document.documentElement.lang === 'ar' ||
               document.documentElement.dir === 'rtl';
    }

    /**
     * Check if a DOM node was injected by Botpress (not by us).
     * Botpress injects: <div> elements directly into <body> that contain
     * iframes, shadow roots, or fixed-position styling.
     * We whitelist our own elements and known page elements.
     */
    function isBotpressElement(node) {
        if (node.nodeType !== 1) return false; // Not an element
        if (!node.parentElement || node.parentElement !== document.body) return false; // Not direct child of body
        
        // Skip our own elements
        if (OUR_ELEMENTS.indexOf(node.id) !== -1) return false;
        
        // Skip script/style/link/meta tags
        var tag = node.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'link' || 
            tag === 'meta' || tag === 'noscript') return false;
        
        // Skip elements that existed before Botpress loaded
        if (node.hasAttribute('data-pre-bp')) return false;
        
        // Check for Botpress signatures
        var id = (node.id || '').toLowerCase();
        if (id.indexOf('bp-') === 0 || id.indexOf('botpress') !== -1 || id.indexOf('bp_') === 0) return true;
        
        // Check classes
        var cls = (node.className || '').toString().toLowerCase();
        if (cls.indexOf('bp-') !== -1 || cls.indexOf('botpress') !== -1 || cls.indexOf('bpw-') !== -1) return true;
        
        // Check for shadow root (Botpress v3 uses web components)
        if (node.shadowRoot) return true;
        
        // Check for fixed-position divs that appeared after our script ran
        // and aren't part of the original page
        if (tag === 'div' && !node.id && !node.className) {
            var style = window.getComputedStyle(node);
            if (style.position === 'fixed') return true;
        }
        
        return false;
    }

    /**
     * FORCIBLY hide a Botpress element using every technique available.
     */
    function crushElement(el) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('width', '0', 'important');
        el.style.setProperty('height', '0', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('top', '-9999px', 'important');
        el.style.setProperty('left', '-9999px', 'important');
        el.style.setProperty('z-index', '-99999', 'important');
        
        // If it has a shadow root, inject CSS into the shadow root too
        if (el.shadowRoot) {
            try {
                var shadowStyle = document.createElement('style');
                shadowStyle.textContent = '* { display: none !important; visibility: hidden !important; }';
                el.shadowRoot.appendChild(shadowStyle);
                // Mark it so we can remove it later
                shadowStyle.setAttribute('data-pearl-hide', 'true');
            } catch (e) {}
        }
    }

    /**
     * REVEAL a Botpress element (undo crushElement).
     */
    function revealElement(el) {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
        el.style.removeProperty('opacity');
        el.style.removeProperty('width');
        el.style.removeProperty('height');
        el.style.removeProperty('overflow');
        el.style.removeProperty('pointer-events');
        el.style.removeProperty('position');
        el.style.removeProperty('top');
        el.style.removeProperty('left');
        el.style.removeProperty('z-index');
        
        // Remove shadow root hiding CSS
        if (el.shadowRoot) {
            try {
                var hideStyles = el.shadowRoot.querySelectorAll('[data-pearl-hide]');
                for (var i = 0; i < hideStyles.length; i++) {
                    hideStyles[i].remove();
                }
            } catch (e) {}
        }
    }

    /**
     * Scan all direct children of <body> for Botpress elements
     * and register + hide them.
     */
    function scanAndHide() {
        var children = document.body.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (isBotpressElement(child) && botpressElements.indexOf(child) === -1) {
                botpressElements.push(child);
                if (!chatIsOpen) {
                    crushElement(child);
                }
            }
        }
    }

    /**
     * Start a MutationObserver that watches <body> for new children
     * and immediately hides any Botpress elements.
     */
    function startNuclearObserver() {
        // Mark all existing body children as "pre-Botpress" so we skip them
        var existing = document.body.children;
        for (var i = 0; i < existing.length; i++) {
            existing[i].setAttribute('data-pre-bp', 'true');
        }

        observer = new MutationObserver(function (mutations) {
            for (var m = 0; m < mutations.length; m++) {
                var added = mutations[m].addedNodes;
                for (var n = 0; n < added.length; n++) {
                    var node = added[n];
                    if (node.nodeType === 1 && node.parentElement === document.body) {
                        // Don't mark our own elements
                        if (OUR_ELEMENTS.indexOf(node.id) !== -1) continue;
                        
                        // Give Botpress a tiny moment to set up its attributes
                        (function(el) {
                            setTimeout(function() {
                                if (isBotpressElement(el) && botpressElements.indexOf(el) === -1) {
                                    botpressElements.push(el);
                                    if (!chatIsOpen) {
                                        crushElement(el);
                                    }
                                }
                            }, 50);
                        })(node);
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true });

        // Also do periodic scans as a safety net (every 500ms for 30 seconds)
        var scanCount = 0;
        var scanInterval = setInterval(function () {
            scanAndHide();
            scanCount++;
            if (scanCount > 60) clearInterval(scanInterval);
        }, 500);
    }

    /* ══════════════════════════════════════════
       1. LOAD & INIT BOTPRESS
       ══════════════════════════════════════════ */
    function loadBotpress() {
        // Start watching BEFORE loading the script
        startNuclearObserver();

        var script = document.createElement('script');
        script.src = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
        script.async = true;
        script.onload = function () {
            if (window.botpress && window.botpress.init) {
                window.botpress.init({
                    botId: 'f3303645-fddc-459e-ae3d-a4fec0dc2cc6',
                    clientId: '0a4c9471-14ed-4b48-847f-1781f7946b78',
                    hideWidget: true,
                    selector: '#custom-3d-bot',
                    configuration: {
                        color: '#D4AF37',
                        variant: 'solid',
                        themeMode: 'light',
                        fontFamily: 'inter',
                        radius: 4,
                        composerPlaceholder: isArabic()
                            ? 'اكتب رسالتك هنا...'
                            : 'Type your message here...',
                        additionalStylesheet: '.bpFab, .bpFabIcon, .bpFab__container, .bp-fab-container, .fab-button, [class*="fab"], [class*="Fab"], [class*="launcher"], [class*="Launcher"], .bpWidget__fab, .bp-widget-widget, .bpw-floating-button, .bpw-widget-btn { display: none !important; visibility: hidden !important; opacity: 0 !important; width: 0 !important; height: 0 !important; pointer-events: none !important; position: fixed !important; top: -9999px !important; left: -9999px !important; }'
                    }
                });
                watchBotpressState();

                // Extra scan after init
                setTimeout(scanAndHide, 500);
                setTimeout(scanAndHide, 1500);
                setTimeout(scanAndHide, 3000);
            }
        };
        document.body.appendChild(script);
    }

    /* ══════════════════════════════════════════
       2. BUILD THE TOOTH MASCOT
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
       3. CLICK HANDLER — Open Chat
       ══════════════════════════════════════════ */
    function handleBotClick() {
        var container = document.getElementById('custom-3d-bot');
        var tooltip = document.getElementById('bot-tooltip');

        if (tooltip) tooltip.classList.add('tooltip-hide');
        if (container) container.classList.add('bot-hidden');

        // Reveal ALL Botpress elements before opening
        chatIsOpen = true;
        for (var i = 0; i < botpressElements.length; i++) {
            revealElement(botpressElements[i]);
        }

        // Open Botpress
        openBotpress();
    }

    function openBotpress() {
        if (window.botpress) {
            try { window.botpress.open(); return; } catch (e) {}
        }
        if (window.botpressWebChat) {
            try { window.botpressWebChat.sendEvent({ type: 'show' }); return; } catch (e) {}
        }
    }

    /* ══════════════════════════════════════════
       4. WATCH BOTPRESS STATE — Detect close
       ══════════════════════════════════════════ */
    function watchBotpressState() {
        if (window.botpress && window.botpress.on) {
            window.botpress.on('webchat:opened', function () {
                chatIsOpen = true;
                var c = document.getElementById('custom-3d-bot');
                if (c) c.classList.add('bot-hidden');
            });
            window.botpress.on('webchat:closed', function () {
                hideAllBotpress();
                restoreBot();
            });
            window.botpress.on('webchat:hidden', function () {
                hideAllBotpress();
                restoreBot();
            });
        }

        // Periodic fallback: if chat has closed but we missed the event
        setInterval(function () {
            if (!chatIsOpen) return;
            var bot = document.getElementById('custom-3d-bot');
            if (!bot || !bot.classList.contains('bot-hidden')) return;
            
            // Check if Botpress UI is actually visible
            var anyVisible = false;
            for (var i = 0; i < botpressElements.length; i++) {
                var el = botpressElements[i];
                var rect = el.getBoundingClientRect();
                if (rect.width > 50 && rect.height > 50) {
                    anyVisible = true;
                    break;
                }
            }
            if (!anyVisible) {
                hideAllBotpress();
                restoreBot();
            }
        }, 2000);
    }

    function hideAllBotpress() {
        chatIsOpen = false;
        for (var i = 0; i < botpressElements.length; i++) {
            crushElement(botpressElements[i]);
        }
    }

    function restoreBot() {
        chatIsOpen = false;
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
