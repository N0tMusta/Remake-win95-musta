
import React from 'react';
import { Clock } from './Win95Clock';
import { Computer, FileText, Settings, Folder, Image } from 'lucide-react';

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
}

const Win95Taskbar: React.FC<Win95TaskbarProps> = ({
  windows,
  activeWindow,
  startMenuOpen,
  toggleStartMenu,
  restoreWindow,
  openNotepad,
  openMyComputer
}) => {
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
        <button
          key={window.id}
          className={`win95-taskbar-item ${activeWindow === window.id && !window.isMinimized ? 'active' : ''}`}
          onClick={() => {
            if (window.isMinimized) {
              restoreWindow(window.id);
            } else if (activeWindow === window.id) {
              restoreWindow(window.id);
            } else {
              restoreWindow(window.id);
            }
          }}
        >
          <span>{window.icon}</span>
          <span className="truncate">{window.title}</span>
        </button>
      ))}
      
      <div className="flex-1"></div>
      
      <Clock />
      
      {startMenuOpen && (
        <div className="win95-start-menu">
          <div className="bg-win95-blue text-white font-bold p-4 absolute left-0 top-0 bottom-0 w-10 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Windows 95
          </div>
          
          <div className="ml-10">
            <button className="win95-start-menu-item" onClick={openMyComputer}>
              <Computer size={16} className="shrink-0" />
              <span>My Computer</span>
            </button>
            
            <button className="win95-start-menu-item" onClick={openNotepad}>
              <FileText size={16} className="shrink-0" />
              <span>Notepad</span>
            </button>
            
            <div className="h-px bg-win95-border-dark shadow-[0_1px_0_theme(colors.win95.border.light)] my-1"></div>
            
            <button className="win95-start-menu-item">
              <Settings size={16} className="shrink-0" />
              <span>Control Panel</span>
            </button>
            
            <div className="h-px bg-win95-border-dark shadow-[0_1px_0_theme(colors.win95.border.light)] my-1"></div>
            
            <button className="win95-start-menu-item">
              <FileText size={16} className="shrink-0" />
              <span>Run...</span>
            </button>
            
            <button className="win95-start-menu-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2a6 6 0 0 0 0 12A6 6 0 0 0 8 2zm0 10.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm-3.5-4h7v1h-7v-1z"/>
              </svg>
              <span>Shut Down...</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Win95Taskbar;
