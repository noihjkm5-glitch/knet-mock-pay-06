
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface PaymentLink {
  id: string;
  customerName: string;
  amount: number;
  currency?: string;
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
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-800 text-white flex items-center justify-center">
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

  // Get currency symbol
  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'KWD': 'د.ك',
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'SAR': 'ر.س',
      'AED': 'د.إ',
      'QAR': 'ر.ق',
      'BHD': 'د.ب'
    };
    return symbols[currency] || currency;
  };

  const { integer, decimal } = formatAmount(paymentData.amount);
  const currencySymbol = getCurrencySymbol(paymentData.currency || 'KWD');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-800 text-white">
      <div className="container mx-auto px-6 py-8 max-w-md">
        {/* Header with Weyay Logo */}
        <div className="text-center mb-20 pt-12">
          <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Arial' }}>
            ويــاي <span className="text-emerald-400">≡</span>
          </div>
        </div>

        {/* Customer Avatar and Info */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-5xl font-bold text-white">
              {paymentData.customerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-white tracking-wide">{paymentData.customerName.toUpperCase()}</h2>
          <p className="text-gray-300 text-xl mb-12">طلب منك</p>
          
          {/* Amount Display */}
          <div className="text-center mb-20">
            <div className="flex justify-center items-baseline">
              <span className="text-xl ml-2 text-white">{currencySymbol}</span>
              <span className="text-7xl font-bold text-white">{integer}</span>
              <span className="text-2xl text-white">.{decimal}</span>
            </div>
          </div>
        </div>

        {/* Bill Payment Purpose */}
        <div className="mb-8">
          <div className="bg-gray-700/40 rounded-2xl p-6">
            <div className="text-right mb-3">
              <span className="text-lg text-gray-300">الغرض</span>
            </div>
            <div className="text-xl font-medium text-white text-center">
              {paymentData.description || "Bill Payment"}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-12">
          <button
            onClick={handleConfirm}
            className="w-full bg-emerald-400 text-black py-5 rounded-2xl text-xl font-bold hover:bg-emerald-500 transition-colors"
          >
            أكـد
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
