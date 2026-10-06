import React from 'react';
import { Navigation, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { COLORS } from '../../data/formData';

export default function SidebarBranding({ displayVacancies, showPrices = true }) {
  return (
    <div
      className="hidden md:flex flex-col justify-between w-[38%] max-w-sm lg:max-w-md p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl shrink-0 h-auto min-h-screen"
      style={{ backgroundColor: COLORS.darkBlue }}
    >
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

          {/* Recuadro 2: Beca Fundadores */}
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
                {showPrices ? (
                  <>Descubre dentro del embudo cómo ahorrar hasta <strong className="text-white font-bold">$1,000 en inscripción</strong>.</>
                ) : (
                  <>Descubre dentro del embudo cómo aplicar a la <strong className="text-white font-bold">Beca Fundadores</strong>.</>
                )}
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
  );
}
