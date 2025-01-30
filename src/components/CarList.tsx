import React, { useState } from 'react';
import { Fuel, Calendar, Activity, Cog, X, ChevronLeft, ChevronRight } from 'lucide-react';

const filters = {
  type: ['Todos', 'Nuevo', 'Ocasión', 'KM0'],
  fuel: ['Todos', 'Gasolina', 'Híbrido', 'Diésel', 'Eléctrico'],
  transmission: ['Todos', 'Manual', 'Automática'],
  price: ['Todos', '0-10000', '10000-15000', '15000-20000', '20000+'],
  year: ['Todos', '2018', '2019', '2020', '2021', '2022'],
  kilometers: ['Todos', '0-25000', '25000-50000', '50000-75000', '75000+']
};

const cars = [
  {
    id: '1',
    title: 'Fiat 500',
    priceFinanced: 8720,
    price: 10490,
    year: 2022,
    kilometers: 44279,
    fuel: 'Híbrido (Gasolina)',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
    url: 'https://syamotor.es/coches/fiat-500-hibrido-2022'
  },
  {
    id: '20',
    title: 'Peugeot 3008',
    priceFinanced: 22990,
    price: 24990,
    year: 2019,
    kilometers: 64000,
    fuel: 'Diésel',
    transmission: 'Automática',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
    url: 'https://syamotor.es/coches/peugeot-3008-2019'
  }
];

interface GalleryModalProps {
  images: string[];
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Car view ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CarList() {
  const [activeFilters, setActiveFilters] = useState({
    type: 'Todos',
    fuel: 'Todos',
    transmission: 'Todos',
    price: 'Todos',
    year: 'Todos',
    kilometers: 'Todos'
  });

  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);

  const getCarGallery = (car: any) => {
    return [
      car.image,
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1024&q=80',
      'https://images.unsplash.com/photo-1543796076-c4a574cc4b1d?auto=format&fit=crop&w=1024&q=80',
      'https://images.unsplash.com/photo-1543796076-c4a574cc4b1d?auto=format&fit=crop&w=1024&q=80'
    ];
  };

  const getFilteredCars = () => {
    return cars.filter(car => {
      if (activeFilters.fuel !== 'Todos' && !car.fuel.includes(activeFilters.fuel)) {
        return false;
      }
      
      if (activeFilters.transmission !== 'Todos' && car.transmission !== activeFilters.transmission) {
        return false;
      }

      if (activeFilters.year !== 'Todos' && car.year.toString() !== activeFilters.year) {
        return false;
      }

      if (activeFilters.price !== 'Todos') {
        const [min, max] = activeFilters.price.split('-').map(Number);
        if (max) {
          return car.price >= min && car.price < max;
        } else {
          return car.price >= min;
        }
      }

      if (activeFilters.kilometers !== 'Todos') {
        const [min, max] = activeFilters.kilometers.split('-').map(Number);
        if (max) {
          return car.kilometers >= min && car.kilometers < max;
        } else {
          return car.kilometers >= min;
        }
      }
      
      return true;
    });
  };

  const getFilterCount = (filterType: string, value: string) => {
    if (value === 'Todos') return cars.length;
    
    return cars.filter(car => {
      if (filterType === 'fuel') return car.fuel.includes(value);
      if (filterType === 'transmission') return car.transmission === value;
      if (filterType === 'year') return car.year.toString() === value;
      if (filterType === 'price') {
        const [min, max] = value.split('-').map(Number);
        if (max) return car.price >= min && car.price < max;
        return car.price >= min;
      }
      if (filterType === 'kilometers') {
        const [min, max] = value.split('-').map(Number);
        if (max) return car.kilometers >= min && car.kilometers < max;
        return car.kilometers >= min;
      }
      return true;
    }).length;
  };

  const filteredCars = getFilteredCars();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Encuentra tu coche ideal
        </h2>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(filters).map(([key, values]) => (
            <div key={key} className="relative">
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#66D1FF] focus:border-[#66D1FF]"
                value={activeFilters[key as keyof typeof activeFilters]}
                onChange={(e) => setActiveFilters(prev => ({
                  ...prev,
                  [key]: e.target.value
                }))}
              >
                {values.map(value => (
                  <option key={value} value={value}>
                    {value} ({getFilterCount(key, value)})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div 
                className="relative w-full h-48 cursor-pointer group"
                onClick={() => setSelectedGallery(getCarGallery(car))}
              >
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm font-medium">Ver galería</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-2xl font-bold text-[#66D1FF]">
                    Desde {car.priceFinanced.toLocaleString('es-ES')}€
                  </p>
                  <p className="text-sm text-gray-600">
                    Precio al contado: {car.price.toLocaleString('es-ES')}€
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.kilometers.toLocaleString('es-ES')} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cog className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.transmission}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={car.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-800 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Ver detalles
                  </a>
                  <button className="flex-1 bg-[#66D1FF] text-white py-3 rounded-lg hover:bg-[#3BA3DB] transition-colors">
                    Solicitar info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGallery && (
        <GalleryModal
          images={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      )}
    </section>
  );
}