// HeroSection.tsx
import React from 'react';
import { Shield, Truck, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-green-800  text-white py-12">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Rare & Specialty Medicines
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Access hard-to-find medications with verified prescriptions and expert guidance
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5" />
              <span>Verified Medicines</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Truck className="h-5 w-5" />
              <span>Cold Chain Delivery</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;