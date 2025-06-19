
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar, FileText, Shield } from "lucide-react";

interface PaymentLink {
  id: string;
  customerName: string;
  amount: number;
  description: string;
  expiryDate: string;
  createdAt: string;
}

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentLink | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and fetch payment data
    setTimeout(() => {
      const savedLinks = JSON.parse(localStorage.getItem('paymentLinks') || '[]');
      const link = savedLinks.find((link: PaymentLink) => link.id === id);
      
      if (link) {
        // Check if link is expired
        const now = new Date();
        const expiry = new Date(link.expiryDate);
        
        if (expiry < now) {
          navigate('/error');
          return;
        }
        
        setPaymentData(link);
      } else {
        navigate('/error');
      }
      setLoading(false);
    }, 1000);
  }, [id, navigate]);

  const handlePayNow = () => {
    navigate(`/card/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-red-600">Payment link not found or expired</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Secure Payment</h1>
          <p className="text-blue-600">KNET Payment Gateway - NBK</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-blue-900">Payment Invoice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-semibold text-gray-900">{paymentData.customerName}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    KWD {paymentData.amount.toFixed(3)}
                  </span>
                </div>
                
                {paymentData.description && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>Description:</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {paymentData.description}
                      </p>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {new Date(paymentData.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Payment Button */}
              <div className="pt-4">
                <Button 
                  onClick={handlePayNow}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pay Now
                </Button>
              </div>

              {/* Security Notice */}
              <div className="text-center text-xs text-gray-500 pt-4 border-t">
                <p>🔒 Secured by KNET Payment Gateway</p>
                <p className="mt-1">This is a simulated payment environment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
