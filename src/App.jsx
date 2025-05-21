import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, VisitorsInfo, GithubStats } from "./components";
import herobg from "./assets/herobg.png";
import LoadingSpinner from "./components/LoadingSpinner"; // Import LoadingSpinner
import { Analytics } from "@vercel/analytics/react"; // Import Analytics from Vercel

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 6 seconds (you can replace this with actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Back to 6 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />; // Show the loading spinner
  }

  return (
    <BrowserRouter>
      <div
        style={{
          position: "relative",
          zIndex: 0,
          backgroundColor: "#050816", // Set default background color to #050816
        }}
      >
        <div
          style={{
            backgroundImage: `url(${herobg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Navbar />
          <Hero />
        </div>
        <div style={{ backgroundColor: "#050816", position: "relative" }}>
          <About />
        </div>
        <div style={{ backgroundColor: "#050816", position: "relative" }}>
          <Experience />
        </div>
        <div style={{ position: "relative", zIndex: 0, backgroundColor: "#050816" }}>
          <Tech />
          <StarsCanvas />
        </div>
        <div style={{ backgroundColor: "#050816" }}>
          <Works />
        </div>
        <div style={{ backgroundColor: "#050816" }}>
          <GithubStats />
        </div>
        <div style={{ backgroundColor: "#050816" }}>
          <Feedbacks />
        </div>
        <div style={{ marginTop: "50px", backgroundColor: "#050816" }}>
          <VisitorsInfo />
        </div>
        <div style={{ position: "relative", zIndex: 0, backgroundColor: "#050816" }}>
          <Contact />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
            <StarsCanvas />
          </div>
        </div>
        <Analytics /> {/* Add the Vercel Analytics component here */}
      </div>
    </BrowserRouter>
  );
};

export default App;
