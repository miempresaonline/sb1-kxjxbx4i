import React, { useRef } from 'react';
import Header from './components/Header';
import Benefits from './components/Benefits';
import DualVideoSection from './components/DualVideoSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCarModel, setSelectedCarModel] = React.useState<string>('');

  const scrollToForm = (carModel: string) => {
    setSelectedCarModel(carModel);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Benefits />
      <ContactForm ref={formRef} initialCarModel={selectedCarModel} />
      <DualVideoSection />
     
      
      <Footer />
    </div>
  );
}

export default App;