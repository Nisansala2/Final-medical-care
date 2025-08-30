// Footer.tsx
import React from 'react';
import { Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="text-xl font-bold">MediRare</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in accessing rare and specialty medicines with verified prescriptions and expert care.
            </p>
            <div className="flex space-x-4">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">+91 1800-123-4567</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:text-white">Prescription Upload</a></li>
              <li><a href="#" className="hover:text-white">Track Order</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Rare Diseases</a></li>
              <li><a href="#" className="hover:text-white">Oncology</a></li>
              <li><a href="#" className="hover:text-white">Orphan Drugs</a></li>
              <li><a href="#" className="hover:text-white">Gene Therapy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MediRare. All rights reserved. Licensed pharmacy with regulatory compliance.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;