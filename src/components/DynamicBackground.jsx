import React, { useEffect, useRef } from 'react';

export default function DynamicBackground({ sidesOnly = false }) {
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

    const getXPosition = () => {
      if (!sidesOnly) return Math.random() * width;
      // En modo sidesOnly: colocar estrellas únicamente en los laterales (20% izquierdo y 20% derecho)
      const sideMargin = width * 0.20;
      const isLeft = Math.random() < 0.5;
      if (isLeft) {
        return Math.random() * sideMargin;
      } else {
        return width - sideMargin + Math.random() * sideMargin;
      }
    };

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
      const dotCount = sidesOnly 
        ? Math.floor((width * height) / 8000) 
        : Math.floor((width * height) / 4500);

      for (let i = 0; i < dotCount; i++) {
        dotStars.push({
          x: getXPosition(),
          y: Math.random() * height,
          radius: sidesOnly ? (Math.random() * 0.8 + 0.3) : (Math.random() * 1.3 + 0.4),
          baseOpacity: sidesOnly ? (Math.random() * 0.4 + 0.15) : (Math.random() * 0.7 + 0.25),
          opacity: sidesOnly ? (Math.random() * 0.4 + 0.15) : (Math.random() * 0.7 + 0.25),
          twinkleSpeed: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
          vy: (Math.random() * 0.02 + 0.005) * -1
        });
      }

      // 2. Estrellas de destello de 4 puntas
      const sparkleCount = sidesOnly
        ? Math.max(8, Math.floor((width * height) / 60000))
        : Math.max(16, Math.floor((width * height) / 38000));

      for (let i = 0; i < sparkleCount; i++) {
        sparkleStars.push({
          x: getXPosition(),
          y: Math.random() * height,
          size: sidesOnly ? (Math.random() * 2.5 + 2) : (Math.random() * 10 + 6), // Tamaño pequeño en sidesOnly
          baseOpacity: sidesOnly ? (Math.random() * 0.4 + 0.2) : (Math.random() * 0.6 + 0.4),
          opacity: sidesOnly ? (Math.random() * 0.4 + 0.2) : (Math.random() * 0.6 + 0.4),
          twinkleSpeed: Math.random() * 0.005 + 0.002,
          twinkleFactor: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.008 + 0.003,
          vx: (Math.random() - 0.5) * 0.01,
          vy: (Math.random() * 0.015 + 0.005) * -1
        });
      }
    };

    // Dibujar estrella de 4 puntas estilizada (+ destello simétrico)
    const drawSparkleStar = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);

      // Resplandor tenue exterior
      ctx.shadowColor = 'rgba(255, 248, 230, 0.7)';
      ctx.shadowBlur = size * 1.1;

      ctx.fillStyle = `rgba(255, 252, 245, ${opacity})`;

      const outer = size;

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
      ctx.shadowBlur = size * 0.4;
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.8, outer * 0.15), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Dibujar punto estelar
    const drawDotStar = (x, y, radius, opacity) => {
      ctx.save();
      ctx.fillStyle = `rgba(255, 253, 247, ${opacity})`;
      ctx.shadowColor = `rgba(255, 253, 247, ${opacity * 0.5})`;
      ctx.shadowBlur = radius * 1.5;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Loop principal de animación
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fondo base oscuro suave
      ctx.fillStyle = '#040416';
      ctx.fillRect(0, 0, width, height);

      // Gradiente radial tenue en el centro para resaltar la lectura
      const bgGlow = ctx.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, Math.max(width, height) * 0.85);
      bgGlow.addColorStop(0, 'rgba(58, 54, 156, 0.2)'); // Morado TecStars tenue
      bgGlow.addColorStop(0.6, 'rgba(5, 5, 33, 0.5)');
      bgGlow.addColorStop(1, 'rgba(3, 3, 18, 0.98)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // 1. Renderizar puntos estelares
      for (let i = 0; i < dotStars.length; i++) {
        const star = dotStars[i];

        star.opacity += star.twinkleSpeed;
        if (star.opacity > (sidesOnly ? 0.6 : 0.95) || star.opacity < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        star.y += star.vy;
        if (star.y < 0) {
          star.y = height;
          star.x = getXPosition();
        }

        drawDotStar(star.x, star.y, star.radius, star.opacity);
      }

      // 2. Renderizar estrellas de 4 puntas
      for (let i = 0; i < sparkleStars.length; i++) {
        const star = sparkleStars[i];

        star.twinkleFactor += star.pulseSpeed;
        const opacity = star.baseOpacity + Math.sin(star.twinkleFactor) * 0.25;
        const currentOpacity = Math.max(0.1, Math.min(sidesOnly ? 0.6 : 1, opacity));
        const currentSize = star.size + Math.sin(star.twinkleFactor * 0.7) * (sidesOnly ? 0.6 : 1.5);

        star.x += star.vx;
        star.y += star.vy;

        // Mantener dentro de bordes laterales si sidesOnly está activo
        if (sidesOnly) {
          const sideMargin = width * 0.22;
          if (star.x > sideMargin && star.x < width - sideMargin) {
            star.x = getXPosition();
          }
        }

        if (star.y < -20) {
          star.y = height + 20;
          star.x = getXPosition();
        }
        if (star.x < -20) star.x = width + 20;
        if (star.x > width + 20) star.x = -20;

        drawSparkleStar(star.x, star.y, Math.max(1.5, currentSize), currentOpacity);
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
  }, [sidesOnly]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full transition-opacity duration-700"
      style={{ background: '#040416' }}
    />
  );
}
