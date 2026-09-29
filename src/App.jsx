import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  CalendarDays,
  AlertTriangle,
  Navigation,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import DynamicBackground from './components/DynamicBackground';
import { COLORS, FORM_STEPS } from './data/formData';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasScholarship, setHasScholarship] = useState(false);
  const [vacancies, setVacancies] = useState(4);
  const [formData, setFormData] = useState({
    age: '',
    interest: '',
    commitment: 'regular',
    urgency: '',
    contactName: '',
    contactPhone: ''
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.contactName.trim()) {
      setError('Por favor, ingresa tu nombre completo o de tutor.');
      return;
    }
    const cleanPhone = formData.contactPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Por favor, ingresa un número de WhatsApp válido a 10 dígitos.');
      return;
    }

    console.log("Lead Capturado (TecStars Cumbres Cancún):", formData);
    setIsSubmitted(true);
  };

  const ProgressBar = () => {
    const progress = (currentStep / (FORM_STEPS.length - 1)) * 100;
    return (
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner relative">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full relative"
          style={{ width: `${progress}%`, backgroundColor: COLORS.lightPurple }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
        </div>
      </div>
    );
  };

  const currentStepData = FORM_STEPS[currentStep];
  const displayVacancies = hasScholarship ? Math.max(1, vacancies - 1) : vacancies;

  // -------------------------------------------------------------
  // VISTA 1: PANTALLA DE CONFIRMACIÓN / AGRADECIMIENTO (NEUROMARKETING)
  // -------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-start py-6 sm:py-10 p-4 relative overflow-y-auto" style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}>
        <DynamicBackground />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a369c] via-[#050521] to-[#050521] pointer-events-none" />

        {/* Logo oficial sobre fondo oscuro */}
        <div className="mb-4 relative z-10 flex justify-center shrink-0">
          <img src="/Logo.png" alt="TecStars Logo" className="h-10 sm:h-12 object-contain drop-shadow-lg" />
        </div>

        {/* Tarjeta de confirmación con Neuromarketing PAS */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-md w-full text-center shadow-2xl relative z-10 border border-gray-100 animate-slideUpFade space-y-4">

          {/* Header de Confirmación */}
          <div>
            <div className="mb-2 flex justify-center relative">
              <div className="absolute inset-0 bg-green-100 rounded-full blur-xl animate-pulse" />
              <CheckCircle2 size={56} className="text-[#52c41a] relative z-10" />
            </div>

            <h2 className="text-xl font-bold mb-1" style={{ color: COLORS.purple1, fontFamily: "'Fredoka', sans-serif" }}>
              ¡Misión Iniciada, {formData.contactName}!
            </h2>

            {/* Sede Ubicación */}
            <div className="inline-flex flex-col items-center justify-center bg-[#050521] text-[#7588e0] px-4 py-2 rounded-2xl text-xs font-bold my-2 border border-[#7588e0]/30 text-center w-full">
              <span className="flex items-center gap-1.5 justify-center">
                <MapPin size={13} className="text-[#7588e0]" />
                <span>SEDE PRESENCIAL:</span>
              </span>
              <span className="block mt-0.5 text-center text-xs text-white font-extrabold">
                FRIMADI INTERNATIONAL MONTESSORI
              </span>
            </div>

            <p className="text-gray-700 text-xs font-medium leading-relaxed mt-2">
              Hemos recibido tus datos correctamente. En breve te contactaremos por WhatsApp al <span className="font-extrabold text-[#050521] whitespace-nowrap">{formData.contactPhone}</span> para coordinar tu horario.
            </p>
          </div>

          {/* SECCIÓN NEUROMARKETING PAS: VALIDACIÓN DE DECISIÓN DE COMPRA */}
          <div className="border-t border-gray-100 text-left space-y-3">
            
            <div className="text-center mb-5">
              <span className="bg-[#3a369c]/10 text-[#3a369c] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Por qué tomaste la mejor decisión hoy
              </span>
            </div>

            {/* 1. EL PROBLEMA (Lo que dejaste atrás) */}
            <div className="bg-red-50/80 border border-red-100 rounded-2xl p-3.5 space-y-2 animate-slideInLeft animation-delay-300">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={12} />
                </div>
                <h3 className="font-extrabold text-xs text-red-950 uppercase tracking-wider">
                  Lo que estás dejando atrás:
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-700 font-medium pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold shrink-0">•</span>
                  <span>Uso pasivo del iPad y pantallas consumiendo videos sin propósito.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold shrink-0">•</span>
                  <span>Juegos en línea descontrolados y aislamiento de la convivencia real.</span>
                </li>
              </ul>
            </div>

            {/* 2. LA AGITACIÓN (La realidad evitada) */}
            <div className="bg-[#050521] border border-[#7588e0]/30 rounded-2xl p-3.5 text-white shadow-md relative overflow-hidden animate-slideInRight animation-delay-600">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#3a369c] rounded-full blur-2xl opacity-50 pointer-events-none" />
              <p className="text-xs leading-relaxed text-gray-200 font-medium relative z-10">
                Evitaste que este año tu hijo tirara <strong className="text-[#ffc94d]">más de 1,000 horas a la basura</strong> frente a una pantalla gastando dinero en monedas virtuales. <span className="text-[#7588e0] font-bold block mt-1">Hoy elegiste transformar su futuro en lugar de dejarlo ser solo un consumidor.</span>
              </p>
            </div>

            {/* 3. LA SOLUCIÓN (La transformación TecStars) */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2 animate-slideInLeft animation-delay-900">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles size={12} />
                </div>
                <h3 className="font-extrabold text-xs text-emerald-950 uppercase tracking-wider">
                  La transformación de tu peque en TecStars:
                </h3>
              </div>
              <div className="space-y-1.5 text-xs text-gray-800 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#52c41a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#050521]">De consumidor a Creador:</strong> Crear sus propios videojuegos y código.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#52c41a] shrink-0 mt-0.5" />
                  <span><strong className="text-[#050521]">Socialización real:</strong> Amigos de su edad en un ambiente presencial seguro.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trigger de WhatsApp Instantáneo */}
          <div className="pt-2">
            <a
              href={`https://wa.me/529981234567?text=${encodeURIComponent(
                `Hola TecStars, acabo de registrar a mi hijo para la clase presencial en Cumbres Cancún.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] shadow-lg animate-pulse"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>Enviar WhatsApp Directo Ahora</span>
              <ChevronRight size={16} />
            </a>
          </div>

          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider border-t border-gray-100 pt-3">
            TecStars Cancún • El futuro se programa hoy
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VISTA 2: DESCALIFICADO (FUERA DE PRESUPUESTO / UBICACIÓN)
  // -------------------------------------------------------------
  if (isDisqualified) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 relative overflow-hidden" style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}>
        <DynamicBackground />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a369c] via-[#050521] to-[#050521] pointer-events-none" />

        <div className="mb-4 relative z-10 flex justify-center shrink-0">
          <img src="/Logo.png" alt="TecStars Logo" className="h-10 sm:h-11 object-contain drop-shadow-md" />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-xl relative z-10 border border-gray-100">
          <div className="inline-flex items-center gap-1.5 bg-[#f8fafc] text-[#565168] px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-gray-200">
            <MapPin size={13} className="text-[#3a369c]" /> Sede Cumbres Cancún
          </div>

          <h2 className="text-xl font-bold mb-2" style={{ color: COLORS.darkBlue, fontFamily: "'Fredoka', sans-serif" }}>
            Gracias por tu interés
          </h2>
          <p className="text-gray-600 mb-5 font-medium text-xs leading-relaxed">
            Nuestras clases son 100% presenciales en Cumbres Cancún y requieren esta inversión inicial ($1,500 inscripción y $2,500 mensualidad). Te invitamos a seguirnos en Instagram para enterarte de futuros talleres y becas.
          </p>
          <button
            onClick={() => window.location.href = 'https://instagram.com/tecstars.mx'}
            className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2"
            style={{ backgroundColor: COLORS.purple1 }}
          >
            Seguirnos en Instagram <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VISTA 3: EMBUDO MULTIPASO PRINCIPAL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row overflow-y-auto relative" style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}>
      <DynamicBackground />

      {/* Panel Lateral Izquierdo (Desktop Branding) */}
      <div className="hidden md:flex flex-col justify-between w-[38%] max-w-sm lg:max-w-md p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl shrink-0 h-auto min-h-screen" style={{ backgroundColor: COLORS.darkBlue }}>

        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-[#3a369c] rounded-full mix-blend-screen filter blur-[70px] opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#7588e0] rounded-full mix-blend-screen filter blur-[90px] opacity-40" />

        <div className="relative z-10">
          <div className="mb-6">
            <img
              src="/Logo.png"
              alt="TecStars Logo"
              className="h-10 lg:h-12 w-auto object-contain drop-shadow-md"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#3a369c]/60 border border-[#7588e0]/40 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md">
            <Navigation size={13} className="text-[#ffc94d] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Frimadi International Montessori
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold leading-snug mb-3" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Descubre si tu hijo es un futuro <span className="text-[#7588e0]">creador</span>.
          </h1>
          <p className="text-xs opacity-90 mb-6 font-medium leading-relaxed">
            Completa este diagnóstico para apartar su lugar en la próxima clase de prueba presencial.
          </p>

          <div className="space-y-3.5">
            {/* Recuadro 1: Ubicación Exclusiva */}
            <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/15">
              <div className="w-11 h-11 rounded-xl bg-[#ffc94d] text-[#050521] flex items-center justify-center shadow-md shrink-0 font-bold">
                <MapPin size={22} />
              </div>
              <div>
                <p className="font-extrabold text-xs text-[#ffc94d] uppercase tracking-wider">SEDE EXCLUSIVA CANCÚN</p>
                <p className="font-bold text-sm text-white">Frimadi International Montessori</p>
                <p className="text-xs text-gray-300 font-medium">Clases 100% presenciales</p>
              </div>
            </div>

            {/* Recuadro 2: Beca Fundadores (Estilo Limpio, Elegante & Sobrio) */}
            <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/15">
              <div className="w-11 h-11 rounded-xl bg-[#7588e0] text-[#050521] flex items-center justify-center shadow-md shrink-0 font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-extrabold text-xs text-[#7588e0] uppercase tracking-wider">BECA FUNDADORES ACTIVA</p>
                  <span
                    key={displayVacancies}
                    className="bg-[#3a369c] text-white text-xs px-2 py-0.5 rounded-full font-bold transition-all duration-300 animate-pricePop inline-block"
                  >
                    {displayVacancies} {displayVacancies === 1 ? 'vacante' : 'vacantes'}
                  </span>
                </div>
                <p className="font-bold text-sm text-white mt-0.5">¿Calificas para Beca Especial?</p>
                <p className="text-xs text-gray-300 font-medium leading-tight">
                  Descubre dentro del embudo cómo ahorrar hasta <strong className="text-white font-bold">$1,000 en inscripción</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-300 opacity-80 mt-6">
          <ShieldCheck size={16} className="text-[#7588e0]" />
          <span>Información 100% confidencial y protegida</span>
        </div>
      </div>

      {/* Panel Derecho (Formulario) */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-8 relative overflow-y-auto min-h-full">

        {/* Header Móvil */}
        <div className="md:hidden w-full max-w-md flex flex-col items-center mb-4 pt-6 pb-4 px-4.5 text-center bg-[#050521]/60 backdrop-blur-md rounded-2xl border border-[#7588e0]/30 shadow-md shrink-0">
          <img
            src="/Logo.png"
            alt="TecStars Logo"
            className="h-9 object-contain mb-2.5 drop-shadow-sm"
          />
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3.5 py-1 rounded-full text-xs font-bold border border-[#7588e0]/40">
            <MapPin size={13} className="text-[#ffc94d]" />
            SEDE: FRIMADI INTERNATIONAL MONTESSORI
          </div>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="w-full max-w-md lg:max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative flex flex-col justify-start my-auto">

          {/* Fila Fija Superior: Volver + Barra de Progreso */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-[#3a369c] transition-colors p-1.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 shrink-0"
                aria-label="Volver al paso anterior"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <div className="w-[32px] shrink-0" />
            )}

            <div className="flex-1">
              <ProgressBar />
            </div>
          </div>

          {/* Cabecera del Paso */}
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

          {/* Área Principal de Opciones */}
          <div className="flex-1 flex flex-col justify-start">
            {currentStepData.type === 'radio' && (
              <div className="space-y-2.5 animate-slideUpFade">
                {currentStepData.options.map((option) => {
                  const isSelected = formData[currentStepData.field] === option.value;

                  return (
                    <label
                      key={option.value}
                      className={`
                        relative flex items-center p-3 sm:p-3.5 rounded-xl cursor-pointer border-2 transition-all duration-200 group
                        ${isSelected
                          ? `border-[#3a369c] bg-indigo-50/50 shadow-sm transform scale-[1.005]`
                          : 'border-gray-100 hover:border-[#7588e0] hover:bg-gray-50'}
                      `}
                    >
                      <input
                        type="radio"
                        name={currentStepData.field}
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(currentStepData.field, option.value)}
                        className="sr-only"
                      />

                      <div className={`
                        flex-shrink-0 mr-3 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                        ${isSelected ? `bg-white shadow-sm scale-105` : 'bg-gray-100 group-hover:bg-white'}
                      `}>
                        {option.icon}
                      </div>

                      <div className="flex-1 pr-6">
                        <h3 className={`font-bold text-sm text-gray-800 transition-colors ${isSelected ? `text-[#3a369c]` : ''}`}>
                          {option.label}
                        </h3>
                        {option.description && (
                          <p className="text-xs mt-0.5 font-medium leading-tight text-gray-500">
                            {option.description}
                          </p>
                        )}
                      </div>

                      <div className={`
                        absolute right-3.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected ? `border-[#3a369c]` : 'border-gray-200 group-hover:border-[#7588e0]'}
                      `}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#3a369c]" />}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Paso 3: Aparta su espacio */}
            {currentStepData.type === 'reservation' && (
              <div className="space-y-3.5 animate-slideUpFade">
                <div className="space-y-2 text-xs py-1">
                  <p className="text-gray-800 leading-relaxed">
                    <strong className="text-[#050521] font-extrabold">Ubicación:</strong> Frimadi International Montessori
                  </p>

                  <div className="text-gray-800 flex items-center gap-2 flex-wrap">
                    <strong className="text-[#050521] font-extrabold">Mensualidad:</strong>
                    {hasScholarship ? (
                      <span className="inline-flex items-center gap-2">
                        <span key="pop-mensualidad" className="font-extrabold text-[#16c722] text-sm inline-block animate-pricePop">$2,000</span>
                        <span className="line-through text-gray-400 text-xs font-semibold">$2,500</span>
                      </span>
                    ) : (
                      <span className="font-extrabold text-[#3a369c] text-sm">$2,500</span>
                    )}
                  </div>

                  <div className="text-gray-800 flex items-center gap-2 flex-wrap">
                    <strong className="text-[#050521] font-extrabold">Inscripción ÚNICA:</strong>
                    {hasScholarship ? (
                      <span className="inline-flex items-center gap-2">
                        <span key="pop-inscripcion" className="font-extrabold text-[#16c722] text-sm inline-block animate-pricePop">$500</span>
                        <span className="line-through text-gray-400 text-xs font-semibold">$1,500</span>
                      </span>
                    ) : (
                      <span className="font-extrabold text-[#3a369c] text-sm">$1,500</span>
                    )}
                  </div>

                  <p className="text-gray-800 leading-relaxed">
                    <strong className="text-[#050521] font-extrabold">Modalidad:</strong> 2 clases semanales de 1 hora presenciales
                  </p>
                </div>

                {/* Checkbox Beca Fundadores */}
                <label className={`
                  relative flex items-center p-3 sm:p-3.5 rounded-2xl cursor-pointer border-2 transition-all duration-200 select-none
                  ${hasScholarship
                    ? 'border-amber-400 bg-amber-50/90 shadow-sm'
                    : 'border-amber-200/80 bg-amber-50/30 hover:border-amber-400 hover:bg-amber-50/60'}
                `}>
                  <input
                    type="checkbox"
                    checked={hasScholarship}
                    onChange={(e) => handleScholarshipToggle(e.target.checked)}
                    className="w-5 h-5 rounded text-[#3a369c] focus:ring-[#3a369c] border-gray-300 shrink-0 cursor-pointer accent-[#3a369c]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-[#050521] flex items-center gap-1">
                        {hasScholarship ? 'Beca Aplicada' : 'Aplica a Beca Fundadores'}
                      </span>
                      <span key={displayVacancies} className={`
                        text-white text-xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider transition-all duration-500
                        ${displayVacancies <= 2 || vacancies === 3 ? 'bg-red-600 animate-pulse scale-105 shadow-sm' : 'bg-red-500'}
                      `}>
                        {displayVacancies} vacantes
                      </span>
                    </div>
                    <p className="text-xs text-amber-900/90 font-medium mt-0.5 leading-tight">
                      {hasScholarship
                        ? '¡Beca activa! Mensualidad a $2,000 e Inscripción a $500.'
                        : 'Marca la casilla para aplicar a la Beca Fundadores'}
                    </p>
                  </div>
                </label>

                {/* Opciones para apartar */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-[#050521] uppercase tracking-wider ml-1">
                    Opciones para apartar el espacio
                  </label>

                  {[
                    { value: 'this_week', label: 'Esta semana', icon: <CalendarDays size={20} className="text-[#7588e0]" /> },
                    { value: 'next_week', label: 'Próxima semana', icon: <CalendarDays size={20} className="text-[#565168]" /> },
                    {
                      value: 'next_month',
                      label: 'Próximo mes',
                      icon: <CalendarDays size={20} className="text-gray-400" />,
                      disabled: hasScholarship,
                      disabledText: '(No disponible con Beca Fundadores)'
                    }
                  ].map((option) => {
                    const isSelected = formData.urgency === option.value;
                    const isDisabled = option.disabled;

                    return (
                      <div
                        key={option.value}
                        onClick={() => {
                          if (isDisabled) return;
                          handleUrgencySelect(option.value);
                        }}
                        className={`
                          relative flex items-center p-3 rounded-xl border-2 transition-all duration-200
                          ${isDisabled
                            ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-100'
                            : 'cursor-pointer hover:border-[#7588e0] hover:bg-gray-50'}
                          ${isSelected && !isDisabled
                            ? 'border-[#3a369c] bg-indigo-50/50 shadow-sm'
                            : !isDisabled ? 'border-gray-100' : ''}
                        `}
                      >
                        <div className={`mr-3 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isSelected && !isDisabled ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <span className={`font-bold text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}>
                            {option.label}
                          </span>
                          {isDisabled && (
                            <span className="text-xs font-semibold text-red-500 ml-2 block sm:inline">
                              {option.disabledText}
                            </span>
                          )}
                        </div>
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected && !isDisabled ? 'border-[#3a369c]' : 'border-gray-200'}`}>
                          {isSelected && !isDisabled && <div className="w-2 h-2 rounded-full bg-[#3a369c]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Paso 4: Formulario de Contacto */}
            {currentStepData.type === 'contact' && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-slideUpFade">
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <MapPin size={15} className="text-[#3a369c] shrink-0" />
                  Sede de diagnóstico: Frimadi International Montessori
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#050521] ml-1 uppercase tracking-wider">
                    Nombre del papá, mamá o tutor
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400 group-focus-within:text-[#3a369c] transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleContactChange}
                      placeholder="Ej. María López"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border-2 border-gray-100 focus:border-[#3a369c] focus:ring-4 focus:ring-[#3a369c]/10 transition-all outline-none text-gray-800 font-semibold text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#050521] ml-1 uppercase tracking-wider">
                    Tu WhatsApp (a 10 dígitos)
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400 group-focus-within:text-[#3a369c] transition-colors" />
                    </div>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleContactChange}
                      placeholder="Ej. 998 123 4567"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border-2 border-gray-100 focus:border-[#3a369c] focus:ring-4 focus:ring-[#3a369c]/10 transition-all outline-none text-gray-800 font-semibold text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-shake">
                    <AlertTriangle size={16} className="shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] shadow-[0_8px_16px_rgba(58,54,156,0.25)] hover:shadow-[0_12px_24px_rgba(58,54,156,0.35)] active:scale-95 mt-4 cursor-pointer"
                  style={{ backgroundColor: COLORS.purple1 }}
                >
                  Confirmar y Recibir Horarios por WhatsApp <ChevronRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Footer Fijo */}
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
