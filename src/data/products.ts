
import { Product } from '@/types';

// Sample product data
export const products: Product[] = [
  // Physical Products
  {
    id: 'p1',
    name: 'Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation technology and long battery life.',
    price: 10.00,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Electronics',
    featured: true
  },
  {
    id: 'p2',
    name: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and more with this stylish smart watch.',
    price: 15.00,
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Electronics'
  },
  {
    id: 'p3',
    name: 'CCTV Security System (Fix and Supply)',
    description: 'We Supply Install and maintain CCTV and Security Systems, Gate Automations, Biometric Access Control and many more.',
    price: 549.99,
    type: 'physical',
    image: 'https://www.istockphoto.com/photo/collection-of-different-control-recording-and-inspection-electronic-cameras-gm2190614774-608983037?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcctv-systems&utm_medium=affiliate&utm_source=unsplash&utm_term=cctv+systems%3A%3A%3A',
    category: 'Electronics'
  },
  {
    id: 'p4',
    name: 'Smart Phones',
    description: 'Smart Phones comes with varieties from Samsung, Iphone, Redmi, Google Pixel, Huawei, and many more with variety price ranges.',
    price: 120.00,
    type: 'physical',
    image: 'https://unsplash.com/photos/a-group-of-cell-phones-sitting-on-top-of-a-table-NvM9V3mLrKs',
    category: 'Electronics'
  },
  
  // Digital Products
  {
    id: 'd1',
    name: 'Health and Wellness E-books',
    description: 'Best Health and Wellness E-books with a step to step how to outlines on various aspects of your health and well-being.',
    price: 11.99,
    type: 'digital',
    image: 'https://unsplash.com/photos/a-stack-of-books-sitting-on-top-of-each-other-kEMS85714ec',
    category: 'E-Books',
    featured: true
  },
  {
    id: 'd2',
    name: 'Business Plan Template',
    description: 'Comprehensive business plan template with financial projections and market analysis.',
    price: 29.99,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Business'
  },
  {
    id: 'd3',
    name: 'E-book: Marketing Strategies',
    description: 'Learn effective marketing strategies for small businesses in this comprehensive e-book.',
    price: 14.99,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'E-books'
  },
  {
    id: 'd4',
    name: 'Stock Video Collection',
    description: 'High-quality stock video clips for your next creative project.',
    price: 39.99,
    type: 'digital',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Media'
  },
  
  // Services
  {
    id: 's1',
    name: 'Website Design',
    description: 'Professional website design service customized to your business needs.',
    price: 399.99,
    type: 'service',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Web Development',
    featured: true
  },
  {
    id: 's2',
    name: 'Social Media Management',
    description: 'Monthly social media management service including content creation and analytics.',
    price: 199.99,
    type: 'service',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Marketing'
  },
  {
    id: 's3',
    name: 'Logo Design',
    description: 'Custom logo design with unlimited revisions until you are satisfied.',
    price: 49.99,
    type: 'service',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Graphic Design'
  },
  {
    id: 's4',
    name: 'SEO Audit',
    description: 'Comprehensive SEO audit of your website with actionable recommendations.',
    price: 199.99,
    type: 'service',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Marketing'
  },
  
  // Appointments
  {
    id: 'a1',
    name: 'Business Consultation',
    description: '1-hour business consultation to help you grow your business.',
    price: 149.99,
    type: 'appointment',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Consulting',
    featured: true
  },
  {
    id: 'a2',
    name: 'Fitness Training Session',
    description: 'Personalized 60-minute fitness training session with a certified trainer.',
    price: 89.99,
    type: 'appointment',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Fitness'
  },
  {
    id: 'a3',
    name: 'Career Coaching',
    description: '90-minute career coaching session to help you achieve your professional goals.',
    price: 129.99,
    type: 'appointment',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Coaching'
  },
  {
    id: 'a4',
    name: 'Photography Session',
    description: '2-hour photography session at the location of your choice.',
    price: 249.99,
    type: 'appointment',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Photography'
  }
];

// Function to get products by type
export const getProductsByType = (type: 'physical' | 'digital' | 'service' | 'appointment') => {
  return products.filter(product => product.type === type);
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Function to get product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Function to get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};
