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
            // Start fade out
            setOpacity(0);
            setTimeout(() => {
              setIsVisible(false);
            }, 500); // Match this with the transition duration
          }
          return 100;
        }
        return prev + 1; // Faster increment (1% instead of 0.5%)
      });
    };

    interval = setInterval(updateLoader, 30); // Faster interval (30ms instead of 50ms)

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
      <div style={{ position: 'relative', width: '125px', height: '125px' }}>
        {/* Hexagon Border - Faster rotation */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
          animation: 'rotate 3s linear infinite' // Faster rotation (3s)
        }}></div>

        {/* Rotating Dot - Faster rotation */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'rotate 2s linear infinite' // Faster rotation (2s)
        }}>
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            background: dotColor,
            borderRadius: '50%',
            boxShadow: `0 0 15px ${dotColor}`,
            transition: 'all 0.3s ease-out'
          }}></div>
        </div>

        {/* Floating Particles - Faster animation */}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '9px',
              height: '9px',
              background: '#fff',
              borderRadius: '50%',
              animation: `float 2s infinite ${delay}s`, // Faster float (2s)
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`
            }}></div>
          ))}
        </div>

        {/* Percentage Text - Faster pulse */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.7rem',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 10px rgba(255,255,255,0.5)',
          animation: 'pulse 2s ease-in-out infinite' // Faster pulse (2s)
        }}>
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;