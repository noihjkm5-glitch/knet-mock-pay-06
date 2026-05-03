
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
          
      </div>
    </div>
  );
};

export default PaymentPage;
