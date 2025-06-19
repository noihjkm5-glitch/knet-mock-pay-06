
import { Button } from "@/components/ui/button";
import { X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex flex-col items-center justify-center px-4">
      {/* Logo at the top */}
      <div className="absolute top-8 text-center">
        <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Arial' }}>
          ويــاي <span className="text-emerald-400">≡</span>
        </div>
      </div>

      {/* Main content centered */}
      <div className="flex flex-col items-center justify-center flex-1 text-center space-y-8">
        {/* Large X icon in rounded square */}
        <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-emerald-400 rounded-2xl flex items-center justify-center">
            <X className="h-12 w-12 text-white stroke-[3]" />
          </div>
        </div>

        {/* Arabic error text */}
        <div className="space-y-2">
          <p className="text-xl sm:text-2xl font-medium text-white">
            يرجى العلم بأنه تم رفض
          </p>
          <p className="text-xl sm:text-2xl font-medium text-white">
            عملية الدفع.
          </p>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 text-center">
        <p className="text-lg font-medium text-white">
          خلّك ويـاي!
        </p>
      </div>

      {/* Hidden go home button for functionality */}
      <Button 
        onClick={handleGoHome}
        className="fixed bottom-4 right-4 opacity-0 pointer-events-none"
        size="sm"
      >
        <Home className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ErrorPage;
