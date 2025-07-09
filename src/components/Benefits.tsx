import React, { useEffect, useRef } from 'react';
import { Award, Ban as Bank, Clock, Shield, ThumbsUp, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: 'Tratamos con personas',
    description: 'En SYA Motor no eres una matrícula más'
  },
  {
    icon: ThumbsUp,
    title: 'Bono regalo 600€',
    description: 'Para el mantenimiento del taller'
  },
  {
    icon: Truck,
    title: 'Todos los coches revisados',
    description: 'En nuestro taller propio en Valencia'
  },
  {
    icon: Bank,
    title: 'Prueba el coche que te gusta',
    description: 'Te dejamos probar el coche sin compromiso'
  },
  {
    icon: Shield,
    title: 'Revisión oficial',
    description: 'Todos nuestros coches con garantía total'
  },
  {
    icon: Clock,
    title: 'En Valencia con taller propio',
    description: 'Muy cerca de ti para atenderte personalmente'
  }
];

export default function Benefits() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on card index for sequential animation
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 200); // 200ms delay between each card
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <style>
        {`
          .benefit-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .benefit-card.animate-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        SOLO este mes regalo un bono de 600€ para mantenimiento de taller
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="benefit-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
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