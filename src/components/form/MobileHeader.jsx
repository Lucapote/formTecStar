import React from 'react';
import { MapPin } from 'lucide-react';

export default function MobileHeader() {
  return (
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
  );
}
