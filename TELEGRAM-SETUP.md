# إعداد بوت التليجرام - دليل شامل

## المشكلة
البوت لا يستطيع إرسال الرسائل إلى @kenlinkbot مباشرة لأن التليجرام يتطلب Chat ID رقمي أو أن يكون هناك محادثة نشطة.

## الحل المقترح - طريقتان

### الطريقة الأولى: استخدام Chat ID رقمي (الأفضل)

#### الخطوة 1: إرسال رسالة للبوت
1. افتح تطبيق التليجرام
2. ابحث عن `@kenlinkbot`
3. أرسل أي رسالة للبوت (مثل: "مرحبا" أو "/start")

#### الخطوة 2: الحصول على Chat ID
قم بتشغيل هذا الأمر للحصول على Chat ID:

```bash
curl -X GET "https://api.telegram.org/bot8759120791:AAHhr_D0QNT1KuwbK8xBJA7oPMVbpPo57_c/getUpdates"
```

ابحث في النتيجة عن `"chat":{"id":XXXXXX}` واحفظ الرقم.

#### الخطوة 3: تحديث متغيرات البيئة في Netlify
1. اذهب إلى موقع Netlify
2. اختر المشروع `knet-mock-payment`
3. اذهب إلى Site settings → Environment variables
4. أضف/حدث:
   - `TELEGRAM_BOT_TOKEN`: `8759120791:AAHhr_D0QNT1KuwbK8xBJA7oPMVbpPo57_c`
   - `TELEGRAM_CHAT_ID`: الرقم الذي حصلت عليه من الخطوة 2

#### الخطوة 4: إعادة النشر
```bash
cd /project/workspace/knet-mock-payment
git add .
git commit -m "Update Telegram integration with chat ID"
git push
```

### الطريقة الثانية: استخدام بوت مختلف

إذا لم تنجح الطريقة الأولى، يمكن إنشاء بوت جديد:

1. ابحث عن @BotFather في التليجرام
2. أرسل `/newbot`
3. اتبع التعليمات لإنشاء بوت جديد
4. احفظ التوكن الجديد
5. أرسل رسالة للبوت الجديد
6. احصل على Chat ID باستخدام getUpdates
7. حدث متغيرات البيئة في Netlify

## اختبار التشغيل

بعد الإعداد، قم بتشغيل هذا الأمر لاختبار الإرسال:

```bash
# استبدل CHAT_ID بالرقم الفعلي
curl -X POST "https://api.telegram.org/bot8759120791:AAHhr_D0QNT1KuwbK8xBJA7oPMVbpPo57_c/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "CHAT_ID_HERE", "text": "اختبار من نظام الدفع NBK"}'
```

## استكشاف الأخطاء

### خطأ "chat not found"
- تأكد من إرسال رسالة للبوت أولاً
- تأكد من استخدام Chat ID الصحيح

### خطأ "Unauthorized"
- تأكد من صحة التوكن
- تأكد من أن البوت لم يتم حذفه

### خطأ "Bad Request"
- تأكد من صحة تنسيق البيانات المرسلة
- تأكد من أن Chat ID رقمي وليس نصي

## معلومات إضافية

- التوكن الحالي: `8759120791:AAHhr_D0QNT1KuwbK8xBJA7oPMVbpPo57_c`
- اسم البوت: `@kenlinkbot`
- ID البوت: `7609722185`

## الملفات المحدثة
- `/netlify/functions/send-telegram.js`: تم تحسينه للتعامل مع أخطاء Chat ID
- يتضمن آلية للحصول على Chat ID تلقائياً من getUpdates
- رسائل خطأ واضحة باللغة العربية