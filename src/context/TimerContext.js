import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [globalTimeLeft, setGlobalTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    if (isQuizActive && globalTimeLeft > 0) {
      const timer = setInterval(() => {
        setGlobalTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isQuizActive, globalTimeLeft]);

  const startQuiz = () => {
    setIsQuizActive(true);
    setGlobalTimeLeft(30 * 60);
  };

  const stopQuiz = () => {
    setIsQuizActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <TimerContext.Provider value={{
      globalTimeLeft,
      startQuiz,
      stopQuiz,
      formatTime,
      isQuizActive
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);