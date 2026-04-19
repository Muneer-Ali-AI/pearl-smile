# 🤖 خطة بناء أيقونة روبوت طبي ثلاثي الأبعاد للشات بوت

---

## ① ملخص المشروع

**الهدف:** استبدال أيقونة Botpress الافتراضية (الفقاعة الدائرية) بـ **روبوت طبي متحرك ثلاثي الأبعاد** يتفاعل مع حركة الماوس، ويحتوي على فقاعة نصية تدعو العميل للتفاعل.

**النتيجة النهائية:**
- روبوت طبي ظريف في الزاوية السفلية اليمنى (RTL) أو اليسرى (LTR)
- عيناه تتبع حركة الماوس
- فقاعة نص: "كيف يمكنني مساعدتك؟" (عربي) / "How can I help you?" (إنجليزي)
- عند النقر → تفتح نافذة Botpress
- زر واتساب يعود لمكانه الطبيعي (bottom: 30px)

---

## ② الملفات المتأثرة

| الملف | الإجراء | الوصف |
|-------|---------|-------|
| `img/medical-robot.png` | **إنشاء جديد** | صورة الروبوت (يتم توليدها بأداة generate_image) |
| `css/chatbot-widget.css` | **إنشاء جديد** | كل أنماط الروبوت والفقاعة والتحريك |
| `js/chatbot.js` | **تعديل كامل** | منطق الروبوت + تتبع الماوس + ربط Botpress |
| `css/style.css` | **تعديل سطر واحد** | إزالة رفع واتساب (السطر 2457) |
| `css/style-en.css` | **تعديل سطر واحد** | نفس الشيء للنسخة الإنجليزية |
| جميع ملفات `*.html` (14 ملف) | **تعديل بسيط** | إضافة رابط `chatbot-widget.css` في `<head>` |

> [!IMPORTANT]
> لا تُعدّل أي ملف آخر. لا تمس `booking.js` أو `popup.js` أو `main.js`.

---

## ③ الخطوات التفصيلية

### الخطوة 1: توليد صورة الروبوت الطبي

**الأداة:** `generate_image`

**البرومبت المطلوب (بالإنجليزي — لأن أداة توليد الصور تعمل أفضل بالإنجليزية):**

```
A cute friendly 3D medical robot mascot character, dental clinic assistant style. 
The robot has: a rounded white body with gold (#D4AF37) accents, a small red cross 
medical symbol on its chest, large expressive round eyes (white sclera with dark 
pupils - pupils will be animated separately so make them clearly visible), a gentle 
smile, small rounded arms. The robot wears a tiny dental mirror headband. 
Style: 3D rendered, Pixar-quality, soft lighting, transparent/clean background (PNG). 
The robot should look approachable, professional, and premium. 
Viewing angle: front-facing, slight 3/4 turn. Size: suitable for a web widget icon.
```

**اسم الملف:** `medical_robot`

**بعد التوليد:**
- انسخ الصورة إلى: `d:\تطبيقات anyigravity\Project 5\img\medical-robot.png`
- تحقق أن الصورة واضحة وبخلفية شفافة أو نظيفة

---

### الخطوة 2: إنشاء ملف CSS للروبوت

**الملف:** `d:\تطبيقات anyigravity\Project 5\css\chatbot-widget.css`

**المواصفات الدقيقة:**

#### 2.1 — الحاوية الرئيسية `.chatbot-widget`
```
- position: fixed
- bottom: 24px
- right: 24px  (للعربي RTL — الروبوت في اليمين)
- z-index: 99999
- display: flex
- flex-direction: column
- align-items: flex-end  (RTL) أو flex-start (LTR)
- gap: 8px
- pointer-events: none  (الحاوية نفسها لا تمنع النقر)
- لا تضع أي transition على الحاوية
```

