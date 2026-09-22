import React, { useEffect, useRef } from 'react';

export default function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Ajuste de DPI y tamaño de pantalla
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initStars();
    };

    // Estructuras de datos para las estrellas
    let dotStars = [];
    let sparkleStars = [];

    // Inicializador de estrellas
    const initStars = () => {
      dotStars = [];
      sparkleStars = [];

      // 1. Puntos micro-estelares (fondo denso)
      const dotCount = Math.floor((width * height) / 4500); // Adaptable a pantalla
      for (let i = 0; i < dotCount; i++) {
        dotStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.3 + 0.4,
          baseOpacity: Math.random() * 0.7 + 0.25,
          opacity: Math.random() * 0.7 + 0.25,
          twinkleSpeed: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
          vy: (Math.random() * 0.02 + 0.005) * -1 // Deriva hacia arriba extremadamente suave y relajada
        });
      }

      // 2. Estrellas de destello de 4 puntas (como en la foto de referencia)
      const sparkleCount = Math.max(16, Math.floor((width * height) / 38000));
      for (let i = 0; i < sparkleCount; i++) {
        sparkleStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 10 + 6, // Tamaño de las puntas
          baseOpacity: Math.random() * 0.6 + 0.4,
          opacity: Math.random() * 0.6 + 0.4,
          twinkleSpeed: Math.random() * 0.005 + 0.002,
          twinkleFactor: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.008 + 0.003, // Pulsación muy lenta y tranquila
          vx: (Math.random() - 0.5) * 0.015,
          vy: (Math.random() * 0.015 + 0.005) * -1
        });
      }
    };

    // Dibujar estrella de 4 puntas estilizada (+ destello simétrico)
    const drawSparkleStar = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);

      // Resplandor tenue exterior
      ctx.shadowColor = 'rgba(255, 248, 230, 0.9)';
      ctx.shadowBlur = size * 1.2;

      ctx.fillStyle = `rgba(255, 252, 245, ${opacity})`;

      const outer = size;

      // Estrella de 4 puntas simétricas (+ destello horizontal y vertical igual)
      ctx.beginPath();
      ctx.moveTo(0, -outer);
      ctx.quadraticCurveTo(0, 0, outer, 0);
      ctx.quadraticCurveTo(0, 0, 0, outer);
      ctx.quadraticCurveTo(0, 0, -outer, 0);
      ctx.quadraticCurveTo(0, 0, 0, -outer);
      ctx.closePath();
      ctx.fill();

      // Centro brillante
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity + 0.3)})`;
      ctx.shadowBlur = size * 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1, outer * 0.15), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Dibujar punto estelar
    const drawDotStar = (x, y, radius, opacity) => {
      ctx.save();
      ctx.fillStyle = `rgba(255, 253, 247, ${opacity})`;
      ctx.shadowColor = `rgba(255, 253, 247, ${opacity * 0.6})`;
      ctx.shadowBlur = radius * 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Parámetro para suavidad del tiempo
    let time = 0;

    // Loop principal de animación
    const render = () => {
      time += 0.015;

      // Limpiar canvas con fondo cósmico muy oscuro (#040416 a #050521)
      ctx.clearRect(0, 0, width, height);

      // Fondo base oscuro suave
      ctx.fillStyle = '#040416';
      ctx.fillRect(0, 0, width, height);

      // Gradiente radial tenue en la esquina superior para profundidad
      const bgGlow = ctx.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.3, Math.max(width, height) * 0.8);
      bgGlow.addColorStop(0, 'rgba(58, 54, 156, 0.25)'); // Morado TecStars
      bgGlow.addColorStop(0.6, 'rgba(5, 5, 33, 0.4)');
      bgGlow.addColorStop(1, 'rgba(3, 3, 18, 0.95)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // 1. Renderizar puntos estelares
      for (let i = 0; i < dotStars.length; i++) {
        const star = dotStars[i];

        // Titileo
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 0.95 || star.opacity < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Movimiento flotante tenue
        star.y += star.vy;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        drawDotStar(star.x, star.y, star.radius, star.opacity);
      }

      // 2. Renderizar estrellas de 4 puntas
      for (let i = 0; i < sparkleStars.length; i++) {
        const star = sparkleStars[i];

        // Titileo pulsante suave con seno
        star.twinkleFactor += star.pulseSpeed;
        const opacity = star.baseOpacity + Math.sin(star.twinkleFactor) * 0.35;
        const currentOpacity = Math.max(0.1, Math.min(1, opacity));

        // Pulsación sutil de tamaño
        const currentSize = star.size + Math.sin(star.twinkleFactor * 0.7) * 1.5;

        // Movimiento flotante
        star.x += star.vx;
        star.y += star.vy;

        if (star.y < -30) {
          star.y = height + 30;
          star.x = Math.random() * width;
        }
        if (star.x < -30) star.x = width + 30;
        if (star.x > width + 30) star.x = -30;

        drawSparkleStar(star.x, star.y, Math.max(3, currentSize), currentOpacity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full transition-opacity duration-700"
      style={{ background: '#040416' }}
    />
  );
}
