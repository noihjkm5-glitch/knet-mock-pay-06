
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    // Get payment data from localStorage
    const savedLinks = JSON.parse(localStorage.getItem('paymentLinks') || '[]');
    const currentPayment = savedLinks.find((link: PaymentLink) => link.id === id);
    
    if (currentPayment) {
      setPaymentData(currentPayment);
    } else {
      // If payment link not found, redirect to error page
      navigate('/error');
    }
  }, [id, navigate]);

  const handleConfirm = () => {
    navigate(`/card/${id}`);
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  // Format amount to show with proper decimal places
  const formatAmount = (amount: number) => {
    const parts = amount.toString().split('.');
    const wholePart = parts[0];
    const decimalPart = parts[1] || '000';
    return { whole: wholePart, decimal: decimalPart.padEnd(3, '0') };
  };

  const { whole, decimal } = formatAmount(paymentData.amount);

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
            <span className="text-2xl sm:text-4xl font-bold text-white">
              {paymentData.customerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">{paymentData.customerName.toUpperCase()}</h2>
          <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-8">طلب منك</p>
          
          {/* Amount - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-4xl sm:text-6xl font-bold">{whole}</span>
            <span className="text-lg sm:text-2xl">.{decimal}</span>
            <span className="text-sm sm:text-lg ml-1 sm:ml-2">د.ك</span>
          </div>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {/* Payment Purpose - Mobile Optimized */}
          <div className="bg-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-right mb-2 sm:mb-3">
              <span className="text-sm sm:text-base text-gray-300">الغرض</span>
            </div>
            <div className="text-lg sm:text-xl font-medium">
              {paymentData.description || "دفع فاتورة"}
            </div>
          </div>

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
