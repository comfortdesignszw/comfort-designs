
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const OrderConfirmation = () => {
  // Generate random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const { items } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasDigitalProducts, setHasDigitalProducts] = useState(false);
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Check if there are any digital products in the cart
    const digitalProducts = items.filter(item => item.product.type === 'digital');
    setHasDigitalProducts(digitalProducts.length > 0);
    
    // If cart is empty, redirect to home
    if (items.length === 0) {
      toast({
        title: "No order found",
        description: "You haven't completed a checkout. Redirecting to home page.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [items, navigate, toast]);
  
  const handleDownload = (product) => {
    if (product.downloadUrl) {
      // In a real application, this might involve more complex logic like
      // generating a temporary download link or checking order status
      window.open(product.downloadUrl, '_blank');
      
      toast({
        title: "Download started",
        description: `Your download for ${product.name} has started.`,
      });
    } else {
      toast({
        title: "Download unavailable",
        description: "The download link for this product is not available.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-3">Thank You for Your Order!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-2">Order Details</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Digital Products Download Section */}
          {hasDigitalProducts && (
            <div className="border border-blue-100 bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4 text-blue-800">Your Digital Products</h2>
              <div className="space-y-4">
                {items
                  .filter(item => item.product.type === 'digital')
                  .map(item => (
                    <div key={item.product.id} className="flex justify-between items-center bg-white p-3 rounded border border-blue-200">
                      <div className="text-left">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <Button 
                        onClick={() => handleDownload(item.product)}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))
                }
              </div>
              <p className="text-sm text-blue-600 mt-4">
                These downloads will be available for 30 days. Please save them to your device.
              </p>
            </div>
          )}
          
          <p className="mb-8 text-gray-600">
            We've sent a confirmation email with all the details of your order.<br />
            If you have any questions, please contact our customer support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/orders">View My Orders</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
