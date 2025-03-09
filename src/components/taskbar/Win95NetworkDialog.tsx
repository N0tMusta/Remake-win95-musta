
import React from 'react';
import { Network, Computer, Globe } from 'lucide-react';

interface Win95NetworkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  connectToNetwork: () => void;
}

const Win95NetworkDialog: React.FC<Win95NetworkDialogProps> = ({ 
  isOpen, 
  onClose,
  connectToNetwork
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div className="win95-window p-2 w-80" onClick={(e) => e.stopPropagation()}>
        <div className="win95-titlebar mb-2">
          <div className="flex items-center gap-1">
            <Network size={14} />
            <span>Dial-Up Networking</span>
          </div>
          <button className="win95-title-button" onClick={onClose}>
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="p-2">
          <div className="mb-4">
            <div className="win95-inset p-3 mb-3 bg-white">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Computer size={20} />
                <div className="text-sm">Connected to:</div>
                <Globe size={20} />
              </div>
              <div className="text-center font-bold mb-2">Internet Service Provider</div>
              <div className="text-xs text-center">Phone number: 1-800-INTERNET</div>
            </div>
            
            <div className="flex flex-col space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs">Username:</span>
                <input type="text" className="win95-inset px-2 py-1 text-xs bg-white w-40" defaultValue="user" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Password:</span>
                <input type="password" className="win95-inset px-2 py-1 text-xs bg-white w-40" defaultValue="•••••••" />
              </div>
              <div className="flex items-center gap-1">
                <input type="checkbox" id="save-password" className="win95-checkbox" defaultChecked />
                <label htmlFor="save-password" className="text-xs">Save password</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button 
              className="win95-button px-4 py-1"
              onClick={connectToNetwork}
            >
              Connect
            </button>
            <button 
              className="win95-button px-3 py-1" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Win95NetworkDialog;
