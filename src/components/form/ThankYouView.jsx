import React from 'react';
import { CheckCircle2, MapPin, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react';
import DynamicBackground from '../common/DynamicBackground';
import { COLORS } from '../../data/formData';
import { WHATSAPP_PHONE } from '../../config/constants';

export default function ThankYouView({ formData }) {
  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-start py-6 sm:py-10 p-4 relative overflow-y-auto"
      style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}
    >
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
            Hemos recibido tus datos correctamente. En breve te contactaremos por WhatsApp al <span className="font-extrabold text-[#050521] whitespace-nowrap">+52 {formData.contactPhone}</span> para coordinar tu horario.
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
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
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
