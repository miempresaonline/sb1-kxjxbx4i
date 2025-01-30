import React from 'react';
import { Award, Ban as Bank, Clock, Shield, ThumbsUp, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: 'Ayudas DANA hasta 10.000€',
    description: 'Gestión completa de todas las ayudas disponibles'
  },
  {
    icon: ThumbsUp,
    title: 'Plan Reinicia Auto+',
    description: 'Concesionario adherido al plan del Gobierno'
  },
  {
    icon: Truck,
    title: 'Entrega inmediata',
    description: 'Disponibilidad garantizada de vehículos'
  },
  {
    icon: Bank,
    title: 'Financiación flexible',
    description: 'Opciones adaptadas a tus necesidades'
  },
  {
    icon: Shield,
    title: 'Garantía 24 meses',
    description: 'Todos nuestros coches con garantía total'
  },
  {
    icon: Clock,
    title: 'Atención inmediata',
    description: 'Respuesta y gestión en 24 horas'
  }
];

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Ventajas exclusivas para afectados por la DANA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#66D1FF]/10 p-3 rounded-lg">
                  <benefit.icon className="w-6 h-6 text-[#66D1FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}