> [!WARNING]
> **مهم للـ RTL/LTR:**
> - في الصفحات العربية (`dir="rtl"`): الروبوت في **اليمين** (`right: 24px`)
> - في الصفحات الإنجليزية (`dir="ltr"`): الروبوت في **اليسار** (`left: 24px`)
> - استخدم `[dir="rtl"] .chatbot-widget { right: 24px; left: auto; }` و `[dir="ltr"] .chatbot-widget { left: 24px; right: auto; }`

#### 2.2 — فقاعة النص `.chatbot-bubble`
```
- background: linear-gradient(135deg, #0A1128, #16203A)
- color: #FFFFFF
- font-family: 'Cairo', sans-serif
- font-size: 13px
- font-weight: 600
- padding: 10px 16px
- border-radius: 12px 12px 4px 12px  (RTL)
- border: 1px solid rgba(212, 175, 55, 0.3)
- box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15)
- max-width: 200px
- text-align: center
- pointer-events: auto
- cursor: pointer
- opacity: 0 → 1 (أنيميشن بعد 2 ثانية من تحميل الصفحة)
- animation: bubbleFadeIn 0.5s ease 2s forwards
- أضف "::" pseudo-element مثلث صغير يشير للأسفل نحو الروبوت
```

**النص:**
- عربي: `كيف يمكنني مساعدتك اليوم؟ 🦷`
- إنجليزي: `How can I help you today? 🦷`

#### 2.3 — حاوية الروبوت `.chatbot-robot`
```
- width: 80px
- height: 80px
- pointer-events: auto
- cursor: pointer
- position: relative
- transition: transform 0.3s ease
- filter: drop-shadow(0 8px 20px rgba(212, 175, 55, 0.3))
```

**عند الـ hover:**
```
- transform: scale(1.08)
- filter: drop-shadow(0 12px 30px rgba(212, 175, 55, 0.45))
```

#### 2.4 — صورة الروبوت `.chatbot-robot img`
```
- width: 100%
- height: 100%
- object-fit: contain
- pointer-events: none (النقر يكون على الحاوية)
```

#### 2.5 — عيون الروبوت `.robot-eyes`
```
- position: absolute
- top: 28%  (تُعدّل بحسب الصورة المولّدة)
- left: 50%
- transform: translateX(-50%)
- width: 30px
- height: 14px
- display: flex
- gap: 8px
- pointer-events: none
```

كل عين `.robot-eye`:
```
- width: 12px
- height: 12px
- background: #0A1128
- border-radius: 50%
- position: relative
- transition: transform 0.15s ease-out
```

> [!TIP]
> العيون هي `div` عناصر فوق الصورة. تتحرك بـ `transform: translate(Xpx, Ypx)` بحسب موقع الماوس. نطاق الحركة: **±3px** أفقياً و **±2px** عمودياً.

#### 2.6 — أنيميشن الدخول
```css
@keyframes botFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}

@keyframes bubbleFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}
```

- الروبوت: `animation: botFloat 3s ease-in-out infinite`
- الفقاعة: `animation: bubbleFadeIn 0.5s ease 2s forwards` (تظهر بعد 2 ثانية)

#### 2.7 — حالة فتح الشات `.chatbot-widget.chat-open`
```
- .chatbot-bubble { display: none }
- .chatbot-robot { opacity: 0.5; transform: scale(0.7) }
```

#### 2.8 — الموبايل `@media (max-width: 768px)`
```
- .chatbot-widget { bottom: 16px; right: 16px; }
- .chatbot-robot { width: 64px; height: 64px; }
- .chatbot-bubble { font-size: 12px; max-width: 160px; }
```

#### 2.9 — إخفاء زر Botpress الافتراضي
```css
#bp-web-widget-container .bpFab,
#bp-web-widget-container [class*="Fab"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
}
```

---

### الخطوة 3: تعديل `js/chatbot.js` بالكامل

**الملف:** `d:\تطبيقات anyigravity\Project 5\js\chatbot.js`

**الاستراتيجية:** استبدال **كامل** محتوى الملف. لا تُعدّل — أعد كتابته.

