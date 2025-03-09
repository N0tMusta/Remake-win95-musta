
import React from 'react';
import { Network, Wifi } from 'lucide-react';
import { useNetworkStatus } from '../NetworkStatusProvider';

interface Win95NetworkStatusProps {
  onClick: () => void;
}

const Win95NetworkStatus: React.FC<Win95NetworkStatusProps> = ({ onClick }) => {
  const { isConnected } = useNetworkStatus();
  
  return (
    <button 
      className="win95-inset px-2 py-1 bg-win95-gray text-black text-xs flex items-center mr-1"
      onClick={onClick}
      title={isConnected ? "Connected to Internet" : "Not connected"}
    >
      {isConnected ? (
        <Wifi size={16} className="text-green-600" />
      ) : (
        <Network size={16} className="text-gray-600" />
      )}
    </button>
  );
};

export default Win95NetworkStatus;
