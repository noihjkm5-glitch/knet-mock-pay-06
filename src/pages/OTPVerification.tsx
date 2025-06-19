
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, ArrowLeft, Smartphone } from "lucide-react";

const OTPVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate processing time
    setTimeout(() => {
      // Always redirect to error page (as per requirements)
      navigate('/error');
    }, 2000);
  };

  const handleBack = () => {
    navigate(`/card/${id}`);
  };

  const handleResend = () => {
    setError("");
    // Simulate resend action
    setTimeout(() => {
      setError("OTP resent to your registered mobile number");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">OTP Verification</h1>
          <p className="text-blue-600">Enter the 6-digit code sent to your mobile</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-blue-900 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5" />
                Secure Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Please enter the OTP sent to your registered mobile number ending with ****1234
                  </p>
                  
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Didn't receive the code? Resend OTP
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
                    size="lg"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      'Verify & Complete Payment'
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="w-full"
                    disabled={loading}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Card Details
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="text-center text-xs text-gray-500 pt-4 border-t">
                  <p>🔒 OTP is valid for 5 minutes</p>
                  <p className="mt-1">This is a simulated payment environment</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
