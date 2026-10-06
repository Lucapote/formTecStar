import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import DynamicBackground from '../common/DynamicBackground';
import { COLORS } from '../../data/formData';
import { INSTAGRAM_URL } from '../../config/constants';

export default function DisqualifiedView() {
  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-start pt-8 sm:pt-12 lg:pt-16 p-4 relative overflow-hidden"
      style={{ backgroundColor: '#040416', fontFamily: "'Montserrat', sans-serif" }}
    >
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
          onClick={() => window.location.href = INSTAGRAM_URL}
          className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: COLORS.purple1 }}
        >
          Seguirnos en Instagram <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
