import React, { useState } from 'react';
import { 
  ChevronRight, ArrowLeft, Rocket, Gamepad2, Code2, GraduationCap, 
  CheckCircle2, User, Phone, MapPin, CalendarDays, 
  Bot, MonitorPlay, Compass, AlertTriangle, Navigation, DollarSign, ShieldCheck
} from 'lucide-react';

const COLORS = {
  darkBlue: '#050521',
  purple1: '#3a369c',
  purple2: '#565168',
  lightPurple: '#7588e0',
  white: '#ffffff',
  error: '#ff4d4f',
  success: '#52c41a',
  background: '#f8fafc',
  accentYellow: '#ffc94d'
};

const FORM_STEPS = [
  {
    id: 1,
    title: "¿Qué edad tiene tu futuro talento tecnológico?",
    subtitle: "Personalizamos la experiencia según su etapa de desarrollo.",
    type: "radio",
    field: "age",
    options: [
      { value: "5-9", label: "5 a 9 años", description: "Iniciación, lógica y robótica educativa", icon: <Rocket size={22} className="text-[#7588e0]" /> },
      { value: "10-14", label: "10 a 14 años", description: "Robótica avanzada y creación de videojuegos", icon: <Gamepad2 size={22} className="text-[#7588e0]" /> },
      { value: "14+", label: "14+ años", description: "Programación real y desarrollo de software", icon: <Code2 size={22} className="text-[#7588e0]" /> },
      { value: "multiple", label: "Tengo más de un hijo/a", description: "¡Pregunta por descuentos para hermanos!", icon: <GraduationCap size={22} className="text-[#7588e0]" /> }
    ]
  },
  {
    id: 2,
    title: "¿Qué es lo que más le gustaría aprender?",
    subtitle: "Queremos potenciar su pasión tecnológica desde el primer día.",
    type: "radio",
    field: "interest",
    options: [
      { value: "robots", label: "Armar y programar robots", icon: <Bot size={22} className="text-[#7588e0]" /> },
      { value: "games", label: "Crear sus propios videojuegos", icon: <Gamepad2 size={22} className="text-[#7588e0]" /> },
      { value: "design", label: "Programación y diseño digital", icon: <MonitorPlay size={22} className="text-[#7588e0]" /> },
      { value: "orientation", label: "Quiero orientación del profesor", icon: <Compass size={22} className="text-[#7588e0]" /> }
    ]
  },
  {
    id: 3,
    title: "Ubicación Presencial y Compromiso",
    subtitle: "Nuestros programas son 100% PRESENCIALES en nuestra sede de Zona Cumbres Cancún.",
    type: "radio",
    field: "commitment",
    options: [
      { value: "ready", label: "Si le gusta la clase, cubriré inscripción y mensualidad.", description: "Asegurar su lugar presencial en Cumbres Cancún.", icon: <CheckCircle2 size={22} className="text-[#52c41a]" /> },
      { value: "maybe_later", label: "Solo me interesa la clase gratis por ahora.", description: "Evaluar horarios en Zona Cumbres.", icon: <CalendarDays size={22} className="text-[#7588e0]" /> },
      { value: "out_of_budget", label: "El presupuesto está fuera de mi alcance.", description: "No podré inscribirlo/a por el momento.", icon: <AlertTriangle size={22} className="text-[#ff4d4f]" /> }
    ]
  },
  {
    id: 4,
    title: "¿Cuándo te gustaría agendar su diagnóstico?",
    subtitle: "Asegura su lugar presencial hoy mismo en nuestra sede Cumbres Cancún.",
    type: "radio",
    field: "urgency",
    options: [
      { value: "this_week", label: "Quiero apartar su clase esta misma semana.", icon: <CalendarDays size={22} className="text-[#7588e0]" /> },
      { value: "next_week", label: "Para la próxima semana / este mes.", icon: <CalendarDays size={22} className="text-[#565168]" /> }
    ]
  },
  {
    id: 5,
    title: "¡Misión casi lista! Déjanos tus datos",
    subtitle: "Te contactaremos desde la sede Cumbres Cancún por WhatsApp para enviarte los horarios.",
    type: "contact",
    field: "contact"
  }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    interest: '',
    commitment: '',
    urgency: '',
    contactName: '',
    contactPhone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [error, setError] = useState('');

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
    const progress = ((currentStep) / (FORM_STEPS.length - 1)) * 100;
    return (
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner relative">
        <div 
          className="h-full transition-all duration-500 ease-out rounded-full relative"
          style={{ width: `${progress}%`, backgroundColor: COLORS.lightPurple }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>
    );
  };

  const currentStepData = FORM_STEPS[currentStep];

  if (isSubmitted) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 relative overflow-hidden" style={{ backgroundColor: COLORS.darkBlue, fontFamily: "'Montserrat', sans-serif" }}>
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a369c] via-[#050521] to-[#050521]"></div>
        
        {/* Logo oficial por FUERA de la tarjeta sobre el fondo oscuro */}
        <div className="mb-5 relative z-10 flex justify-center shrink-0">
          <img src="/Logo.png" alt="TecStars Logo" className="h-11 sm:h-12 object-contain drop-shadow-lg" />
        </div>

        {/* Tarjeta limpia de confirmación */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative z-10 border border-gray-100">
          
          <div className="mb-3 flex justify-center relative">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-xl animate-pulse"></div>
            <CheckCircle2 size={64} className="text-[#52c41a] relative z-10" />
          </div>

          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.purple1, fontFamily: "'Fredoka', sans-serif" }}>
            ¡Misión Iniciada!
          </h2>

          <div className="inline-flex items-center gap-1.5 bg-[#050521] text-[#7588e0] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border border-[#7588e0]/30">
            <MapPin size={14} className="text-[#ffc94d]" />
            SEDE PRESENCIAL: CUMBRES CANCÚN
          </div>

          <p className="text-gray-600 mb-4 font-medium text-xs sm:text-sm leading-relaxed">
            ¡Hola <span className="text-[#3a369c] font-bold">{formData.contactName}</span>! Hemos recibido tu solicitud para nuestra sede en <span className="font-bold text-[#050521]">Zona Cumbres Cancún</span>.
          </p>

          <div className="bg-indigo-50/90 p-3.5 rounded-xl mb-4 text-left border border-indigo-100">
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">WhatsApp Registrado:</p>
            <p className="text-sm font-bold text-[#050521] flex items-center gap-2">
              <Phone size={16} className="text-[#3a369c]" /> {formData.contactPhone}
            </p>
            <p className="text-[11px] text-[#565168] mt-1 font-medium">
              En breve te escribiremos para mostrarte los días y horarios presenciales disponibles.
            </p>
          </div>

          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            TecStars Cancún • El futuro se programa hoy
          </p>
        </div>
      </div>
    );
  }

  if (isDisqualified) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 relative overflow-hidden" style={{ backgroundColor: COLORS.darkBlue, fontFamily: "'Montserrat', sans-serif" }}>
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a369c] via-[#050521] to-[#050521]"></div>
        
        {/* Logo oficial por FUERA de la tarjeta sobre el fondo oscuro */}
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
          <p className="text-gray-600 mb-5 font-medium text-xs sm:text-sm leading-relaxed">
            Nuestras clases son 100% presenciales en Cumbres Cancún y requieren esta inversión inicial ($1,500 inscripción y $2,000 mensualidad). Te invitamos a seguirnos en Instagram para enterarte de futuros talleres y becas.
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

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden" style={{ backgroundColor: COLORS.background, fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* Panel Lateral Izquierdo (Branding Limpio) */}
      <div className="hidden md:flex flex-col justify-between w-[38%] max-w-sm lg:max-w-md p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl shrink-0 h-full" style={{ backgroundColor: COLORS.darkBlue }}>
        
        {/* Fondo visual galáctico */}
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-[#3a369c] rounded-full mix-blend-screen filter blur-[70px] opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#7588e0] rounded-full mix-blend-screen filter blur-[90px] opacity-40"></div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <img 
              src="/Logo.png" 
              alt="TecStars Logo" 
              className="h-10 lg:h-12 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Badge Destacado de Ubicación Cumbres Cancún */}
          <div className="inline-flex items-center gap-1.5 bg-[#3a369c]/60 border border-[#7588e0]/40 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md">
            <Navigation size={13} className="text-[#ffc94d] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Sede Presencial Cancún
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold leading-snug mb-3" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            Descubre si tu hijo es un futuro <span className="text-[#7588e0]">creador</span>.
          </h1>
          <p className="text-xs lg:text-sm opacity-90 mb-6 font-medium leading-relaxed">
            Completa este diagnóstico para apartar su lugar en la próxima clase de prueba presencial.
          </p>
          
          <div className="space-y-3.5">
            {/* Ubicación Zona Cumbres */}
            <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/15">
               <div className="w-11 h-11 rounded-xl bg-[#ffc94d] text-[#050521] flex items-center justify-center shadow-md shrink-0 font-bold">
                  <MapPin size={22} />
               </div>
               <div>
                 <p className="font-extrabold text-[10px] text-[#ffc94d] uppercase tracking-wider">UBICACIÓN EXCLUSIVA</p>
                 <p className="font-bold text-sm text-white">Zona Cumbres, Cancún</p>
                 <p className="text-[11px] text-gray-300 font-medium">Clases 100% presenciales</p>
               </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/10">
               <div className="w-11 h-11 rounded-xl bg-[#7588e0] flex items-center justify-center shadow-lg shrink-0">
                  <DollarSign size={20} className="text-white" />
               </div>
               <div>
                 <p className="font-bold text-[10px] text-[#7588e0] uppercase tracking-wider">INVERSIÓN REGULAR</p>
                 <span className="font-semibold text-xs text-white">$1,500 ins. + $2,000/mes (8 clases)</span>
               </div>
            </div>
          </div>
        </div>

        {/* Footer del Sidebar Limpio */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-300 opacity-80">
          <ShieldCheck size={16} className="text-[#7588e0]" />
          <span>Información 100% confidencial y protegida</span>
        </div>
      </div>

      {/* Panel Derecho (Alineado Top-Down: La tarjeta y los encabezados quedan FIJOS sin saltos) */}
      <div className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-10 relative overflow-y-auto md:overflow-hidden h-full">
        
        {/* Header Móvil con Fondo Oscuro #050521 y Logo.png en blanco */}
        <div className="md:hidden w-full max-w-md flex flex-col items-center mb-4 pt-6 pb-4 px-4.5 text-center bg-[#050521] rounded-2xl border border-[#7588e0]/30 shadow-md shrink-0">
           <img 
             src="/Logo.png" 
             alt="TecStars Logo" 
             className="h-9 object-contain mb-2.5 drop-shadow-sm" 
           />
           <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3.5 py-1 rounded-full text-[11px] font-bold border border-[#7588e0]/40">
             <MapPin size={13} className="text-[#ffc94d]" />
             SEDE PRESENCIAL: ZONA CUMBRES CANCÚN
           </div>
        </div>

        {/* Tarjeta del Formulario: Fija desde la parte superior (justify-start min-h-[500px]) */}
        <div className="w-full max-w-md lg:max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative flex flex-col justify-start min-h-[500px]">
          
          {/* Fila Fija Superior: Botón Volver + Barra de Progreso */}
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
          
          {/* Cabecera Fija del Paso (Paso X de 5, Título y Subtítulo) */}
          <div className="mb-4 shrink-0 min-h-[68px] flex flex-col justify-start">
            <span className="text-[11px] font-bold text-[#7588e0] uppercase tracking-wider block mb-0.5">
              Paso {currentStep + 1} de {FORM_STEPS.length}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-[#050521] leading-snug" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {currentStepData.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#565168] font-medium leading-relaxed">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Banner Visual Informativo de Ubicación Cumbres Cancún en Paso 3 */}
          {currentStepData.field === 'commitment' && (
            <div className="mb-4 bg-indigo-50/90 border-2 border-[#7588e0]/30 p-3 rounded-xl flex items-start gap-3 animate-slideUpFade shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#3a369c] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MapPin size={18} className="text-[#ffc94d]" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-[#050521] flex items-center gap-1.5">
                  SEDE CUMBRES CANCÚN
                  <span className="bg-[#3a369c] text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold">Presencial</span>
                </p>
                <p className="text-[11px] text-gray-600 font-medium leading-snug mt-0.5">
                  Inversión: <strong>$1,500 inscripción</strong> + <strong>$2,000 al mes</strong> (8 clases/mes).
                </p>
              </div>
            </div>
          )}

          {/* Área Principal de Opciones (Top-Down, No cambia la posición de la cabecera) */}
          <div className="flex-1 flex flex-col justify-start">
            {currentStepData.type === 'radio' && (
              <div className="space-y-2.5 animate-slideUpFade">
                {currentStepData.options.map((option) => {
                  const isSelected = formData[currentStepData.field] === option.value;
                  const isDanger = option.value === 'out_of_budget';
                  
                  return (
                    <label 
                      key={option.value}
                      className={`
                        relative flex items-center p-3 sm:p-3.5 rounded-xl cursor-pointer border-2 transition-all duration-200 group
                        ${isSelected 
                          ? `border-[#3a369c] bg-indigo-50/50 shadow-sm transform scale-[1.005]` 
                          : 'border-gray-100 hover:border-[#7588e0] hover:bg-gray-50'}
                        ${isDanger && isSelected ? 'border-red-400 bg-red-50' : ''}
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
                        ${isDanger && isSelected ? 'bg-red-100' : ''}
                      `}>
                         {option.icon}
                      </div>
                      
                      <div className="flex-1 pr-6">
                        <h3 className={`font-bold text-sm text-gray-800 transition-colors ${isSelected ? `text-[#3a369c]` : ''} ${isDanger && isSelected ? 'text-red-700' : ''}`}>
                           {option.label}
                        </h3>
                        {option.description && (
                          <p className="text-[11px] text-gray-500 mt-0.5 font-medium leading-tight">{option.description}</p>
                        )}
                      </div>

                      {/* Radio Circle */}
                      <div className={`
                        absolute right-3.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected ? `border-[#3a369c]` : 'border-gray-200 group-hover:border-[#7588e0]'}
                        ${isDanger && isSelected ? 'border-red-500' : ''}
                      `}>
                        {isSelected && <div className={`w-2 h-2 rounded-full ${isDanger ? 'bg-red-500' : `bg-[#3a369c]`}`} />}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Renderizado del Paso Final (Contacto) */}
            {currentStepData.type === 'contact' && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-slideUpFade">
                
                {/* Badge Recordatorio de Ubicación */}
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <MapPin size={15} className="text-[#3a369c] shrink-0" />
                  Sede de diagnóstico: Zona Cumbres Cancún
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#050521] ml-1 uppercase tracking-wider">
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
                  <label className="block text-[11px] font-bold text-[#050521] ml-1 uppercase tracking-wider">
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
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] shadow-[0_8px_16px_rgba(58,54,156,0.25)] hover:shadow-[0_12px_24px_rgba(58,54,156,0.35)] active:scale-95 mt-4"
                  style={{ backgroundColor: COLORS.purple1 }}
                >
                  Confirmar y Recibir Horarios por WhatsApp <ChevronRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Footer Fijo en la tarjeta */}
          <div className="mt-4 text-center border-t border-gray-100 pt-3 shrink-0">
            <p className="text-[#565168] text-[11px] font-medium flex items-center justify-center gap-1">
              <MapPin size={11} className="text-[#3a369c]" /> Cumbres Cancún, Quintana Roo
            </p>
          </div>

        </div>
        
      </div>
    </div>
  );
}
