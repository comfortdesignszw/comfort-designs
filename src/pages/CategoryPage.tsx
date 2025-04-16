
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByType } from '@/data/products';
import { Product, ProductType } from '@/types';

const getCategoryTitle = (type: ProductType): string => {
  switch (type) {
    case 'physical':
      return 'Physical Products';
    case 'digital':
      return 'Digital Products';
    case 'service':
      return 'Services';
    case 'appointment':
      return 'Appointments';
    default:
      return 'Products';
  }
};

const getCategoryDescription = (type: ProductType): string => {
  switch (type) {
    case 'physical':
      return 'Browse our collection of high-quality physical products.';
    case 'digital':
      return 'Instant downloads for software, e-books, and digital media.';
    case 'service':
      return 'Professional services to help with your business and personal needs.';
    case 'appointment':
      return 'Book sessions with experts and professionals in various fields.';
    default:
      return 'Explore our products and services.';
  }
};

const CategoryPage = () => {
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (type && ['physical', 'digital', 'service', 'appointment'].includes(type)) {
      const categoryProducts = getProductsByType(type as ProductType);
      setProducts(categoryProducts);
    }
  }, [type]);
  
  if (!type || !['physical', 'digital', 'service', 'appointment'].includes(type)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="mb-6">The category you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-500 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const categoryTitle = getCategoryTitle(type as ProductType);
  const categoryDescription = getCategoryDescription(type as ProductType);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{categoryDescription}</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-gray-600">
              There are currently no products available in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
