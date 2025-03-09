
import React, { useState, useEffect } from 'react';

// Change from export const Clock to export const Win95Clock
export const Win95Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="win95-inset px-2 py-1 bg-win95-gray text-black text-xs flex items-center">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

// Add default export for convenience
export default Win95Clock;
