
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      <div className="w-full sm:w-20 h-20 mr-4 mb-4 sm:mb-0 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow mr-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
        </p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center mr-6">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleDecreaseQuantity}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="mx-3 w-6 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleIncreaseQuantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="text-right min-w-[80px]">
          <div className="font-semibold">${(product.price * quantity).toFixed(2)}</div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 px-1 mt-1"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
