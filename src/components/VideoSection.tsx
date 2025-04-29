import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoSection() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 bg-gradient-to-br from-[#66D1FF] to-[#3BA3DB] overflow-hidden transform transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Descubre la experiencia SYAmotor
          </h2>
          
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  onClick={handlePlayClick}
                  className="bg-white/90 hover:bg-white text-[#66D1FF] w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Play className="w-10 h-10 ml-1" />
                </button>
              </div>
            ) : null}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/dlhjN3BLAcA${isPlaying ? '?autoplay=1' : ''}`}
              title="SYAmotor Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              En SYAmotor nos comprometemos a ofrecerte la mejor experiencia en la compra de tu vehículo, 
              con un servicio personalizado y las mejores condiciones del mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}