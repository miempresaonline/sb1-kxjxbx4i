import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function VideoBackgroundSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Extract video ID from YouTube URL
  const videoId = 'dlhjN3BLAcA';

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <iframe
          className="w-full h-full scale-150"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0&showinfo=0&modestbranding=1`}
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ 
            pointerEvents: 'none',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover'
          }}
        ></iframe>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <h2 
            className={`text-6xl md:text-8xl font-black text-white mb-6
              transition-all duration-1000 transform
              ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-20 scale-90'}
              [text-shadow:_0_4px_16px_rgb(0_0_0_/_50%)]
              bg-clip-text text-transparent bg-gradient-to-r from-white via-[#66D1FF] to-white
              animate-gradient-x`}
            style={{
              WebkitBackgroundClip: 'text',
              backgroundSize: '200% auto',
            }}
          >
            SYAMOTOR
          </h2>
          
          <div 
            className={`overflow-hidden mb-8
              transition-all duration-1000 delay-300
              ${isVisible ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}
          >
            <p className="text-2xl md:text-4xl font-light text-white/90 leading-relaxed
              [text-shadow:_0_2px_8px_rgb(0_0_0_/_30%)]">
              Tu futuro comienza al volante
            </p>
          </div>

          <div 
            className={`space-y-4 transition-all duration-1000 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p className="text-xl text-[#66D1FF] font-medium
              [text-shadow:_0_2px_4px_rgb(0_0_0_/_20%)]">
              Descubre nuestra selección de vehículos
            </p>
            
            <div className="animate-bounce mt-8">
              <ChevronDown className="w-8 h-8 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#66D1FF] to-transparent opacity-50"></div>
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-[#66D1FF] to-transparent opacity-50"></div>
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-[#66D1FF] to-transparent opacity-50"></div>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#66D1FF] to-transparent opacity-50"></div>
      </div>
    </section>
  );
}