import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ minDisplayTime = 4000 }) => {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const startTime = Date.now();
    let interval;

    const updateLoader = () => {
      setPercentage(prev => {
        if (prev >= 100) {
          const elapsed = Date.now() - startTime;
          if (elapsed >= minDisplayTime) {
            setOpacity(0);
            setTimeout(() => {
              setIsVisible(false);
            }, 800);
          }
          return 100;
        }
        return prev + 0.8;
      });
    };

    interval = setInterval(updateLoader, 25);
    return () => clearInterval(interval);
  }, [minDisplayTime]);

  // Inject keyframes globally
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes charging {
        0% { box-shadow: inset 0 0 10px rgba(145, 94, 255, 0.2); }
        50% { box-shadow: inset 0 0 20px rgba(145, 94, 255, 0.4); }
        100% { box-shadow: inset 0 0 10px rgba(145, 94, 255, 0.2); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!isVisible) return null;

  const getBatteryColor = () => {
    if (percentage < 20) return '#ff4444';
    if (percentage < 50) return '#ffbb33';
    return '#915EFF';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      background: 'radial-gradient(circle at center, #151030 0%, #0a0a1a 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 0.8s ease-out'
    }}>
      {/* Battery Container */}
      <div style={{
        width: '200px',
        height: '100px',
        border: '3px solid #ffffff',
        borderRadius: '15px',
        position: 'relative',
        padding: '2px',
        marginBottom: '20px'
      }}>
        {/* Battery Tip */}
        <div style={{
          width: '15px',
          height: '40px',
          background: '#ffffff',
          position: 'absolute',
          right: '-18px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '0 5px 5px 0'
        }}></div>

        {/* Battery Fill */}
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: getBatteryColor(),
          borderRadius: '10px',
          transition: 'all 0.3s ease',
          animation: 'charging 1.5s ease-in-out infinite',
          opacity: 0.8
        }}></div>
      </div>

      {/* Percentage Text */}
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
        textShadow: '0 0 10px rgba(145, 94, 255, 0.5)'
      }}>
        {percentage.toFixed(0)}%
      </div>

      {/* Loading Text */}
      <div style={{
        marginTop: '10px',
        fontSize: '1.2rem',
        color: '#915EFF',
        fontFamily: "'Poppins', sans-serif",
        opacity: 0.8
      }}>
        {percentage < 100 ? 'Charging...' : 'Ready!'}
      </div>
    </div>
  );
};

export default LoadingSpinner;