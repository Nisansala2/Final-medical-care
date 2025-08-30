// ServicesSection.tsx
import React from 'react';
import { Shield, Truck, Clock } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Choose MediRare?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Verified & Authentic</h3>
            <p className="text-gray-600">All medicines are sourced from licensed manufacturers and verified for authenticity.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Cold Chain Delivery</h3>
            <p className="text-gray-600">Temperature-controlled delivery ensures medicine efficacy and safety.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">24/7 Expert Support</h3>
            <p className="text-gray-600">Our pharmacists and medical experts are available round the clock for guidance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;