
import { Link } from 'react-router-dom';
import { ShoppingCart, Calendar, FileText, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  // Icon based on product type
  const getTypeIcon = () => {
    switch (product.type) {
      case 'physical':
        return <ShoppingCart className="h-4 w-4 mr-1" />;
      case 'digital':
        return <FileText className="h-4 w-4 mr-1" />;
      case 'service':
        return <Briefcase className="h-4 w-4 mr-1" />;
      case 'appointment':
        return <Calendar className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Get the badge color based on product type
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <Badge className={`${getTypeBadgeColor()} flex items-center`} variant="outline">
              {getTypeIcon()}
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
            <span className="font-semibold text-blue-600">${product.price.toFixed(2)}</span>
          </div>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{product.category}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
