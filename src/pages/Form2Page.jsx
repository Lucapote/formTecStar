import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import DynamicBackground from '../components/common/DynamicBackground';
import ProgressBar from '../components/common/ProgressBar';
import SidebarBranding from '../components/form/SidebarBranding';
import MobileHeader from '../components/form/MobileHeader';
import StepRadioOptions from '../components/form/StepRadioOptions';
import StepReservation from '../components/form/StepReservation';
import StepContactForm from '../components/form/StepContactForm';
import ThankYouView from '../components/form/ThankYouView';
import DisqualifiedView from '../components/form/DisqualifiedView';
import { FORM_STEPS } from '../data/formData';
import { submitLead } from '../services/leadService';
import { cleanPhoneNumber, validateEmail } from '../utils/helpers';

export default function Form2Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasScholarship, setHasScholarship] = useState(false);
  const [vacancies, setVacancies] = useState(4);
  const [formData, setFormData] = useState({
    age: '',
    interest: '',
    commitment: 'regular',
    urgency: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [error, setError] = useState('');

  // Contador de urgencia: cambia de 4 a 3 vacantes tras 1.5s al entrar al Paso 3 (Apartar espacio)
  useEffect(() => {
    if (currentStep === 2) {
      setVacancies(4);
      const timer = setTimeout(() => {
        setVacancies(3);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleScholarshipToggle = (checked) => {
    setHasScholarship(checked);
    setFormData(prev => ({
      ...prev,
      commitment: checked ? 'founder_scholarship' : 'regular',
      urgency: checked && prev.urgency === 'next_month' ? '' : prev.urgency
    }));
  };

  const handleUrgencySelect = (value) => {
    setFormData(prev => ({
      ...prev,
      urgency: value,
      commitment: hasScholarship ? 'founder_scholarship' : 'regular'
    }));
    setError('');
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 300);
  };

  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');

    if (field === 'commitment' && value === 'out_of_budget') {
      setTimeout(() => setIsDisqualified(true), 350);
      return;
    }

    if (currentStep < FORM_STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación Nombre: al menos 2 letras
    const cleanName = formData.contactName.trim();
    if (!cleanName || cleanName.length < 2) {
      setError('Por favor, ingresa tu nombre completo (mínimo 2 letras).');
      return;
    }

    // Validación Teléfono: exactamente 10 dígitos
    const cleanPhone = cleanPhoneNumber(formData.contactPhone);
    if (cleanPhone.length !== 10) {
      setError('Por favor, ingresa un número de WhatsApp válido de 10 dígitos.');
      return;
    }

    // Validación Correo Electrónico
    const cleanEmail = formData.contactEmail.trim();
    if (!cleanEmail || !validateEmail(cleanEmail)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLead(formData, hasScholarship);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error al procesar el envío:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayVacancies = hasScholarship ? Math.max(1, vacancies - 1) : vacancies;
  const currentStepData = FORM_STEPS[currentStep];

  // 1. Vista de Agradecimiento / Confirmación (Neuromarketing PAS)
  if (isSubmitted) {
    return <ThankYouView contactName={formData.contactName} contactPhone={formData.contactPhone} />;
  }

  // 2. Vista de Descalificado (Fuera de presupuesto)
  if (isDisqualified) {
    return <DisqualifiedView />;
  }

  // 3. Vista Principal del Embudo Multipaso sin Precios
  return (
    <div
      className="min-h-screen w-screen flex flex-col md:flex-row overflow-y-auto relative"
      style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}
    >
      <DynamicBackground />

      {/* Sidebar Branding Desktop (Sin Precios) */}
      <SidebarBranding displayVacancies={displayVacancies} showPrices={false} />

      {/* Panel Derecho de Formulario */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-8 relative overflow-y-auto min-h-full">
        <MobileHeader />

        {/* Tarjeta de Formulario */}
        <div className="w-full max-w-md lg:max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative flex flex-col justify-start my-auto">
          
          {/* Header Fijo: Volver + Barra de Progreso */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-[#3a369c] transition-colors p-1.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 shrink-0 cursor-pointer"
                aria-label="Volver al paso anterior"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <div className="w-[32px] shrink-0" />
            )}

            <div className="flex-1">
              <ProgressBar currentStep={currentStep} totalSteps={FORM_STEPS.length} />
            </div>
          </div>

          {/* Titular del Paso */}
          <div className="mb-4 shrink-0 min-h-[68px] flex flex-col justify-start">
            <span className="text-xs font-bold text-[#7588e0] uppercase tracking-wider block mb-0.5">
              Paso {currentStep + 1} de {FORM_STEPS.length}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-[#050521] leading-snug" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {currentStepData.title}
            </h2>
            <p className="text-xs text-[#565168] font-medium leading-relaxed">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Renderizado Dinámico de Pasos */}
          <div className="flex-1 flex flex-col justify-start">
            {currentStepData.type === 'radio' && (
              <StepRadioOptions
                stepData={currentStepData}
                selectedValue={formData[currentStepData.field]}
                onSelectOption={(val) => handleOptionSelect(currentStepData.field, val)}
              />
            )}

            {currentStepData.type === 'reservation' && (
              <StepReservation
                hasScholarship={hasScholarship}
                displayVacancies={displayVacancies}
                vacancies={vacancies}
                selectedUrgency={formData.urgency}
                onScholarshipToggle={handleScholarshipToggle}
                onUrgencySelect={handleUrgencySelect}
                showPrices={false}
              />
            )}

            {currentStepData.type === 'contact' && (
              <StepContactForm
                formData={formData}
                isSubmitting={isSubmitting}
                error={error}
                onChange={handleContactChange}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Footer Fijo del Formulario */}
          <div className="mt-4 text-center border-t border-gray-100 pt-3 shrink-0">
            <p className="text-[#565168] text-xs font-medium flex items-center justify-center gap-1">
              <MapPin size={11} className="text-[#3a369c]" /> Frimadi International Montessori
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
