
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NetworkContextType {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const useNetworkStatus = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetworkStatus must be used within a NetworkStatusProvider');
  }
  return context;
};

export const NetworkStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <NetworkContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};
