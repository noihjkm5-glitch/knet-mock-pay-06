
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy, Link, Plus } from "lucide-react";
import { generatePaymentLink } from "@/utils/paymentUtils";

interface PaymentLink {
  id: string;
  customerName: string;
  amount: number;
  currency: string;
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
    currency: "KWD",
    description: "",
    expiryDate: ""
  });

  // Load saved links on component mount
  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem('paymentLinks') || '[]');
    setPaymentLinks(savedLinks);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLink: PaymentLink = {
      id: generatePaymentLink(),
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      description: formData.description,
      expiryDate: formData.expiryDate,
      createdAt: new Date().toISOString()
    };

    const updatedLinks = [newLink, ...paymentLinks];
    setPaymentLinks(updatedLinks);
    
    // Save to localStorage for persistence
    localStorage.setItem('paymentLinks', JSON.stringify(updatedLinks));
    
    setFormData({
      customerName: "",
      amount: "",
      currency: "KWD",
      description: "",
      expiryDate: ""
    });

    toast({
      title: "Payment Link Created",
      description: "Successfully generated new payment link",
    });
  };

  const getFullUrl = (link: PaymentLink) => {
    const baseUrl = `${window.location.origin}/pay/${link.id}`;
    const params = new URLSearchParams();
    params.append('n', link.customerName);
    params.append('a', link.amount.toFixed(3));
    params.append('p', link.description);
    params.append('c', link.currency);
    return `${baseUrl}?${params.toString()}`;
  };

  const copyToClipboard = (link: PaymentLink) => {
    const url = getFullUrl(link);
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Payment link copied to clipboard",
    });
  };

  const previewLink = (link: PaymentLink) => {
    const url = getFullUrl(link);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">KNET Payment Simulator</h1>
          <p className="text-blue-600">Global Payment Links - Create and manage payment links for any country</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Link Generator */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Plus className="h-5 w-5" />
                Create Payment Link
              </CardTitle>
              <CardDescription>Generate a new payment link for customers worldwide</CardDescription>
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount *</Label>
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
                    <Label htmlFor="currency">Currency *</Label>
                    <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KWD">KWD - Kuwait Dinar</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                        <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                        <SelectItem value="QAR">QAR - Qatar Riyal</SelectItem>
                        <SelectItem value="BHD">BHD - Bahrain Dinar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                          <p className="text-sm text-gray-600">{link.currency} {link.amount.toFixed(3)}</p>
                          {link.description && (
                            <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(link)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => previewLink(link)}
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
