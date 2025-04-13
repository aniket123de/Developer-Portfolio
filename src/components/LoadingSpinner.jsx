import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ minDisplayTime = 4000 }) => {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  // Dynamic color scheme
  const hue = percentage * 3.6;
  const primaryColor = `hsl(${hue}, 80%, 60%)`;
  const secondaryColor = `hsl(${hue + 60}, 80%, 60%)`;

  useEffect(() => {
    const startTime = Date.now();
    let interval;

    const updateLoader = () => {
      setPercentage(prev => {
        if (prev >= 100) {
          const elapsed = Date.now() - startTime;
          if (elapsed >= minDisplayTime) {
            setOpacity(0);
            setTimeout(() => setIsVisible(false), 500);
          }
          return 100;
        }
        return prev + 1;
      });
    };

    interval = setInterval(updateLoader, 30);
    return () => clearInterval(interval);
  }, [minDisplayTime]);

  // Particle system configurations
  const particleSystems = [
    { count: 12, size: 6, speed: 2.5, radius: 45, direction: 1 },
    { count: 18, size: 4, speed: 3.2, radius: 65, direction: -1 },
    { count: 24, size: 3, speed: 4.0, radius: 85, direction: 1 }
  ];

  // Inject dynamic keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particle-orbit {
        0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
      }

      @keyframes particle-pulse {
        0%, 100% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.2); opacity: 1; }
      }

      @keyframes core-glow {
        0%, 100% { filter: brightness(1) contrast(1); }
        50% { filter: brightness(1.2) contrast(1.5); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'radial-gradient(circle at center, #0a0a1a 0%, #000000 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      opacity,
      transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        {/* Quantum Core */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          background: `radial-gradient(circle at center, ${primaryColor} 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(15px)',
          animation: 'core-glow 2s ease-in-out infinite',
          boxShadow: `0 0 60px ${primaryColor}`
        }} />

        {/* Particle Systems */}
        {particleSystems.map((system, idx) => (
          <div key={idx} style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            animation: `particle-orbit ${system.speed}s linear infinite`,
            animationDirection: system.direction > 0 ? 'normal' : 'reverse'
          }}>
            {Array.from({ length: system.count }).map((_, i) => {
              const angle = (i * 360) / system.count;
              return (
                <div key={i} style={{
                  position: 'absolute',
                  width: `${system.size}px`,
                  height: `${system.size}px`,
                  background: `radial-gradient(circle, ${secondaryColor} 30%, transparent 70%)`,
                  borderRadius: '50%',
                  transform: `rotate(${angle}deg) translateX(${system.radius}px)`,
                  animation: 'particle-pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                  filter: `blur(${system.size / 2}px)`,
                  boxShadow: `0 0 15px ${secondaryColor}`
                }} />
              );
            })}
          </div>
        ))}

        {/* Floating Quarks */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-orbit ${Math.random() * 4 + 3}s linear infinite`,
              filter: 'blur(1px)',
              transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`
            }} />
          ))}
        </div>

        {/* Holographic Display */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
          fontWeight: 700,
          color: primaryColor,
          textShadow: `0 0 25px ${primaryColor}`,
          fontFamily: 'monospace',
          letterSpacing: '2px',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '8px 16px',
          borderRadius: '8px',
          backdropFilter: 'blur(4px)'
        }}>
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;