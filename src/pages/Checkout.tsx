
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { paymentOptions, getPaymentIconByMethod } from '@/data/payments';
import { PaymentMethod } from '@/types';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('paypal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    notes: ''
  });
  
  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">Add some items to your cart before proceeding to checkout.</p>
            <Button asChild>
              <Link to="/">Back to Shop</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    // For now, we'll just simulate a successful order
    alert(`Order placed successfully! Payment method: ${selectedPayment}`);
    clearCart();
    navigate('/order-confirmation');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <Link to="/cart" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                
                <div className="mb-4">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <RadioGroup value={selectedPayment} onValueChange={(value) => setSelectedPayment(value as PaymentMethod)}>
                  {paymentOptions.map((option) => (
                    <div 
                      key={option.id}
                      className={`flex items-center p-4 border rounded-lg mb-3 ${
                        selectedPayment === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="mr-3" />
                      <div className="flex items-center flex-grow">
                        {option.id === 'paypal' || option.id === 'payoneer' ? (
                          <img src={option.icon} alt={option.name} className="h-8 mr-3" />
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            {option.id === 'bank' && <span className="text-lg">🏦</span>}
                            {option.id === 'delivery' && <span className="text-lg">🚚</span>}
                            {option.id === 'mukuru' && <span className="text-lg">💳</span>}
                          </div>
                        )}
                        <div>
                          <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      {selectedPayment === option.id && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
                <Textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions for delivery or additional information"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-3 flex justify-between">
                      <div>
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-gray-500 block text-sm">Qty: {item.quantity}</span>
                      </div>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
                </div>
                
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  Complete Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
