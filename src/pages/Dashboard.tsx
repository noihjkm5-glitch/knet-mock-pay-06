
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Link, Plus } from "lucide-react";
import { generatePaymentLink } from "@/utils/paymentUtils";

interface PaymentLink {
  id: string;
  customerName: string;
  amount: number;
  description: string;
  expiryDate: string;
  createdAt: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [formData, setFormData] = useState({
    customerName: "",
    amount: "",
    description: "",
    expiryDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLink: PaymentLink = {
      id: generatePaymentLink(),
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      description: formData.description,
      expiryDate: formData.expiryDate,
      createdAt: new Date().toISOString()
    };

    setPaymentLinks([newLink, ...paymentLinks]);
    
    // Save to localStorage for persistence
    const savedLinks = JSON.parse(localStorage.getItem('paymentLinks') || '[]');
    localStorage.setItem('paymentLinks', JSON.stringify([newLink, ...savedLinks]));
    
    setFormData({
      customerName: "",
      amount: "",
      description: "",
      expiryDate: ""
    });

    toast({
      title: "Payment Link Created",
      description: "Successfully generated new payment link",
    });
  };

  const copyToClipboard = (id: string) => {
    const url = `${window.location.origin}/pay/${id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Payment link copied to clipboard",
    });
  };

  const previewLink = (id: string) => {
    window.open(`/pay/${id}`, '_blank');
  };

  // Load saved links on component mount
  useState(() => {
    const savedLinks = JSON.parse(localStorage.getItem('paymentLinks') || '[]');
    setPaymentLinks(savedLinks);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">KNET Payment Simulator</h1>
          <p className="text-blue-600">NBK Experience Mock - Create and manage payment links</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Link Generator */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Plus className="h-5 w-5" />
                Create Payment Link
              </CardTitle>
              <CardDescription>Generate a new payment link for your customer</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount (KWD) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Optional payment description"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    required
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Generate Payment Link
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Payment Links List */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Link className="h-5 w-5" />
                Payment Links
              </CardTitle>
              <CardDescription>Manage your created payment links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {paymentLinks.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No payment links created yet</p>
                ) : (
                  paymentLinks.map((link) => (
                    <div key={link.id} className="p-4 border rounded-lg bg-gray-50/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{link.customerName}</h4>
                          <p className="text-sm text-gray-600">KWD {link.amount.toFixed(3)}</p>
                          {link.description && (
                            <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(link.id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => previewLink(link.id)}
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Created: {new Date(link.createdAt).toLocaleDateString()}
                        {link.expiryDate && ` | Expires: ${new Date(link.expiryDate).toLocaleDateString()}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
