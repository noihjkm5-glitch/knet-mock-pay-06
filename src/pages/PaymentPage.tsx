
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
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header with Bank Logo */}
        <div className="text-center mb-16 pt-8">
          <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Arial' }}>
            ويــاي <span className="text-emerald-400">≡</span>
          </div>
        </div>

        {/* Customer Avatar */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">A</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">AHMED MOHAMED ABDI</h2>
          <p className="text-gray-300 text-lg mb-8">طلب منك</p>
          
          {/* Amount */}
          <div className="text-center mb-16">
            <span className="text-6xl font-bold">50</span>
            <span className="text-2xl">.000</span>
            <span className="text-lg ml-2">د.ك</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Bill Payment Purpose */}
          <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
            <div className="text-right mb-3">
              <span className="text-base text-gray-300">الغرض</span>
            </div>
            <div className="text-xl font-medium">Bill Payment</div>
          </div>

          {/* Reject Button */}
          <button
            onClick={handleReject}
            className="w-full bg-transparent border-2 border-white/30 text-white py-4 rounded-2xl text-xl font-medium hover:bg-white/10 transition-colors"
          >
            رفض الطلب
          </button>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-emerald-400 text-black py-4 rounded-2xl text-xl font-bold hover:bg-emerald-500 transition-colors"
          >
            أكـد
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
