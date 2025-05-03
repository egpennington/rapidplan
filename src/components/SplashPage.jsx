import React, { useState } from 'react';


export default function SplashPage() {
    const [showSplash, setShowSplash] = useState(true);
  
    const handleStart = () => {
      setShowSplash(false);
    };
  
    return (
      <>
        {showSplash ? (
          <div className="splash-screen" onClick={handleStart}>
            <img src="./images/splash.png" alt="RapidPlan Splash" className="splash-image" />
          </div>
        ) : (
          <MainApp />
        )}
      </>
    );
  }