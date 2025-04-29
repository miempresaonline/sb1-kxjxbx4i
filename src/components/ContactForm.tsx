import React, { useState, forwardRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  initialCarModel?: string;
}

interface FormField {
  name: keyof typeof initialFormState;
  label: string;
  type: 'text' | 'tel' | 'email' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

const initialFormState = {
  name: '',
  phone: '',
  email: '',
  carModel: '',
  isDanaAffected: '',
  clientType: '',
  paymentType: '',
  monthlyIncome: '',
  vehicleType: '',
  budget: '',
  message: ''
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

  const [visibleFields, setVisibleFields] = useState<string[]>(['name', 'phone', 'email', 'carModel']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=6LeKcd4qAAAAAGnyFHkAGxlbYV1SxOjuOT2Qi326`;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const formFields: FormField[] = [
    {
      name: 'name',
      label: 'Nombre completo',
      type: 'text',
      placeholder: 'Tu nombre completo',
      required: true
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'tel',
      placeholder: 'Tu número de teléfono',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'tu@email.com',
      required: true
    },
    
    {
      name: 'isDanaAffected',
      label: '¿tu vehiculo esta afectado por la DANA?',
      type: 'select',
      options: [
        { value: '', label: 'Seleccionar' },
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' }
      ],
      required: true
    },
    {
      name: 'clientType',
      label: 'Tipo de cliente',
      type: 'select',
      options: [
        { value: '', label: 'Seleccionar' },
        { value: 'autonomo', label: 'Autónomo' },
        { value: 'particular', label: 'Particular' },
        { value: 'empresa', label: 'Empresa' }
      ],
      required: true
    },
    {
      name: 'paymentType',
      label: 'Forma de pago',
      type: 'select',
      options: [
        { value: '', label: 'Seleccionar' },
        { value: 'contado', label: 'Contado' },
        { value: 'financiado', label: 'Financiado' }
      ],
      required: true
    },
    {
      name: 'monthlyIncome',
      label: 'Ingresos mensuales',
      type: 'select',
      options: [
        { value: '', label: 'Seleccionar' },
        { value: '1000-1500', label: 'De 1.000€ a 1.500€' },
        { value: '1500-2500', label: 'De 1.500€ a 2.500€' },
        { value: '2500+', label: 'Más de 2.500€' }
      ],
      required: true
    },
    {
      name: 'vehicleType',
      label: 'Tipo de vehículo',
      type: 'select',
      options: [
        { value: '', label: 'Seleccionar' },
        { value: 'comercial', label: 'Comercial' },
        { value: 'utilitario', label: 'Utilitario' },
        { value: 'suv', label: 'SUV' },
        { value: 'familiar', label: 'Familiar' }
      ],
      required: true
    },
    {
      name: 'budget',
      label: 'Presupuesto',
      type: 'select',
      options: [
        { value: '', label: 'Seleccionar' },
        { value: '10000-15000', label: 'De 10.000€ a 15.000€' },
        { value: '15000-20000', label: 'De 15.000€ a 20.000€' },
        { value: '20000+', label: 'Más de 20.000€' }
      ],
      required: true
    },
    {
      name: 'message',
      label: 'Mensaje (opcional)',
      type: 'text',
      placeholder: 'Escribe tu mensaje aquí...'
    }
  ];

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      carModel: initialCarModel
    }));
  }, [initialCarModel]);

  useEffect(() => {
    const initialFieldsFilled = ['name', 'phone', 'email'].every(
      field => formState[field as keyof typeof formState]
    );
    
    if (initialFieldsFilled && !visibleFields.includes('isDanaAffected')) {
      setVisibleFields(prev => [...prev, 'isDanaAffected']);
    }

    if (formState.isDanaAffected && !visibleFields.includes('clientType')) {
      setVisibleFields(prev => [...prev, 'clientType']);
    }

    if (formState.clientType && !visibleFields.includes('paymentType')) {
      setVisibleFields(prev => [...prev, 'paymentType']);
    }

    if (formState.paymentType && !visibleFields.includes('monthlyIncome')) {
      setVisibleFields(prev => [...prev, 'monthlyIncome']);
    }

    if (formState.monthlyIncome && !visibleFields.includes('vehicleType')) {
      setVisibleFields(prev => [...prev, 'vehicleType']);
    }

    if (formState.vehicleType && !visibleFields.includes('budget')) {
      setVisibleFields(prev => [...prev, 'budget']);
    }

    if (formState.budget && !visibleFields.includes('message')) {
      setVisibleFields(prev => [...prev, 'message']);
    }
  }, [formState, visibleFields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          source: window.location.href
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Track Google Ads conversion
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

  const inputClasses = "w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:border-[#66D1FF] focus:bg-white focus:ring-2 focus:ring-[#66D1FF]/20 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";
  const selectClasses = "w-full p-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:border-[#66D1FF] focus:bg-white focus:ring-2 focus:ring-[#66D1FF]/20 transition-all duration-200 outline-none text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_20px_center] bg-no-repeat pr-12";

  const renderField = (field: FormField) => {
    if (!visibleFields.includes(field.name)) return null;

    return (
      <div
        key={field.name}
        className="transform transition-all duration-500 opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
      >
        <label className={labelClasses}>{field.label}</label>
        {field.type === 'select' ? (
          <select
            required={field.required}
            className={selectClasses}
            value={formState[field.name]}
            onChange={(e) => setFormState(prev => ({...prev, [field.name]: e.target.value}))}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : field.name === 'message' ? (
          <textarea
            className={`${inputClasses} min-h-[120px] resize-y`}
            placeholder={field.placeholder}
            value={formState[field.name]}
            onChange={(e) => setFormState(prev => ({...prev, [field.name]: e.target.value}))}
          />
        ) : (
          <input
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            className={inputClasses}
            value={formState[field.name]}
            onChange={(e) => setFormState(prev => ({...prev, [field.name]: e.target.value}))}
          />
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="contact-form">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB]">
            Te ayudamos sin compromiso
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Déjanos tus datos y te contactaremos para informarte sobre las ayudas DANA y todos nuestros vehículos disponibles
          </p>
          
          <style>
            {`
              @keyframes fadeSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes fadeSlideOut {
                from {
                  opacity: 1;
                  transform: translateY(0);
                }
                to {
                  opacity: 0;
                  transform: translateY(-20px);
                }
              }
            `}
          </style>
          
          <div className="relative">
            {!showThankYou ? (
              <form 
                ref={ref} 
                onSubmit={handleSubmit} 
                className={`bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-sm transition-all duration-500 ${
                  showThankYou ? 'animate-[fadeSlideOut_0.5s_ease-out_forwards]' : ''
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map(renderField)}
                </div>
                
                {visibleFields.includes('message') && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-8 w-full bg-gradient-to-r from-[#66D1FF] to-[#3BA3DB] text-white py-4 px-6 rounded-xl hover:from-[#3BA3DB] hover:to-[#66D1FF] transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-[#66D1FF]/30 flex items-center justify-center gap-2 font-medium text-lg shadow-lg shadow-[#66D1FF]/20 animate-[fadeSlideIn_0.5s_ease-out_forwards] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                  </button>
                )}
              </form>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-sm text-center animate-[fadeSlideIn_0.5s_ease-out_forwards]">
                <div className="w-20 h-20 bg-[#66D1FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-[#66D1FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  ¡Gracias {formState.name}!
                </h3>
                <p className="text-gray-600">
                  Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo lo antes posible para ayudarte con tu nuevo vehículo. Si quieres ver todo nuestro catálogo de coches, visita <a href="https://syamotor.es/coches" target="_blank">Visita syamotor.es/coches</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactForm;