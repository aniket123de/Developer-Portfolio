import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ minDisplayTime = 6000 }) => {
  const [percentage, setPercentage] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  // Dynamic color based on percentage
  const hue = percentage * 3.6;
  const dotColor = `hsl(${hue}, 80%, 60%)`;

  useEffect(() => {
    const startTime = Date.now();
    let interval;

    const updateLoader = () => {
      setPercentage(prev => {
        if (prev >= 100) {
          // Check if minimum display time has elapsed
          const elapsed = Date.now() - startTime;
          if (elapsed >= minDisplayTime) {
            clearInterval(interval);
            setShowLoader(false);
          }
          return 100;
        }
        return prev + 0.5; // Slower increment (0.5% instead of 1%)
      });
    };

    interval = setInterval(updateLoader, 50); // Longer interval (50ms instead of 30ms)

    return () => clearInterval(interval);
  }, [minDisplayTime]);

  // Inject keyframes globally
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slow-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes slow-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes slow-float {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0.3); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!showLoader) return null;

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
      zIndex: 9999
    }}>
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        {/* Hexagon Border - Slower rotation */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
          animation: 'slow-rotate 6s linear infinite' // Slower rotation (6s)
        }}></div>

        {/* Rotating Dot - Slower rotation */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'slow-rotate 4s linear infinite' // Slower rotation (4s)
        }}>
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '16px',
            background: dotColor,
            borderRadius: '50%',
            boxShadow: `0 0 20px ${dotColor}`
          }}></div>
        </div>

        {/* Floating Particles - Slower animation */}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[0, 0.5, 1, 1.5, 2].map((delay, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: '#fff',
              borderRadius: '50%',
              animation: `slow-float 3s infinite ${delay}s`, // Slower float (3s)
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`
            }}></div>
          ))}
        </div>

        {/* Percentage Text - Slower pulse */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 15px rgba(255,255,255,0.5)',
          animation: 'slow-pulse 3s ease-in-out infinite' // Slower pulse (3s)
        }}>
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;