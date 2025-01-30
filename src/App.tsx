import React from 'react';
import Header from './components/Header';
import Benefits from './components/Benefits';
import CarList from './components/CarList';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Benefits />
      <CarList />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;