
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex flex-col items-center justify-between px-4 py-8">
      {/* Header with Weyay Logo */}
      <div className="text-center pt-8">
        <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Arial' }}>
          ويــاي <span className="text-emerald-400">≡</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Error Icon */}
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center">
            <X className="w-16 h-16 text-gray-800" strokeWidth={3} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-emerald-400 rounded-b-3xl"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <p className="text-xl font-medium">يرجى العلم بأنه تم رفض</p>
          <p className="text-xl font-medium">عملية الدفع.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-lg font-medium">خلّك ويايي!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
