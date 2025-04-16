
import { PaymentOption } from '@/types';
import { CreditCard, Landmark, Truck, Wallet } from 'lucide-react';

export const paymentOptions: PaymentOption[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png',
    description: 'Pay securely with your PayPal account.'
  },
  {
    id: 'payoneer',
    name: 'Payoneer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Payoneer-logo.png',
    description: 'Make global payments with Payoneer.'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: 'bank',
    description: 'Make a direct bank transfer to our account.'
  },
  {
    id: 'delivery',
    name: 'Pay on Delivery',
    icon: 'truck',
    description: 'Pay with cash when your order is delivered.'
  },
  {
    id: 'mukuru',
    name: 'Mukuru Pay',
    icon: 'wallet',
    description: 'Pay using Mukuru payment service.'
  }
];

export const getPaymentIconByMethod = (method: string) => {
  switch (method) {
    case 'bank':
      return 'bank';
    case 'delivery':
      return 'truck';
    case 'mukuru':
      return 'wallet';
    default:
      return 'credit-card';
  }
};
