import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Comfort Designs</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for digital, physical products, services, and appointments.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/category/physical" className="text-gray-600 hover:text-blue-500">Physical Products</Link></li>
              <li><Link to="/category/digital" className="text-gray-600 hover:text-blue-500">Digital Products</Link></li>
              <li><Link to="/category/service" className="text-gray-600 hover:text-blue-500">Services</Link></li>
              <li><Link to="/category/appointment" className="text-gray-600 hover:text-blue-500">Appointments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-500">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-500">FAQ</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-blue-500">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-blue-500">Shipping</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>7 Elsley Road</li>
              <li>Queens Park West, Bulawayo</li>
              <li>Zimbabwe</li>
              <li>Email: comfort.designszw@gmail.com</li>
              <li>Phone: +263772824132</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Comfort Designs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
