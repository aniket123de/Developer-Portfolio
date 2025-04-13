import React, { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop the loading once it reaches 100%
          return 100;
        }
        return prev + 5; // Increment by 5% every 100ms
      });
    }, 100);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-black-100">
      <div className="text-center">
        <div className="dotted-spinner mx-auto mb-4"></div>
        <p className="text-white text-xl font-semibold">{loadingPercentage}%</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
