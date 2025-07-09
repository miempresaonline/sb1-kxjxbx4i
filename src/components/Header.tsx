import React from 'react';
import { Car, PhoneCall } from 'lucide-react';

export default function Header() {
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB] text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="text-5xl font-bold tracking-tight">
            <span className="text-white">SYA MOTOR</span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
           Concesionario de Ocasión en Valencia
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Todos nuestros coches son GARANTIZADOS, REVISADOS Y CERTIFICADOS 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToForm}
              className="bg-white text-[#66D1FF] px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <Car className="w-5 h-5" />
              Ven y prueba tu coche sin compromiso
            </button>
            <a href="tel:960320009">
  <button className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
    <PhoneCall className="w-5 h-5" />
   Hasta 24 meses de garantía
  </button>
</a>
          </div>
        </div>
      </div>
    </header>
  );
}