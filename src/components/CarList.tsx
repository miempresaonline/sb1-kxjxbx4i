import React, { useState } from 'react';
import { Fuel, Calendar, Gauge, Cog, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface CarListProps {
  onRequestInfo: (carModel: string) => void;
}

const filters = {
  type: ['Todos', 'Nuevo', 'Ocasión', 'KM0'],
  fuel: ['Todos', 'Gasolina', 'Híbrido', 'Diésel', 'Eléctrico'],
  transmission: ['Todos', 'Manual', 'Automática'],
  price: ['Todos', '0-10000', '10000-15000', '15000-20000', '20000+'],
  year: ['Todos', '2018', '2019', '2020', '2021', '2022'],
  
};

const cars = [
  {
    "id": "1",
    "title": "Fiat 500 Dolcevita 1.0 Hybrid 51KW (70 CV)",
    "priceFinanced": 8720,
    "price": 10490,
    "year": 2022,
    "kilometers": 44279,
    "fuel": "Híbrido (Gasolina)",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2108096/065fdfdf-4b12-4b60-9e9c-7a551b823138_original.jpg",
      "https://imgs.inventario.pro/coche/2094/2108096/c5a1a4ea-ddd1-4c10-b083-31d9c0f3801d_original.jpg",
      "https://imgs.inventario.pro/coche/2094/2108096/41080833-f078-4416-9431-4a628c3e1bfb_original.jpg"
    ]
  },
  {
    "id": "2",
    "title": "Opel Corsa 1.2T XHL 74kW (100CV) Edition",
    "priceFinanced": 11470,
    "price": 13490,
    "year": 2021,
    "kilometers": 49946,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1955245/7ebc495e-819d-4e16-853e-173591a8cfb6_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1955245/405b0eda-542c-468e-ade0-b97cd4b413b9_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1955245/1e887511-75a3-4678-b3fd-8e0943c226cb_large.jpg"
    ]
  },
  {
    "id": "2169953",
    "title": "Ford Focus 1.5 Ecoblue 88kW Trend+ SB",
    "priceFinanced": 10190,
    "price": 11990,
    "year": 2020,
    "kilometers": 152036,
    "fuel": "Diésel",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2169953/6f0471df-144b-4531-87e9-9d19d05f75db_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2169953/a7d65e26-3a02-408f-9e72-eff8f0b65182_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2169953/590de880-0978-40b2-8974-68cf8b20c3f6_large.jpg"
    ]
  },
  {
    "id": "2062808",
    "title": "Opel CrossLand 1.2 81kW (110CV) Edition",
    "priceFinanced": 10990,
    "price": 12990,
    "year": 2021,
    "kilometers": 55704,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2062808/6dab4d8c-c37b-410b-8a54-ff616fc7a751_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2062808/1de0f813-bfad-45f5-adf8-50c23c116dfa_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2062808/b4d05a6f-a0a9-4615-b30d-46e8849041f3_large.jpg"
    ]
  },
  {
    "id": "1955238",
    "title": "Ford Fiesta 1.1 Ti-VCT 63kW Trend 5p",
    "priceFinanced": 10990,
    "price": 12990,
    "year": 2018,
    "kilometers": 57985,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1955238/4ac52da0-94de-453a-bb53-2dccde6dd4f2_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1955238/e2085fb8-9997-44e3-b1ff-f7a73a594b82_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1955238/36e0b6e2-a539-4ea6-b054-511be20f481b_large.jpg"
    ]
  },
  {
    "id": "1967813",
    "title": "Renault Megane Business Tce GPF 85 kW (115CV)",
    "priceFinanced": 11470,
    "price": 13490,
    "year": 2019,
    "kilometers": 80105,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1967813/32c9d460-8da5-49b5-835b-410f9e2a004d_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1967813/e3fa7600-e215-4a2d-9b76-54e17da5ad5b_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1967813/546b2cd9-9242-40db-b352-8b8935b7aaa2_large.jpg"
    ]
  },
  {
    "id": "1967794",
    "title": "Opel Insignia GS 1.5 Turbo XFL Selective",
    "priceFinanced": 12320,
    "price": 14490,
    "year": 2020,
    "kilometers": 152498,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1967794/50a3eebd-dc05-4462-aa09-50ddfdcb4666_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1967794/f2c37991-97b2-4406-94bf-6ebbf66aed81_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1967794/2b851bf0-4407-4b77-bef7-b38a35b38c78_original.jpg"
    ]
  },
  {
    "id": "1955236",
    "title": "Peugeot 308 5p GT Line 1.2 PureTech 96KW (130CV)",
    "priceFinanced": 12320,
    "price": 14490,
    "year": 2019,
    "kilometers": 45696,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1955236/6b80b337-96bf-479a-9c94-a7f1405b73f8_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1955236/df356670-bfb9-42e5-bc97-9070a57324d4_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1955236/0b73b9e4-0e38-4293-b8d7-1aa781426c47_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1955236/914649de-0686-492e-9ab9-5fbe6ca9d021_original.jpg"
    ]
  },
  {
    "id": "1967810",
    "title": "Ford Fiesta 1.1 Ti-VCT 63kW Trend 5p",
    "priceFinanced": 10990,
    "price": 12990,
    "year": 2018,
    "kilometers": 88610,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1967810/4f08b19b-daf7-452e-8b3c-589945236937_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1967810/98185cf5-427e-4408-b247-f6e3fa29008f_original.jpg",
      "https://imgs.inventario.pro/coche/2094/1967810/132a28cd-845c-484b-9c8f-fb9b75c890bf_original.jpg"
    ]
  },
  {
    "id": "2214499",
    "title": "DS Automobiles DS 3 BlueHDi 73 kW Manual CONNECTED CHIC",
    "priceFinanced": 12320,
    "price": 14490,
    "year": 2020,
    "kilometers": 95574,
    "fuel": "Diésel",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2214499/371d8f02-e43a-4136-9e13-d1ab22cbda36_original.jpg",
      "https://imgs.inventario.pro/coche/2094/2214499/59dc501f-84de-4b13-90e0-8baa5a6d7a5e_original.jpg",
      "https://imgs.inventario.pro/coche/2094/2214499/bc6bd01a-eed0-42fc-8dec-ec26f822f92e_original.jpg"
    ]
  },
  {
    "id": "2010768",
    "title": "Seat Leon 1.6 TDI 115CV Style",
    "priceFinanced": 11790,
    "price": 13790,
    "year": 2019,
    "kilometers": 96278,
    "fuel": "Diésel",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2010768/595dbaf8-3d91-4c5a-b64b-51235b44c2ea_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2010768/a31620fa-b449-4819-94f3-1b87de62398a_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2010768/3dc83c76-2ed1-48fd-80a0-a84658d6b227_large.jpg"
    ]
  },
  {
    "id": "1923535",
    "title": "Ford Fiesta 1.1 Ti-VCT 63kW Trend 5p",
    "priceFinanced": 10490,
    "price": 12490,
    "year": 2017,
    "kilometers": 78886,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1923535/96851092-b507-4747-b632-dd445ca4216e_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1923535/38042efe-86e9-4984-91ed-5c094ee84b3d_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1923535/024a8420-d01d-4f36-a144-fba0a7f29db8_large.jpg"
    ]
  },
  {
    "id": "1955253",
    "title": "Opel Grandland X 1.5 Turbo D 88kW (120CV) Selective",
    "priceFinanced": 14970,
    "price": 17490,
    "year": 2019,
    "kilometers": 86120,
    "fuel": "Diésel",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/1955253/08b58f8c-fa46-4100-a50e-9f198c26ee4e_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1955253/90a5d7a8-9870-45a4-b232-ed84f468d376_large.jpg",
      "https://imgs.inventario.pro/coche/2094/1955253/81aae8a3-97d2-46e5-b173-45a4e2613910_large.jpg"
    ]
  },
  {
    "id": "2187152",
    "title": "Nissan Juke DIG-T 84 kW (114 CV) 6M/T Acenta",
    "priceFinanced": 14020,
    "price": 16490,
    "year": 2021,
    "kilometers": 64100,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2187152/d965ff60-6667-4c6f-982e-ed3f3957e196_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2187152/4b743872-1e1d-4281-8f2d-41756ade3b9c_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2187152/4b5864c9-e316-4121-ae46-75785518a25e_large.jpg"
    ]
  },
  {
    "id": "2185464",
    "title": "Ford Puma 1.0 EcoBoost 125CV ST Line",
    "priceFinanced": 16990,
    "price": 19990,
    "year": 2020,
    "kilometers": 45552,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2185464/14856c38-a2f0-4102-8ae7-b5dd58b6af84_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2185464/be6e3712-ce2a-4f53-bd45-8217f4d6fe92_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2185464/a547751c-6808-4689-b8c7-aadc3e3b8869_large.jpg"
    ]
  },
  {
    "id": "2031320",
    "title": "MINI MINI ONE 5 Puertas",
    "priceFinanced": 15290,
    "price": 17990,
    "year": 2019,
    "kilometers": 63140,
    "fuel": "Gasolina",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2031320/e5255464-e408-44b5-9b1a-72b2e56906cb_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2031320/b43a15e4-1450-45b7-ac84-dc4db265aa27_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2031320/cf54307c-4f47-4e6d-84f0-13a3bcf12faf_large.jpg"
    ]
  },
  {
    "id": "2185470",
    "title": "Citroën C4 BlueHDi 130 S&S EAT8 Feel Pack",
    "priceFinanced": 14820,
    "price": 17790,
    "year": 2023,
    "kilometers": 38619,
    "fuel": "Diésel",
    "transmission": "Automático",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2185470/b1c98b00-bc20-42c5-a6d1-3491fcfccce0_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2185470/9093dee4-00ed-40e0-8962-e25c5c6ef726_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2185470/d2a90065-6d49-435e-884c-a4b44f72362e_large.jpg"
    ]
  },
  {
    "id": "2185456",
    "title": "Ford Puma 1.0 EcoBoost 125cv Titanium MHEV",
    "priceFinanced": 14140,
    "price": 16990,
    "year": 2023,
    "kilometers": 45552,
    "fuel": "Híbrido (Gasolina)",
    "transmission": "Manual",
    "images": [
      "https://imgs.inventario.pro/coche/2094/2185455/2f7efb75-0d24-4e5f-844f-0b2121d72ea8_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2185455/73e5f109-5121-4957-b625-8ca584115d36_large.jpg",
      "https://imgs.inventario.pro/coche/2094/2185455/aba0fb89-9bc4-4f6e-ac4f-6019c10bf25e_large.jpg"
    ]
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
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={images[currentIndex]}
            alt={`Car view ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm backdrop-blur-md">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CarList({ onRequestInfo }: CarListProps) {
  const [activeFilters, setActiveFilters] = useState({
    type: 'Todos',
    fuel: 'Todos',
    transmission: 'Todos',
    price: 'Todos',
    year: 'Todos',
    kilometers: 'Todos'
  });

  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);

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

  const selectClasses = "w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:border-[#66D1FF] focus:bg-white focus:ring-2 focus:ring-[#66D1FF]/20 transition-all duration-200 outline-none text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_20px_center] bg-no-repeat pr-12";

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB]">
          Encuentra tu coche ideal
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Te enseñamos unos cuantos pero tenemos muchos más, ven a visitarnos.
        </p>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(filters).map(([key, values]) => (
            <div key={key} className="relative group">
              <select
                className={selectClasses}
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
            <div key={car.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group">
              <div 
                className="relative w-full h-48 cursor-pointer overflow-hidden"
                onClick={() => setSelectedGallery(car.images)}
              >
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm font-medium px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
                    Ver galería ({car.images.length} fotos)
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 min-h-[56px]">{car.title}</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB]">
                    Desde {car.priceFinanced.toLocaleString('es-ES')}€
                  </p>
                  <p className="text-sm text-gray-500">
                    Precio al contado: {car.price.toLocaleString('es-ES')}€
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Gauge className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.kilometers.toLocaleString('es-ES')} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Fuel className="w-5 h-5 text-[#66D1FF]" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Cog className="w-5  h-5 text-[#66D1FF]" />
                    <span>{car.transmission}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a 
                    href={`https://wa.me/34960320009?text=Hola, me interesa el ${encodeURIComponent(car.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#20BD5C] transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#25D366]/20 transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <button 
                    onClick={() => onRequestInfo(car.title)}
                    className="flex-1 bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB] text-white py-3 rounded-xl hover:from-[#3BA3DB] hover:to-[#66D1FF] transition-all duration-300 font-medium shadow-lg shadow-[#66D1FF]/20 transform hover:scale-[1.02]"
                  >
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