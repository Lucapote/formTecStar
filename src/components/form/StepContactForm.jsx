import React from 'react';
import { MapPin, User, Phone, Mail, AlertTriangle, ChevronRight } from 'lucide-react';
import { COLORS } from '../../data/formData';

export default function StepContactForm({
  formData,
  onChange,
  onSubmit,
  error,
  isSubmitting
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-slideUpFade">
      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-700">
        <MapPin size={15} className="text-[#3a369c] shrink-0" />
        Sede de diagnóstico: Frimadi International Montessori
      </div>

      {/* Campo: Nombre del Tutor */}
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
            onChange={onChange}
            placeholder="Ej. María López"
            className="w-full pl-10 pr-3.5 py-3 rounded-xl border-2 border-gray-100 focus:border-[#3a369c] focus:ring-4 focus:ring-[#3a369c]/10 transition-all outline-none text-gray-800 font-semibold text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {/* Campo: Teléfono WhatsApp con +52 por defecto */}
      <div className="space-y-1">
        <label className="block text-xs font-bold text-[#050521] ml-1 uppercase tracking-wider">
          Tu WhatsApp (10 dígitos)
        </label>
        <div className="relative group flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none gap-1.5">
            <Phone size={18} className="text-gray-400 group-focus-within:text-[#3a369c] transition-colors" />
            <span className="text-xs font-extrabold text-[#3a369c] border-r border-gray-200 pr-2">+52</span>
          </div>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={onChange}
            maxLength={14}
            placeholder="998 123 4567"
            className="w-full pl-20 pr-3.5 py-3 rounded-xl border-2 border-gray-100 focus:border-[#3a369c] focus:ring-4 focus:ring-[#3a369c]/10 transition-all outline-none text-gray-800 font-semibold text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {/* Campo: Correo Electrónico */}
      <div className="space-y-1">
        <label className="block text-xs font-bold text-[#050521] ml-1 uppercase tracking-wider">
          Correo Electrónico
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-400 group-focus-within:text-[#3a369c] transition-colors" />
          </div>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={onChange}
            placeholder="ejemplo@correo.com"
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
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm text-white transition-all transform hover:scale-[1.01] shadow-[0_8px_16px_rgba(58,54,156,0.25)] hover:shadow-[0_12px_24px_rgba(58,54,156,0.35)] active:scale-95 mt-4 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
        style={{ backgroundColor: COLORS.purple1 }}
      >
        {isSubmitting ? (
          <span>Enviando diagnóstico...</span>
        ) : (
          <>
            <span>Confirmar y Recibir Horarios por WhatsApp</span>
            <ChevronRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
