
import { useParams, useNavigate } from "react-router-dom";

// بيانات وهمية محاكية
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
  }
};

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // الحصول على البيانات الوهمية بناءً على المعرف
  const paymentData = dummyPaymentData[id as string];

  const handleConfirm = () => {
    navigate(`/card/${id}`);
  };

  // إذا لم يتم العثور على البيانات
  if (!paymentData) {
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

  const { integer, decimal } = formatAmount(paymentData.amount);
  const currencySymbol = getCurrencySymbol(paymentData.currency || 'KWD');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-800 text-white">
      <div className="container mx-auto px-6 py-8 max-w-md">
        {/* Header with Weyay Logo */}
        <div className="text-center mb-20 pt-12">
          <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Arial' }}>
            ويــاي <span className="text-emerald-400">≡</span>
          </div>
        </div>

        {/* Customer Avatar and Info */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-5xl font-bold text-white">
              {paymentData.customerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-white tracking-wide">{paymentData.customerName.toUpperCase()}</h2>
          <p className="text-gray-300 text-xl mb-12">طلب منك</p>
          
          {/* Amount Display */}
          <div className="text-center mb-20">
            <div className="flex justify-center items-baseline">
              <span className="text-xl ml-2 text-white">{currencySymbol}</span>
              <span className="text-7xl font-bold text-white">{integer}</span>
              <span className="text-2xl text-white">.{decimal}</span>
            </div>
          </div>
        </div>

        {/* Bill Payment Purpose */}
        <div className="mb-8">
          <div className="bg-gray-700/40 rounded-2xl p-6">
            <div className="text-right mb-3">
              <span className="text-lg text-gray-300">الغرض</span>
            </div>
            <div className="text-xl font-medium text-white text-center">
              {paymentData.description || "Bill Payment"}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-12">
          <button
            onClick={handleConfirm}
            className="w-full bg-emerald-400 text-black py-5 rounded-2xl text-xl font-bold hover:bg-emerald-500 transition-colors"
          >
            أكـد
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
