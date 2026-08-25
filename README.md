# MO — Beyond the Frame / مو — خارج الإطار

## Chapter 01 — The Error That Wasn't / الخطأ اللي ماكانش خطأ

Production release `v1.0.0` · Build `MO-1.0.0-IEGY` · Project `MO-IEGY-01` · Signature `MH-4047`

Interactive cinematic comic created by Mohamed Hussein. The release contains all 12 locked Chapter 01 scenes, the epilogue and Chapter 02 teaser in Arabic and English.

## التشغيل السريع

المتطلبات: Node.js 22 أو أحدث.

```bash
npm ci
npm run dev
```

افتح العنوان الذي يظهر في الطرفية. الصوت يبدأ مقفولًا احترامًا لسياسات تشغيل الصوت في المتصفحات، ويمكن تشغيله من الزر العلوي.

## Production build

```bash
npm ci
npm run build
npm test
```

ينتج الموقع الثابت كاملًا داخل مجلد `out/`. لا يحتاج إلى خادم أو Backend أو قاعدة بيانات.

لمعاينة نسخة الإنتاج محليًا بأي خادم ملفات ثابتة:

```bash
npx serve out
```

## GitHub Pages

المشروع يحتوي Workflow جاهزًا في `.github/workflows/deploy-pages.yml`.

1. ارفع محتويات المشروع إلى مستودع GitHub.
2. افتح **Settings → Pages**.
3. اختر **GitHub Actions** كمصدر النشر.
4. ارفع إلى فرع `main` أو شغّل Workflow يدويًا.

الـWorkflow يضبط `basePath` تلقائيًا لمواقع Project Pages. إذا أضفت `public/CNAME` لدومين مخصص فسيبني من جذر الدومين تلقائيًا.

للبناء اليدوي داخل مسار فرعي أو على دومين مختلف يمكن ضبط `NEXT_PUBLIC_BASE_PATH` و`NEXT_PUBLIC_SITE_URL` وقت البناء؛ وتُستخدم القيم نفسها تلقائيًا في روابط الأصول وبيانات المشاركة الاجتماعية.

## Architecture

- Next.js 16 + React 19 + TypeScript strict.
- `output: "export"` مع `trailingSlash` لنسخة ثابتة قابلة للنقل.
- لا Firebase، لا API routes، لا Server Functions، لا خدمات مدفوعة.
- `IntersectionObserver` لتحميل المشهد الحالي والمشهد التالي فقط.
- `requestAnimationFrame` واحد للمشهد النشط لربط الحركة بالـScroll.
- AVIF ثم WebP ثم JPEG للخلفيات؛ Sprite Atlases محسّنة لـMo وPIX.
- نظام صوت Web Audio مولّد محليًا، بلا تنزيل ملفات صوتية كبيرة.
- حفظ اللغة والصوت والحركة والجودة والتقدم في `localStorage` فقط.
- أوضاع Auto / Balanced / Lite وReduced Motion كامل.

## Experience controls

- العربية هي الافتراضية؛ زر `EN` يحوّل للإنجليزية.
- زر الصوت يفتح/يغلق الصوت فورًا.
- الإعدادات: مستوى الصوت، الحركة، وضع الأداء.
- القصة تكتمل بالـScroll وحده. التفاعلات الاختيارية تكشف الكوميديا والـEaster Eggs فقط.
- جميع الأزرار الأساسية قابلة للكيبورد واللمس، ولا يوجد تفاعل مطلوب يعتمد على Hover.

## Chapter structure

1. `ch01-sc01-awakening`
2. `ch01-sc02-no-errors`
3. `ch01-sc03-city-walk`
4. `ch01-sc04-error4047`
5. `ch01-sc05-pix`
6. `ch01-sc06-the-edge`
7. `ch01-sc07-frame-break`
8. `ch01-sc08-fall`
9. `ch01-sc09-margin`
10. `ch01-sc10-followed`
11. `ch01-sc11-blank`
12. `ch01-sc12-escape`

ثم Epilogue وChapter 02 teaser: **محطة آخر الليل / The Last Stop**.

## Documentation

- `ASSET_INVENTORY.md` — قائمة الأصول وأدوارها.
- `TEST_REPORT.md` — تقرير التحقق النهائي.
- `IMPLEMENTATION_DECISIONS.md` — القرارات التنفيذية المحدودة.
- `canon/` — حزمة الـCanon الرسمية التي بُني عليها الإصدار.

## Rights

**تصميم وبرمجة محمد حسين — [iegy.net](https://iegy.net)**  
**Designed & Developed by Mohamed Hussein — [iegy.net](https://iegy.net)**

© 2026 Mohamed Hussein. All Rights Reserved.
