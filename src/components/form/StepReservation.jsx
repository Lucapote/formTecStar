import React from 'react';
import { CalendarDays } from 'lucide-react';

export default function StepReservation({
  hasScholarship,
  onScholarshipToggle,
  displayVacancies,
  vacancies,
  selectedUrgency,
  onUrgencySelect,
  showPrices = true
}) {
  return (
    <div className="space-y-3.5 animate-slideUpFade">
      <div className="space-y-2 text-xs py-1">
        <p className="text-gray-800 leading-relaxed">
          <strong className="text-[#050521] font-extrabold">Ubicación:</strong> Frimadi International Montessori
        </p>

        {showPrices && (
          <>
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
          </>
        )}

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
          onChange={(e) => onScholarshipToggle(e.target.checked)}
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
              ? (showPrices
                  ? '¡Beca activa! Mensualidad a $2,000 e Inscripción a $500.'
                  : '¡Beca activa! Descuento preferencial aplicado a tu inscripción.')
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
          const isSelected = selectedUrgency === option.value;
          const isDisabled = option.disabled;

          return (
            <div
              key={option.value}
              onClick={() => {
                if (isDisabled) return;
                onUrgencySelect(option.value);
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
  );
}
