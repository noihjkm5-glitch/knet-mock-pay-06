
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-red-900 mb-2">Transaction Failed</h1>
          <p className="text-red-600">KNET Payment Gateway - NBK</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-red-900 flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Payment Error
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-800 font-medium">
                    An error occurred while processing your transaction.
                  </p>
                  <p className="text-red-600 text-sm mt-2">
                    Please try again later.
                  </p>
                </div>
                
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Error Code:</strong> TXN_FAILED_001</p>
                  <p><strong>Transaction ID:</strong> KNT{Date.now().toString().slice(-8)}</p>
                  <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleGoBack}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleGoHome}
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>

              {/* Help Section */}
              <div className="text-center text-xs text-gray-500 pt-4 border-t space-y-2">
                <p>Need help? Contact NBK Customer Service</p>
                <p>📞 1801801 | 💬 Live Chat | 📧 support@nbk.com</p>
                <p className="mt-2 font-medium">This is a simulated payment environment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
