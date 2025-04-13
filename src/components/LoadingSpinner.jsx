import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ minDisplayTime = 4000 }) => {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  // Dynamic color based on percentage
  const hue = percentage * 3.6;
  const dotColor = `hsl(${hue}, 80%, 60%)`;

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

  // Inject keyframes globally
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-80px) scale(0.3); opacity: 0; }
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
      background: '#0f0f1f',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 0.5s ease-out'
    }}>
      <div style={{ position: 'relative', width: '150px', height: '150px' }}>
        {/* Smooth Gradient Ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `conic-gradient(
            rgba(99, 102, 241, 0.8) 0%,
            rgba(99, 102, 241, 0.4) 30%,
            transparent 60%
          )`,
          filter: 'blur(12px)',
          animation: 'rotate 2.5s linear infinite'
        }}></div>

        {/* Progress Track */}
        <svg style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)'
        }}>
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4%"
          />
        </svg>

        {/* Central Orb */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '30%',
          background: dotColor,
          borderRadius: '50%',
          filter: `blur(15px)`,
          boxShadow: `0 0 40px ${dotColor}`,
          transition: 'all 0.3s ease-out'
        }}></div>

        {/* Floating Particles */}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: `hsl(${i * 72}, 80%, 60%)`,
              borderRadius: '50%',
              animation: `float 2s infinite ${delay}s`,
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              boxShadow: `0 0 15px hsl(${i * 72}, 80%, 60%)`
            }}></div>
          ))}
        </div>

        {/* Percentage Display */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 15px rgba(255,255,255,0.3)',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;