import React, { useState, forwardRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  initialCarModel?: string;
}

const initialFormState = {
  name: '',
  phone: '',
  email: '',
  paymentMethod: '',
  carModel: '',
};

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    gtag?: (...args: any[]) => void;
  }
}

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/7l8xqfbqq5owxdhb7k1dl91mvwaiio3m';

const ContactForm = forwardRef<HTMLFormElement, ContactFormProps>(({ initialCarModel = '' }, ref) => {
  const [formState, setFormState] = useState({
    ...initialFormState,
    carModel: initialCarModel
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showThankYou, setShowThankYou] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=6LeKcd4qAAAAAGnyFHkAGxlbYV1SxOjuOT2Qi326`;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Update car model when prop changes
  useEffect(() => {
    if (initialCarModel) {
      setFormState(prev => ({ ...prev, carModel: initialCarModel }));
    }
  }, [initialCarModel]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formState.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d{9}$/.test(formState.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formState.paymentMethod) {
      newErrors.paymentMethod = 'Debe seleccionar un método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const token = await window.grecaptcha.execute('6LeKcd4qAAAAAGnyFHkAGxlbYV1SxOjuOT2Qi326', { action: 'submit' });

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          recaptchaToken: token,
          timestamp: new Date().toISOString(),
          source: window.location.href,
          carModel: formState.carModel || 'No especificado'
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Google Analytics conversion tracking
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16895337199/XjqPCKyQh6caEO_Fqfg-',
          'value': 1.0,
          'currency': 'EUR'
        });
      }

      setSubmitStatus('success');
      setShowThankYou(true);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      alert('Error al enviar el formulario. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const inputClasses = (hasError: boolean) => 
    `w-full p-4 rounded-xl border-2 ${
      hasError 
        ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
        : 'border-gray-200 bg-gray-50/50 focus:border-[#66D1FF] focus:ring-[#66D1FF]/20'
    } focus:bg-white focus:ring-2 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400`;

  const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";
  
  const selectClasses = (hasError: boolean) => 
    `w-full p-4 rounded-xl border-2 ${
      hasError 
        ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
        : 'border-gray-200 bg-gray-50/50 focus:border-[#66D1FF] focus:ring-[#66D1FF]/20'
    } focus:bg-white focus:ring-2 transition-all duration-200 outline-none text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_20px_center] bg-no-repeat pr-12`;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="contact-form">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB]">
            ¿Estás mirando en internet y no te fías de lo que ves?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Confía en SYA Motor, te llamamos.
          </p>
          
          <div className="relative">
            {!showThankYou ? (
              <form 
                ref={ref} 
                onSubmit={handleSubmit} 
                className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 gap-6">
                  {/* Nombre completo */}
                  <div>
                    <label className={labelClasses}>
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      className={inputClasses(!!errors.name)}
                      value={formState.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className={labelClasses}>
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Tu número de teléfono"
                      className={inputClasses(!!errors.phone)}
                      value={formState.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClasses}>
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className={inputClasses(!!errors.email)}
                      value={formState.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Método de pago */}
                  <div>
                    <label className={labelClasses}>
                      Método de pago preferido <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className={selectClasses(!!errors.paymentMethod)}
                      value={formState.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    >
                      <option value="">Seleccionar método de pago</option>
                      <option value="contado">Pago al contado</option>
                      <option value="financiado">Financiado</option>
                    </select>
                    {errors.paymentMethod && (
                      <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
                    )}
                  </div>

                  {/* Car model (hidden field if provided) */}
                  {formState.carModel && (
                    <div className="bg-[#66D1FF]/10 p-4 rounded-xl border border-[#66D1FF]/20">
                      <p className="text-sm text-gray-600 mb-1">Vehículo de interés:</p>
                      <p className="font-medium text-[#66D1FF]">{formState.carModel}</p>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-8 w-full bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB] text-white py-4 px-6 rounded-xl hover:from-[#3BA3DB] hover:to-[#66D1FF] transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-[#66D1FF]/30 flex items-center justify-center gap-2 font-medium text-lg shadow-lg shadow-[#66D1FF]/20 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                </button>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas que nos pongamos en contacto contigo para ofrecerte información sobre nuestros vehículos.
                </p>
              </form>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-sm text-center">
                <div className="w-20 h-20 bg-[#66D1FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-[#66D1FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  ¡Gracias {formState.name}!
                </h3>
                <p className="text-gray-600 mb-6">
                  Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo lo antes posible para ayudarte con tu nuevo vehículo.
                </p>
                <div className="bg-[#66D1FF]/10 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Método de pago seleccionado:</strong> {formState.paymentMethod}
                  </p>
                  {formState.carModel && (
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Vehículo de interés:</strong> {formState.carModel}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactForm;