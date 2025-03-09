
import React, { useState } from 'react';
import { 
  Computer, FileText, Settings, Folder, Image, Mail, Globe, Calendar, 
  Music, Calculator as CalculatorIcon, HelpCircle, Power, User, 
  Monitor, Workflow, Search, Printer, Network, BookOpen, 
  FolderOpen, Lock, BarChart, Cpu, Server, Database, FileArchive 
} from 'lucide-react';
import Win95StartMenuItem from './Win95StartMenuItem';

interface Win95StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openNotepad: () => void;
  openMyComputer: () => void;
  openPaintApp: () => void;
  openInternetExplorer: () => void;
  openCalendar: () => void;
  openCalculator: () => void;
  openMediaPlayer: () => void;
  openHelpCenter: () => void;
  showRunDialog: () => void;
}

const Win95StartMenu: React.FC<Win95StartMenuProps> = ({
  isOpen,
  onClose,
  openNotepad,
  openMyComputer,
  openPaintApp,
  openInternetExplorer,
  openCalendar,
  openCalculator,
  openMediaPlayer,
  openHelpCenter,
  showRunDialog
}) => {
  const [showProgramsMenu, setShowProgramsMenu] = useState(false);
  const [showAccessoriesMenu, setShowAccessoriesMenu] = useState(false);
  const [showGamesMenu, setShowGamesMenu] = useState(false);
  const [showSystemToolsMenu, setShowSystemToolsMenu] = useState(false);
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
  const handleStartItemHover = (menu: string, isHovering: boolean) => {
    if (menu === 'programs') {
      setShowProgramsMenu(isHovering);
      if (!isHovering) {
        setShowAccessoriesMenu(false);
        setShowGamesMenu(false);
        setShowSystemToolsMenu(false);
      }
    } else if (menu === 'accessories') {
      setShowAccessoriesMenu(isHovering);
    } else if (menu === 'games') {
      setShowGamesMenu(isHovering);
    } else if (menu === 'systemTools') {
      setShowSystemToolsMenu(isHovering);
    } else if (menu === 'documents') {
      setShowDocumentsMenu(isHovering);
    } else if (menu === 'settings') {
      setShowSettingsMenu(isHovering);
    }
  };

  const handleStartItemClick = (fn: () => void) => {
    fn();
    closeAllMenus();
  };
  
  const closeAllMenus = () => {
    setShowProgramsMenu(false);
    setShowAccessoriesMenu(false);
    setShowGamesMenu(false);
    setShowSystemToolsMenu(false);
    setShowDocumentsMenu(false);
    setShowSettingsMenu(false);
  };
  
  const handleGameClick = () => {
    onClose();
    alert("Game functionality is not implemented yet!");
  };

  if (!isOpen) return null;

  return (
    <div className="win95-start-menu">
      <div className="bg-win95-blue text-white font-bold p-4 absolute left-0 top-0 bottom-0 w-10 rotate-180" style={{ writingMode: 'vertical-rl' }}>
        Windows 95
      </div>
      
      <div className="ml-10">
        {/* Programs menu */}
        <Win95StartMenuItem
          icon={<Workflow size={16} className="shrink-0" />}
          label="Programs"
          hasSubmenu
          onMouseEnter={() => handleStartItemHover('programs', true)}
          onMouseLeave={() => handleStartItemHover('programs', false)}
        >
          {showProgramsMenu && (
            <div className="win95-submenu">
              {/* Accessories submenu */}
              <Win95StartMenuItem
                icon={<Folder size={16} className="shrink-0" />}
                label="Accessories"
                hasSubmenu
                onMouseEnter={() => handleStartItemHover('accessories', true)}
                onMouseLeave={() => handleStartItemHover('accessories', false)}
              >
                {showAccessoriesMenu && (
                  <div className="win95-submenu right-full top-0">
                    <button 
                      className="win95-start-menu-item"
                      onClick={() => handleStartItemClick(openNotepad)}
                    >
                      <FileText size={16} className="shrink-0" />
                      <span>Notepad</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                      onClick={() => handleStartItemClick(openPaintApp)}
                    >
                      <Image size={16} className="shrink-0" />
                      <span>Paint</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                      onClick={() => handleStartItemClick(openCalculator)}
                    >
                      <CalculatorIcon size={16} className="shrink-0" />
                      <span>Calculator</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                      onClick={() => handleStartItemClick(openCalendar)}
                    >
                      <Calendar size={16} className="shrink-0" />
                      <span>Calendar</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                    >
                      <Calendar size={16} className="shrink-0" />
                      <span>Clock</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                    >
                      <BookOpen size={16} className="shrink-0" />
                      <span>WordPad</span>
                    </button>
                  </div>
                )}
              </Win95StartMenuItem>
              
              {/* Games submenu */}
              <Win95StartMenuItem
                icon={<Folder size={16} className="shrink-0" />}
                label="Games"
                hasSubmenu
                onMouseEnter={() => handleStartItemHover('games', true)}
                onMouseLeave={() => handleStartItemHover('games', false)}
              >
                {showGamesMenu && (
                  <div className="win95-submenu right-full top-0">
                    <button 
                      className="win95-start-menu-item"
                      onClick={handleGameClick}
                    >
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">💣</div>
                      <span>Minesweeper</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                      onClick={handleGameClick}
                    >
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">♣</div>
                      <span>Solitaire</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                      onClick={handleGameClick}
                    >
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">♠</div>
                      <span>FreeCell</span>
                    </button>
                    <button 
                      className="win95-start-menu-item"
                      onClick={handleGameClick}
                    >
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">♥</div>
                      <span>Hearts</span>
                    </button>
                  </div>
                )}
              </Win95StartMenuItem>
              
              {/* System Tools submenu */}
              <Win95StartMenuItem
                icon={<Folder size={16} className="shrink-0" />}
                label="System Tools"
                hasSubmenu
                onMouseEnter={() => handleStartItemHover('systemTools', true)}
                onMouseLeave={() => handleStartItemHover('systemTools', false)}
              >
                {showSystemToolsMenu && (
                  <div className="win95-submenu right-full top-0">
                    <button className="win95-start-menu-item">
                      <Cpu size={16} className="shrink-0" />
                      <span>System Information</span>
                    </button>
                    <button className="win95-start-menu-item">
                      <FileArchive size={16} className="shrink-0" />
                      <span>Disk Defragmenter</span>
                    </button>
                    <button className="win95-start-menu-item">
                      <Server size={16} className="shrink-0" />
                      <span>Backup</span>
                    </button>
                    <button className="win95-start-menu-item">
                      <BarChart size={16} className="shrink-0" />
                      <span>Resource Monitor</span>
                    </button>
                  </div>
                )}
              </Win95StartMenuItem>
              
              <button 
                className="win95-start-menu-item"
                onClick={() => handleStartItemClick(openInternetExplorer)}
              >
                <Globe size={16} className="shrink-0" />
                <span>Internet Explorer</span>
              </button>
              
              <button 
                className="win95-start-menu-item"
                onClick={() => handleStartItemClick(openMediaPlayer)}
              >
                <Music size={16} className="shrink-0" />
                <span>Media Player</span>
              </button>
              
              <button className="win95-start-menu-item">
                <Mail size={16} className="shrink-0" />
                <span>Outlook Express</span>
              </button>
              
              <button className="win95-start-menu-item">
                <Printer size={16} className="shrink-0" />
                <span>Microsoft Fax</span>
              </button>
            </div>
          )}
        </Win95StartMenuItem>
        
        {/* Documents menu */}
        <Win95StartMenuItem
          icon={<FolderOpen size={16} className="shrink-0" />}
          label="Documents"
          hasSubmenu
          onMouseEnter={() => handleStartItemHover('documents', true)}
          onMouseLeave={() => handleStartItemHover('documents', false)}
        >
          {showDocumentsMenu && (
            <div className="win95-submenu">
              <button className="win95-start-menu-item">
                <FileText size={16} className="shrink-0" />
                <span>My Documents</span>
              </button>
              <button className="win95-start-menu-item">
                <FileText size={16} className="shrink-0" />
                <span>Recent Documents</span>
              </button>
            </div>
          )}
        </Win95StartMenuItem>
        
        {/* Settings menu */}
        <Win95StartMenuItem
          icon={<Settings size={16} className="shrink-0" />}
          label="Settings"
          hasSubmenu
          onMouseEnter={() => handleStartItemHover('settings', true)}
          onMouseLeave={() => handleStartItemHover('settings', false)}
        >
          {showSettingsMenu && (
            <div className="win95-submenu">
              <button className="win95-start-menu-item">
                <Monitor size={16} className="shrink-0" />
                <span>Control Panel</span>
              </button>
              <button className="win95-start-menu-item">
                <Printer size={16} className="shrink-0" />
                <span>Printers</span>
              </button>
              <button className="win95-start-menu-item">
                <Network size={16} className="shrink-0" />
                <span>Network</span>
              </button>
              <button className="win95-start-menu-item">
                <Database size={16} className="shrink-0" />
                <span>Taskbar & Start Menu</span>
              </button>
            </div>
          )}
        </Win95StartMenuItem>
        
        <button 
          className="win95-start-menu-item"
          onClick={() => handleStartItemClick(openMyComputer)}
        >
          <Computer size={16} className="shrink-0" />
          <span>My Computer</span>
        </button>
        
        <button className="win95-start-menu-item">
          <Search size={16} className="shrink-0" />
          <span>Find</span>
        </button>
        
        <button 
          className="win95-start-menu-item"
          onClick={() => handleStartItemClick(openHelpCenter)}
        >
          <HelpCircle size={16} className="shrink-0" />
          <span>Help</span>
        </button>
        
        <div className="h-px bg-win95-border-dark shadow-[0_1px_0_theme(colors.win95.border.light)] my-1"></div>
        
        <button 
          className="win95-start-menu-item"
          onClick={() => {
            showRunDialog();
            onClose();
          }}
        >
          <FileText size={16} className="shrink-0" />
          <span>Run...</span>
        </button>
        
        <div className="h-px bg-win95-border-dark shadow-[0_1px_0_theme(colors.win95.border.light)] my-1"></div>
        
        <button className="win95-start-menu-item">
          <Lock size={16} className="shrink-0" />
          <span>Log Off {window.location.hostname.split('.')[0]}...</span>
        </button>
        
        <button className="win95-start-menu-item">
          <Power size={16} className="shrink-0" />
          <span>Shut Down...</span>
        </button>
      </div>
    </div>
  );
};

export default Win95StartMenu;
