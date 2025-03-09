
import React, { useState } from 'react';
import Win95Clock from './Win95Clock';
import Win95StartMenu from './taskbar/Win95StartMenu';
import Win95TaskbarItem from './taskbar/Win95TaskbarItem';
import Win95RunDialog from './taskbar/Win95RunDialog';
import Win95NetworkDialog from './taskbar/Win95NetworkDialog';
import Win95NetworkStatus from './taskbar/Win95NetworkStatus';
import { useNetworkStatus } from './NetworkStatusProvider';
import { Network } from 'lucide-react';

interface Window {
  id: string;
  title: string;
  icon: React.ReactNode;
  isMinimized: boolean;
}

interface Win95TaskbarProps {
  windows: Window[];
  activeWindow: string | null;
  startMenuOpen: boolean;
  toggleStartMenu: () => void;
  restoreWindow: (id: string) => void;
  openNotepad: () => void;
  openMyComputer: () => void;
  openPaintApp: () => void;
  openInternetExplorer: () => void;
  openCalendar: () => void;
  openCalculator: () => void;
  openMediaPlayer: () => void;
  openHelpCenter: () => void;
}

const Win95Taskbar: React.FC<Win95TaskbarProps> = ({
  windows,
  activeWindow,
  startMenuOpen,
  toggleStartMenu,
  restoreWindow,
  openNotepad,
  openMyComputer,
  openPaintApp,
  openInternetExplorer,
  openCalendar,
  openCalculator,
  openMediaPlayer,
  openHelpCenter
}) => {
  const [runDialogOpen, setRunDialogOpen] = useState(false);
  const [networkDialogOpen, setNetworkDialogOpen] = useState(false);
  const { isConnected, setIsConnected } = useNetworkStatus();

  const showRunDialog = () => {
    setRunDialogOpen(true);
    toggleStartMenu();
  };

  const toggleNetworkConnection = () => {
    if (!isConnected) {
      setNetworkDialogOpen(true);
    } else {
      setIsConnected(false);
      const disconnectNotification = document.createElement('div');
      disconnectNotification.className = 'win95-notification';
      disconnectNotification.innerHTML = `
        <div class="win95-window p-2 absolute bottom-16 right-2 w-64 shadow-lg z-50">
          <div class="win95-titlebar mb-1">
            <div class="flex items-center gap-1">
              <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-network"><rect x="9" y="2" width="6" height="6" rx="2"></rect><rect x="16" y="16" width="6" height="6" rx="2"></rect><rect x="2" y="16" width="6" height="6" rx="2"></rect><path d="M5 16v-4h14v4"></path><path d="M12 12V8"></path></svg>
                <span>Network Status</span>
              </div>
            </div>
          </div>
          <div class="p-2 text-sm">
            You have been disconnected from the network.
          </div>
        </div>
      `;
      document.body.appendChild(disconnectNotification);
      
      setTimeout(() => {
        document.body.removeChild(disconnectNotification);
      }, 3000);
    }
  };

  const connectToNetwork = () => {
    setIsConnected(true);
    setNetworkDialogOpen(false);
    
    const connectNotification = document.createElement('div');
    connectNotification.className = 'win95-notification';
    connectNotification.innerHTML = `
      <div class="win95-window p-2 absolute bottom-16 right-2 w-64 shadow-lg z-50">
        <div class="win95-titlebar mb-1">
          <div class="flex items-center gap-1">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-network"><rect x="9" y="2" width="6" height="6" rx="2"></rect><rect x="16" y="16" width="6" height="6" rx="2"></rect><rect x="2" y="16" width="6" height="6" rx="2"></rect><path d="M5 16v-4h14v4"></path><path d="M12 12V8"></path></svg>
              <span>Network Status</span>
            </div>
          </div>
        </div>
        <div class="p-2 text-sm">
          You are now connected to the Internet.
        </div>
      </div>
    `;
    document.body.appendChild(connectNotification);
    
    setTimeout(() => {
      document.body.removeChild(connectNotification);
    }, 3000);
  };

  return (
    <div className="win95-taskbar">
      <button 
        className={`win95-start-button ${startMenuOpen ? 'active' : ''}`}
        onClick={toggleStartMenu}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect width="16" height="16" fill="#FF0000"/>
          <rect x="2" y="2" width="3" height="3" fill="#00FF00"/>
          <rect x="5" y="2" width="3" height="3" fill="#0000FF"/>
          <rect x="8" y="2" width="3" height="3" fill="#FFFF00"/>
          <rect x="11" y="2" width="3" height="3" fill="#00FFFF"/>
          <rect x="2" y="5" width="3" height="3" fill="#FF00FF"/>
          <rect x="5" y="5" width="3" height="3" fill="#FFFFFF"/>
          <rect x="8" y="5" width="3" height="3" fill="#808080"/>
          <rect x="11" y="5" width="3" height="3" fill="#000000"/>
          <rect x="2" y="8" width="3" height="3" fill="#FF8080"/>
          <rect x="5" y="8" width="3" height="3" fill="#80FF80"/>
          <rect x="8" y="8" width="3" height="3" fill="#8080FF"/>
          <rect x="11" y="8" width="3" height="3" fill="#FFFF80"/>
          <rect x="2" y="11" width="3" height="3" fill="#80FFFF"/>
          <rect x="5" y="11" width="3" height="3" fill="#FF80FF"/>
          <rect x="8" y="11" width="3" height="3" fill="#FFFFFF"/>
          <rect x="11" y="11" width="3" height="3" fill="#000080"/>
        </svg>
        <span>Start</span>
      </button>
      
      <div className="win95-divider"></div>
      
      {windows.map((window) => (
        <Win95TaskbarItem
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          isActive={activeWindow === window.id}
          isMinimized={window.isMinimized}
          onClick={() => restoreWindow(window.id)}
        />
      ))}
      
      <div className="flex-1"></div>
      
      <Win95NetworkStatus onClick={toggleNetworkConnection} />
      
      <Win95Clock />
      
      <Win95StartMenu
        isOpen={startMenuOpen}
        onClose={toggleStartMenu}
        openNotepad={openNotepad}
        openMyComputer={openMyComputer}
        openPaintApp={openPaintApp}
        openInternetExplorer={openInternetExplorer}
        openCalendar={openCalendar}
        openCalculator={openCalculator}
        openMediaPlayer={openMediaPlayer}
        openHelpCenter={openHelpCenter}
        showRunDialog={showRunDialog}
      />
      
      <Win95RunDialog
        isOpen={runDialogOpen}
        onClose={() => setRunDialogOpen(false)}
      />
      
      <Win95NetworkDialog
        isOpen={networkDialogOpen}
        onClose={() => setNetworkDialogOpen(false)}
        connectToNetwork={connectToNetwork}
      />
    </div>
  );
};

export default Win95Taskbar;
