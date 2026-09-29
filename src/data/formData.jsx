import React from 'react';
import { 
  Rocket, 
  Gamepad2, 
  Code2, 
  Bot, 
  MonitorPlay, 
  Compass 
} from 'lucide-react';

export const COLORS = {
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

export const FORM_STEPS = [
  {
    id: 1,
    title: "¿Qué edad tiene tu pequeño amante de la tecnología?",
    subtitle: "Personalizamos la experiencia según su etapa de desarrollo.",
    type: "radio",
    field: "age",
    options: [
      { 
        value: "5-9", 
        label: "5 a 9 años", 
        description: "Iniciación, lógica y robótica educativa", 
        icon: <Rocket size={22} className="text-[#7588e0]" /> 
      },
      { 
        value: "10-14", 
        label: "10 a 14 años", 
        description: "Robótica avanzada y creación de videojuegos", 
        icon: <Gamepad2 size={22} className="text-[#7588e0]" /> 
      },
      { 
        value: "14+", 
        label: "14+ años", 
        description: "Programación real y desarrollo de software", 
        icon: <Code2 size={22} className="text-[#7588e0]" /> 
      }
    ]
  },
  {
    id: 2,
    title: "¿Qué es lo que más le gustaría aprender?",
    subtitle: "Queremos potenciar su pasión tecnológica desde el primer día.",
    type: "radio",
    field: "interest",
    options: [
      { 
        value: "robots", 
        label: "Armar y programar robots", 
        icon: <Bot size={22} className="text-[#7588e0]" /> 
      },
      { 
        value: "games", 
        label: "Crear sus propios videojuegos", 
        icon: <Gamepad2 size={22} className="text-[#7588e0]" /> 
      },
      { 
        value: "design", 
        label: "Programación y diseño digital", 
        icon: <MonitorPlay size={22} className="text-[#7588e0]" /> 
      },
      { 
        value: "orientation", 
        label: "Quiero orientación del profesor", 
        icon: <Compass size={22} className="text-[#7588e0]" /> 
      }
    ]
  },
  {
    id: 3,
    title: "Aparta su espacio.",
    subtitle: "Información del programa presencial y fechas de inicio disponibles.",
    type: "reservation",
    field: "reservation"
  },
  {
    id: 4,
    title: "¡Misión casi lista! Déjanos tus datos",
    subtitle: "Te contactaremos desde TecStars por WhatsApp para enviarte los horarios.",
    type: "contact",
    field: "contact"
  }
];
