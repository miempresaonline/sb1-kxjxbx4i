import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-[#66D1FF]">SYA</span>motor
            </h3>
            <p className="text-gray-400">
              Tu concesionario de confianza en Valencia, comprometido con la recuperación tras la DANA.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#66D1FF]" />
                <a href="tel:+34900000000" className="hover:text-[#66D1FF] transition-colors">
                  900 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#66D1FF]" />
                <a href="mailto:info@syamotor.es" className="hover:text-[#66D1FF] transition-colors">
                  info@syamotor.es
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#66D1FF]" />
                <span>Av. Principal, 123, Valencia</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lunes a Viernes: 9:00 - 20:00</li>
              <li>Sábados: 10:00 - 14:00</li>
              <li>Domingos: Cerrado</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              {/* Aquí irían los iconos de redes sociales */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Syamotor. Todos los derechos reservados.</p>
        </div>
      </div>
      
      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/34900000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BD5C] transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  );
}