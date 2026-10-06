import React from 'react';
import { COLORS } from '../../data/formData';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / (totalSteps - 1)) * 100;
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
}
