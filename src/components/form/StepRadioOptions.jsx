import React from 'react';

export default function StepRadioOptions({
  currentStepData,
  stepData,
  selectedValue,
  onSelect,
  onSelectOption
}) {
  const data = currentStepData || stepData;
  const handleSelect = onSelect || onSelectOption;
  const options = data?.options || [];

  return (
    <div className="space-y-2.5 animate-slideUpFade">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;

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
              name={data?.field}
              value={option.value}
              checked={isSelected}
              onChange={() => handleSelect && handleSelect(option.value)}
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
  );
}
