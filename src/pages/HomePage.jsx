import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Code2,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Bot,
  Hammer
} from 'lucide-react';
import DynamicBackground from '../components/DynamicBackground';
import { COLORS } from '../data/formData';

export default function HomePage() {
  return (
    <div
      className="min-h-screen w-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden overflow-y-auto"
      style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}
    >
      <DynamicBackground sidesOnly={true} />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3a369c] via-[#050521] to-[#040416] pointer-events-none" />

      {/* Header Superior (Mobile First) */}
      <header className="relative z-10 w-full max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-white/10 shrink-0">
        <img
          src="/Logo.png"
          alt="TecStars Logo"
          className="h-9 sm:h-11 object-contain drop-shadow-md"
        />
        <div className="inline-flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md text-center max-w-full">
          <MapPin size={13} className="text-[#ffc94d] shrink-0" />
          <span className="truncate">SEDE CANCÚN: FRIMADI MONTESSORI</span>
        </div>
      </header>

      {/* Contenido Principal Hero (Visual Hierarchy Optimization) */}
      <main className="relative z-10 w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto my-auto py-6 sm:py-10 text-center text-white space-y-6 sm:space-y-8">

        {/* 1. Nivel Superior: Eyebrow Tag / Estado */}
        <div className="inline-flex items-center gap-2 bg-[#3a369c]/50 border border-[#7588e0]/40 px-3.5 py-1 rounded-full backdrop-blur-md">
          <Hammer size={13} className="text-[#7588e0] shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
            Sitio Web Oficial en Construcción
          </span>
        </div>

        {/* 2. Título Principal Dominante */}
        <h1
          className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug sm:leading-tight max-w-xs sm:max-w-3xl mx-auto text-white drop-shadow-md tracking-tight"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          La nueva generación de <span className="text-[#7588e0]">creadores tecnológicos</span> nace aquí.
        </h1>

        {/* 3. Subtítulo Explicativo */}
        <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed max-w-xs sm:max-w-xl mx-auto opacity-90">
          Mientras terminamos nuestra nueva plataforma digital, hemos abierto los primeros cupos presenciales exclusivos en <strong className="text-white font-bold">Frimadi International Montessori</strong>. Asegura su lugar hoy.
        </p>

        {/* 4. Acción Principal / Beca Fundadores */}
        <div className="pt-1 max-w-xs sm:max-w-xl mx-auto w-full">
          <div className="bg-gradient-to-r from-[#18153c] via-[#050521] to-[#18153c] p-4.5 sm:p-6 rounded-2xl backdrop-blur-md border border-[#7588e0]/40 shadow-[0_10px_30px_rgba(58,54,156,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7588e0]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="bg-[#ffc94d] text-[#050521] text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5 shadow-sm">
                BECA FUNDADORES ACTIVA
              </span>
              <p className="text-xs text-gray-200 font-medium leading-relaxed">
                Descubre su talento tecnológico en una sesión de diagnóstico gratuita y ahorra <strong className="text-[#ffc94d] font-black">$1,000 MXN en inscripción de por vida</strong>.
              </p>
            </div>

            {/* Botón CTA: Emoji en Móvil / Arrow Icon en Desktop */}
            <Link
              to="/form1"
              className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] active:scale-95 shadow-md shrink-0 cursor-pointer"
              style={{ backgroundColor: COLORS.purple1 }}
            >
              <span>Asegurar Beca y Clase Gratis <span className="sm:hidden">🚀</span></span>
              <ChevronRight size={18} className="hidden sm:inline-block shrink-0" />
            </Link>
          </div>
        </div>

        {/* 5. Sección Secundaria: Pilares del Programa (Layout Descansado & Legible) */}
        <div className="pt-4 max-w-xs sm:max-w-3xl mx-auto space-y-3">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white opacity-90">
            Lo que aprenderá tu peque en las clases presenciales
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
            
            <div className="bg-white/[0.08] hover:bg-white/[0.12] p-4.5 sm:p-5 rounded-2xl backdrop-blur-md border border-white/20 hover:border-[#7588e0]/60 transition-all shadow-md flex flex-row sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#7588e0] text-[#050521] flex items-center justify-center font-extrabold shrink-0 shadow-md shadow-[#7588e0]/30">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight mb-1">
                  Robótica y Lógica
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-300 font-medium leading-relaxed">
                  Aprenderá a resolver problemas complejos mientras construye con sus propias manos.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.08] hover:bg-white/[0.12] p-4.5 sm:p-5 rounded-2xl backdrop-blur-md border border-white/20 hover:border-[#7588e0]/60 transition-all shadow-md flex flex-row sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#7588e0] text-[#050521] flex items-center justify-center font-extrabold shrink-0 shadow-md shadow-[#7588e0]/30">
                <Gamepad2 size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight mb-1">
                  Diseño de Videojuegos
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-300 font-medium leading-relaxed">
                  Dejará de ser solo un consumidor de pantallas para convertirse en un creador digital.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.08] hover:bg-white/[0.12] p-4.5 sm:p-5 rounded-2xl backdrop-blur-md border border-white/20 hover:border-[#7588e0]/60 transition-all shadow-md flex flex-row sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#7588e0] text-[#050521] flex items-center justify-center font-extrabold shrink-0 shadow-md shadow-[#7588e0]/30">
                <Code2 size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight mb-1">
                  Código e Inteligencia Artificial
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-300 font-medium leading-relaxed">
                  Dominará las herramientas del mañana para asegurar su ventaja competitiva hoy.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Inferior (Mobile First Centered) */}
      <footer className="relative z-10 w-full max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs font-semibold text-gray-300 opacity-80 shrink-0">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck size={15} className="text-[#7588e0] shrink-0" />
          <span>TecStars Cancún • El futuro se programa hoy</span>
        </div>
        <div>
          <span>Sede Huayacán Cancún • Frimadi Montessori</span>
        </div>
      </footer>
    </div>
  );
}
