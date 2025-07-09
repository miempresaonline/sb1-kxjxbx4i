import React, { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';

interface VideoModalProps {
  videoId: string;
  isShort: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, isShort, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Use the correct embed URL format for Shorts
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1`;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className={`relative w-full ${isShort ? 'max-w-[400px]' : 'max-w-4xl'} mx-auto`}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className={`relative ${isShort ? 'aspect-[9/16]' : 'aspect-video'} bg-black rounded-2xl overflow-hidden shadow-2xl`}>
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const CarBackground = () => {
  const carRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (carRef.current) {
        const scrollPosition = window.scrollY;
        const section = carRef.current.closest('section');
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        const relativeScroll = scrollPosition + windowHeight - sectionTop;
        const scrollPercentage = Math.max(0, Math.min(1, relativeScroll / (sectionHeight + windowHeight)));

        const translateX = 100 - (scrollPercentage * 200);
        carRef.current.style.transform = `translateX(${translateX}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={carRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] opacity-20 pointer-events-none transition-transform will-change-transform mix-blend-multiply"
      style={{ transform: 'translateX(100%)' }}
    >
      <img 
        src="https://www.miempresa.online/wp-content/uploads/2025/02/cochesya.png" 
        alt="Car silhouette"
        className="w-full h-auto"
      />
    </div>
  );
};

interface Video {
  url: string;
  thumbnailId: string;
  title: string;
  description: string;
  isShort: boolean;
}

const videos: Video[] = [
  {
    url: "https://www.youtube.com/shorts/AIW2O8qL2G8",
    thumbnailId: "AIW2O8qL2G8",
    title: "TRATO PERSONALIZADO",
    description: "No eres una matricula más, eres una persona.",
    isShort: true
  },
  {
    url: "https://www.youtube.com/shorts/hNSRcApHA2A",
    thumbnailId: "hNSRcApHA2A",
    title: "TE LO DEJAMOS PROBAR",
    description: "Taller propio oficial y multimarca.",
    isShort: true
  },
  {
    url: "https://www.youtube.com/shorts/3HBhxTG3f9s",
    thumbnailId: "3HBhxTG3f9s",
    title: "VEHÍCULOS SELECCIONADOS",
    description: "Garantía como si fuera nuevo.",
    isShort: true
  },
  {
    url: "https://www.youtube.com/shorts/5ugf3V8sdpw",
    thumbnailId: "5ugf3V8sdpw",
    title: "COMO NUEVO",
    description: "Vehículos revisados y garantizados como su fuese nuevo",
    isShort: true
  }
];

export default function DualVideoSection() {
  const [activeVideo, setActiveVideo] = useState<{id: string; isShort: boolean} | null>(null);

  // Close modal when pressing ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [activeVideo]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  return (
    <section id="videos-section" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <CarBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB]">
          No eres una matrícula más
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Nuestro personal te asesora para encontrar el mejor vehículo para ti.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="relative group max-w-[300px] mx-auto w-full transform transition-all duration-300 hover:-translate-y-2"
            >
              <div 
                className={`${video.isShort ? 'aspect-[9/16]' : 'aspect-video'} bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group-hover:shadow-2xl transition-all duration-300`}
                onClick={() => setActiveVideo({ id: video.thumbnailId, isShort: video.isShort })}
              >
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.thumbnailId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="bg-white/90 group-hover:bg-white text-[#66D1FF] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
                  <p className="text-sm text-white/80">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          isShort={activeVideo.isShort}
          isOpen={true}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}