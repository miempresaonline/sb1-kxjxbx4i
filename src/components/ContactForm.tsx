import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    carModel: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Form submitted:', formState);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            ¿Interesado en algún vehículo?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Déjanos tus datos y te contactaremos para informarte sobre las ayudas DANA disponibles
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#66D1FF] focus:border-[#66D1FF]"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({...prev, name: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#66D1FF] focus:border-[#66D1FF]"
                  value={formState.phone}
                  onChange={(e) => setFormState(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#66D1FF] focus:border-[#66D1FF]"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo de interés
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#66D1FF] focus:border-[#66D1FF]"
                  value={formState.carModel}
                  onChange={(e) => setFormState(prev => ({...prev, carModel: e.target.value}))}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#66D1FF] focus:border-[#66D1FF]"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({...prev, message: e.target.value}))}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-[#66D1FF] text-white py-4 rounded-lg hover:bg-[#3BA3DB] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}