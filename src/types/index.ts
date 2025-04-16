
// Product Types
export type ProductType = 'physical' | 'digital' | 'service' | 'appointment';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  image: string;
  category: string;
  featured?: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Payment Method Types
export type PaymentMethod = 'paypal' | 'payoneer' | 'bank' | 'delivery' | 'mukuru';

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: string;
  description: string;
}
