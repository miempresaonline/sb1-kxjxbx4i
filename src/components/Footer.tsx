import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

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
                <a href="tel:+34960320009" className="hover:text-[#66D1FF] transition-colors">
                  96 032 0009
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#66D1FF]" />
                <a href="mailto:solicitudweb@syamotor.es" className="hover:text-[#66D1FF] transition-colors">
                  solicitudweb@syamotor.es
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#66D1FF]" />
                <span>Camino de la Cebolla nº 1 46138 Rafelbuñol</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lunes a Viernes:</li>
              <li>Mañanas: 9:00 - 14:00</li>
              <li>Tardes: 15:30 - 20:00 </li>
              
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/SYAmotorFord/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] p-2 rounded-lg hover:bg-[#1877F2]/80 transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/syamotorford/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E4405F] p-2 rounded-lg hover:bg-[#E4405F]/80 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Syamotor. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}