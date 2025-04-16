
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Calendar, FileText, Briefcase, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const getTypeIcon = () => {
    switch (product.type) {
      case 'physical':
        return <ShoppingCart className="h-5 w-5 mr-2" />;
      case 'digital':
        return <FileText className="h-5 w-5 mr-2" />;
      case 'service':
        return <Briefcase className="h-5 w-5 mr-2" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 mr-2" />;
      default:
        return null;
    }
  };
  
  const getTypeBadgeColor = () => {
    switch (product.type) {
      case 'physical':
        return 'bg-blue-100 text-blue-800';
      case 'digital':
        return 'bg-green-100 text-green-800';
      case 'service':
        return 'bg-purple-100 text-purple-800';
      case 'appointment':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const handleBuyNow = () => {
    addItem(product, quantity);
    window.location.href = '/cart';
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <Badge className={`${getTypeBadgeColor()} mb-4 flex items-center w-fit`} variant="outline">
              {getTypeIcon()}
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </Badge>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <p className="text-2xl font-semibold text-blue-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <p className="text-gray-600">{product.category}</p>
            </div>
            
            {/* Quantity Selector - only for physical and digital products */}
            {(product.type === 'physical' || product.type === 'digital') && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 mx-2 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
