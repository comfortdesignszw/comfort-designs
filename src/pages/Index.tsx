
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts, getProductsByType } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const recentPhysicalProducts = getProductsByType('physical').slice(0, 4);
  const recentDigitalProducts = getProductsByType('digital').slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop Everything in One Place</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            From physical products to digital downloads, services, and appointments - we've got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-500 hover:bg-gray-100">
              <Link to="/category/physical">Shop Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
              <Link to="/category/service">Browse Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Items</h2>
            <Link to="/featured" className="text-blue-500 hover:text-blue-700 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Showcase */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Physical Products Category */}
            <Link to="/category/physical" className="group">
              <div className="bg-blue-100 rounded-lg p-8 text-center hover:bg-blue-200 transition-colors h-full flex flex-col justify-center items-center">
                <div className="mb-4 bg-blue-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Physical Products</h3>
                <p className="text-blue-600">Shop our collection of quality physical products</p>
              </div>
            </Link>
            
            {/* Digital Products Category */}
            <Link to="/category/digital" className="group">
              <div className="bg-green-100 rounded-lg p-8 text-center hover:bg-green-200 transition-colors h-full flex flex-col justify-center items-center">
                <div className="mb-4 bg-green-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Digital Products</h3>
                <p className="text-green-600">Instant downloads for software, e-books, and more</p>
              </div>
            </Link>
            
            {/* Services Category */}
            <Link to="/category/service" className="group">
              <div className="bg-purple-100 rounded-lg p-8 text-center hover:bg-purple-200 transition-colors h-full flex flex-col justify-center items-center">
                <div className="mb-4 bg-purple-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Services</h3>
                <p className="text-purple-600">Professional services for your business and personal needs</p>
              </div>
            </Link>
            
            {/* Appointments Category */}
            <Link to="/category/appointment" className="group">
              <div className="bg-amber-100 rounded-lg p-8 text-center hover:bg-amber-200 transition-colors h-full flex flex-col justify-center items-center">
                <div className="mb-4 bg-amber-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">Appointments</h3>
                <p className="text-amber-600">Book sessions with experts and professionals</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Recent Physical Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Physical Products</h2>
            <Link to="/category/physical" className="text-blue-500 hover:text-blue-700 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPhysicalProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Digital Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Digital Products</h2>
            <Link to="/category/digital" className="text-blue-500 hover:text-blue-700 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentDigitalProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our full catalog of products and services to find exactly what you need.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/category/physical">Shop Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