**البنية المطلوبة (IIFE — كل شيء داخل `(function(){ ... })();`):**

#### 3.1 — متغيرات التكوين (أعلى الملف)
```javascript
var CONFIG = {
    botId: 'f3303645-fddc-459e-ae3d-a4fec0dc2cc6',
    clientId: '0a4c9471-14ed-4b48-847f-1781f7946b78',
    configUrl: 'https://files.bpcontent.cloud/2026/04/18/17/20260418171812-4XQSS5H8.json',
    robotImage: 'img/medical-robot.png',
    bubbleTextAr: 'كيف يمكنني مساعدتك اليوم؟ 🦷',
    bubbleTextEn: 'How can I help you today? 🦷',
    eyeMovementRange: { x: 3, y: 2 }
};
```

#### 3.2 — دالة `isArabic()`
```javascript
function isArabic() {
    return document.documentElement.lang === 'ar' || 
           document.documentElement.dir === 'rtl';
}
```

#### 3.3 — دالة `buildRobotWidget()`
تُنشئ الـ DOM التالي وتضيفه لـ `document.body`:

```html
<div class="chatbot-widget" id="chatbotWidget">
    <div class="chatbot-bubble" id="chatbotBubble">
        <!-- النص يعتمد على اللغة -->
        كيف يمكنني مساعدتك اليوم؟ 🦷
    </div>
    <div class="chatbot-robot" id="chatbotRobot">
        <img src="img/medical-robot.png" alt="مساعد طبي" draggable="false">
        <div class="robot-eyes" id="robotEyes">
            <div class="robot-eye" id="eyeLeft"></div>
            <div class="robot-eye" id="eyeRight"></div>
        </div>
    </div>
</div>
```

> [!IMPORTANT]
> **يجب إنشاء كل العناصر بـ `document.createElement` وليس `innerHTML`** لأنه أكثر أماناً ولا يتعارض مع CSP.

> **مسار الصورة:** استخدم `CONFIG.robotImage` مباشرة. المسار `img/medical-robot.png` يعمل من جميع صفحات HTML لأنها كلها في نفس المستوى.

#### 3.4 — دالة `initEyeTracking()`
```
- استمع لحدث `mousemove` على `document`
- احسب زاوية الماوس نسبة للروبوت:
    dx = mouseX - robotCenterX
    dy = mouseY - robotCenterY
    angle = Math.atan2(dy, dx)
    distance = Math.min(Math.hypot(dx, dy), 300) / 300
- حرّك كل عين:
    translateX = Math.cos(angle) * CONFIG.eyeMovementRange.x * distance
    translateY = Math.sin(angle) * CONFIG.eyeMovementRange.y * distance
- طبّق: eyeLeft.style.transform = `translate(${x}px, ${y}px)`
- استخدم requestAnimationFrame للأداء
- على الموبايل (touch): لا حركة للعيون (أو تحريك عشوائي خفيف)
```

#### 3.5 — دالة `initBotpress()`
```
- أنشئ <script> بـ src: 'https://cdn.botpress.cloud/webchat/v3.6/inject.js'
- عند onload:
    window.botpress.init({
        botId: CONFIG.botId,
        clientId: CONFIG.clientId,
        configuration: {
            color: '#D4AF37',
            variant: 'solid',
            themeMode: 'light',
            fontFamily: 'inter',
            radius: 4,
            composerPlaceholder: isArabic() ? 'اكتب رسالتك...' : 'Type your message...'
        }
    });
- بعد الـ init، انتظر 500ms ثم أخفِ زر Botpress الافتراضي:
    #bp-web-widget-container .bpFab → display: none
```

#### 3.6 — دالة `handleWidgetClick()`
```
- عند النقر على .chatbot-robot أو .chatbot-bubble:
    1. window.botpress.open()  ← يفتح نافذة الشات
    2. أضف class "chat-open" على #chatbotWidget
- استمع لحدث إغلاق الشات من Botpress:
    window.botpress.on('webchat:closed', function() {
        أزل class "chat-open" من #chatbotWidget
    });
```

