
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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex flex-col items-center justify-center px-4 text-white">
      {/* Logo */}
      <div className="mb-8">
        <div className="text-white text-2xl font-bold">
          ويايي <span className="text-teal-400">===</span>
        </div>
      </div>

      {/* Error Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 border-4 border-white rounded-xl flex items-center justify-center bg-purple-800">
          <div className="text-white text-4xl">☹</div>
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center mb-8 max-w-md">
        <h1 className="text-xl font-medium mb-2 leading-relaxed">
          AHMED MOHAMED <span className="block">ABDI</span> راجع يوصل
        </h1>
        <p className="text-lg">إنك رفضت طلب التحويل.</p>
      </div>

      {/* Transaction Details */}
      <div className="text-center space-y-2 mb-12 text-sm">
        <div>
          <span className="text-gray-300">النتيجة:</span>
          <span className="mr-2">العملية ملغاة</span>
        </div>
        <div>
          <span className="text-gray-300">المبلغ:</span>
          <span className="mr-2">50,000 د.ك</span>
        </div>
        <div>
          <span className="text-gray-300">التاريخ:</span>
          <span className="mr-2">09/05/2025 18:03:23</span>
        </div>
        <div>
          <span className="text-gray-300">رقم التتبع:</span>
          <span className="mr-2">QPA2A8T6B25</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-8">
        <p className="text-lg font-medium">حمّل ويايي!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