#### 3.7 — دالة `init()` الرئيسية
ترتيب التنفيذ:
```
1. buildRobotWidget()
2. initEyeTracking()
3. initBotpress()
4. handleWidgetClick()
```

تُستدعى عند:
```javascript
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

#### 3.8 — ما يجب حذفه من الملف الحالي
- **احذف بالكامل** دالة `adjustLayout()` التي ترفع واتساب (السطر 31-36)
- **احذف** CSS الـ inline الذي يغير `bottom` لواتساب (السطور 46-51)

---

### الخطوة 4: إصلاح موقع زر واتساب

#### 4.1 — في `css/style.css` (سطر 2457)
```diff
 .floating-wa {
     position: fixed;
-    bottom: 30px;
+    bottom: 30px;
     left: 30px;
```
**لا تغيير هنا** — القيمة الأصلية `30px` صحيحة. المشكلة كانت في `chatbot.js` القديم الذي يغيرها لـ `90px`. بحذف ذلك الكود من `chatbot.js` الجديد، ترجع تلقائياً.

#### 4.2 — تأكد أن `chatbot.js` الجديد **لا يحتوي** على أي كود يغير `.floating-wa`

#### 4.3 — في `css/style-en.css` (سطر 2320)
نفس الشيء — تأكد أن `bottom: 30px` موجودة ولا يوجد كود JS يغيرها.

---

### الخطوة 5: إضافة CSS في جميع صفحات HTML

**الملفات (14 ملف):**
```
index.html, index-en.html, about.html, about-en.html,
services.html, services-en.html, doctors.html, doctors-en.html,
contact.html, contact-en.html, blog.html, blog-en.html,
blog-post-implants.html, blog-post-implants-en.html
```

**الإجراء:** أضف هذا السطر في `<head>` (بعد آخر `<link>` CSS موجود):
```html
<link rel="stylesheet" href="css/chatbot-widget.css">
```

> [!TIP]
> يمكن استخدام سكربت PowerShell لإضافة السطر تلقائياً في جميع الملفات. استخدم نفس أسلوب Unicode للمسار العربي.

---

## ④ مواصفات تقنية حرجة

### التوافق مع Botpress v3.6

| الأمر | التفاصيل |
|-------|----------|
| فتح الشات | `window.botpress.open()` |
| إغلاق الشات | `window.botpress.close()` |
| toggle | `window.botpress.toggle()` |
| الاستماع للإغلاق | `window.botpress.on('webchat:closed', callback)` |
| الاستماع للفتح | `window.botpress.on('webchat:opened', callback)` |
| إخفاء الزر الافتراضي | `hideWidget: true` في الـ init، أو CSS `display: none` على `.bpFab` |

> [!WARNING]
> **إذا لم يعمل `hideWidget: true`:**
> استخدم `MutationObserver` على `document.body` لمراقبة إضافة `#bp-web-widget-container` ثم أخفِ `.bpFab` بالـ CSS.
> ```javascript
> var observer = new MutationObserver(function() {
>     var fab = document.querySelector('#bp-web-widget-container [class*="Fab"]');
>     if (fab) { fab.style.display = 'none'; observer.disconnect(); }
> });
> observer.observe(document.body, { childList: true, subtree: true });
> ```

### الأداء
- `mousemove` → استخدم `requestAnimationFrame` + throttle (لا أكثر من 60fps)
- الصورة → حجمها يجب ألا يتجاوز 100KB (اضغطها إذا لزم)
- CSS animations → استخدم `transform` و `opacity` فقط (GPU accelerated)

### الوصولية (Accessibility)
- `.chatbot-robot`: أضف `role="button"` و `tabindex="0"` و `aria-label`
- استمع لـ `keydown` (Enter/Space) لفتح الشات
- `aria-label` عربي: `"افتح المساعد الذكي"` / إنجليزي: `"Open AI Assistant"`

---

## ⑤ ترتيب z-index النهائي

| العنصر | z-index |
|--------|---------|
| Back to Top | `998` |
| WhatsApp floating | `999` (الأصلي) |
| Chatbot Widget (الروبوت) | `99998` |
| Botpress Chat Window | `99999` |
| Booking Modal (bkOverlay) | `100000` |

---

## ⑥ ملخص التغييرات لكل ملف

### ملف `js/chatbot.js` — إعادة كتابة كاملة
```
- حذف: كل المحتوى الحالي (55 سطر)
- إضافة: ~120 سطر جديد يحتوي على:
    • CONFIG object
    • isArabic()
    • buildRobotWidget()  — بناء DOM
    • initEyeTracking()   — تتبع الماوس
    • initBotpress()      — تحميل وتهيئة Botpress
    • handleWidgetClick() — ربط النقر
    • init()              — نقطة البداية
```

### ملف `css/chatbot-widget.css` — ملف جديد
```
~100 سطر يحتوي على:
    • .chatbot-widget — الحاوية الثابتة
    • .chatbot-bubble — فقاعة النص
    • .chatbot-bubble::after — المثلث
    • .chatbot-robot — حاوية الروبوت
    • .chatbot-robot img
    • .robot-eyes, .robot-eye
    • @keyframes botFloat
    • @keyframes bubbleFadeIn
    • .chatbot-widget.chat-open (حالة الفتح)
    • إخفاء زر Botpress الافتراضي
    • @media mobile
    • [dir="rtl"] / [dir="ltr"] overrides
```

### صورة `img/medical-robot.png` — ملف جديد
```
- روبوت طبي 3D، خلفية شفافة
- أبعاد مقترحة: 200x200 إلى 300x300 بكسل
- حجم: أقل من 100KB
```

### جميع ملفات HTML (14 ملف) — سطر واحد
```html
<link rel="stylesheet" href="css/chatbot-widget.css">
```

### `css/style.css` و `css/style-en.css` — بدون تغيير
```
- floating-wa يبقى bottom: 30px (القيمة الأصلية)
- JS لم يعد يعدّلها
```

---

## ⑦ قائمة التحقق النهائية

- [ ] صورة الروبوت موجودة في `img/medical-robot.png`
- [ ] `chatbot-widget.css` مُنشأ ومُضاف لجميع صفحات HTML
- [ ] `chatbot.js` أُعيد كتابته بالكامل
- [ ] زر Botpress الافتراضي مخفي
- [ ] الروبوت يظهر في الزاوية السفلية اليمنى (عربي) / اليسرى (إنجليزي)
- [ ] فقاعة النص تظهر بعد 2 ثانية
- [ ] النقر على الروبوت أو الفقاعة يفتح شات Botpress
- [ ] عيون الروبوت تتبع الماوس
- [ ] زر واتساب في مكانه الصحيح (`bottom: 30px`) بدون ارتفاع
- [ ] لا تداخل بين واتساب والروبوت
- [ ] الموبايل: الروبوت أصغر ولا يحجب المحتوى
- [ ] لا أخطاء في Console
- [ ] الروبوت يتحرك (floating animation)
- [ ] عند إغلاق الشات، يعود الروبوت لوضعه الطبيعي

---

> [!CAUTION]
> **أخطاء شائعة يجب تجنبها:**
> 1. **لا تستخدم `innerHTML`** لبناء الروبوت — استخدم `createElement`
> 2. **لا تنسَ `pointer-events: auto`** على الروبوت والفقاعة
> 3. **لا تضع `hideWidget: true`** في init إذا لم تكن متأكداً أنه يعمل — استخدم CSS بدلاً منه
> 4. **لا تغيّر `bottom` لزر واتساب** في أي مكان — اتركه `30px` الأصلية
> 5. **موقع العيون** يعتمد على الصورة المولّدة — قد تحتاج لتعديل `top: 28%` بعد رؤية الصورة
