import React, { useState } from 'react';
import { Win95Clock } from './Win95Clock';
import { 
  Computer, FileText, Settings, Folder, Image, Mail, Globe, Calendar, 
  Music, Calculator as CalculatorIcon, HelpCircle, Power, User, 
  Monitor, Workflow, Search, Printer, Network, BookOpen, Coffee,
  FolderOpen, Lock, BarChart, Cpu, Server, Database, FileArchive
} from 'lucide-react';

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
  const [showProgramsMenu, setShowProgramsMenu] = useState(false);
  const [showAccessoriesMenu, setShowAccessoriesMenu] = useState(false);
  const [showGamesMenu, setShowGamesMenu] = useState(false);
  const [showSystemToolsMenu, setShowSystemToolsMenu] = useState(false);
  const [showDocumentsMenu, setShowDocumentsMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [runDialogOpen, setRunDialogOpen] = useState(false);
  
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

  const showRunDialog = () => {
    setRunDialogOpen(true);
    toggleStartMenu();
  };
  
  // Placeholder functions (since we don't have those functions in the props)
  const handleGameClick = () => {
    toggleStartMenu();
    alert("Game functionality is not implemented yet!");
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
      
      <Win95Clock />
      
      {startMenuOpen && (
        <div className="win95-start-menu">
          <div className="bg-win95-blue text-white font-bold p-4 absolute left-0 top-0 bottom-0 w-10 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Windows 95
          </div>
          
          <div className="ml-10">
            {/* Programs menu */}
            <div 
              className="win95-start-menu-item relative"
              onMouseEnter={() => handleStartItemHover('programs', true)}
              onMouseLeave={() => handleStartItemHover('programs', false)}
            >
              <Workflow size={16} className="shrink-0" />
              <span>Programs</span>
              <span className="ml-auto">▶</span>
              
              {showProgramsMenu && (
                <div className="win95-submenu">
                  {/* Accessories submenu */}
                  <div 
                    className="win95-start-menu-item relative"
                    onMouseEnter={() => handleStartItemHover('accessories', true)}
                    onMouseLeave={() => handleStartItemHover('accessories', false)}
                  >
                    <Folder size={16} className="shrink-0" />
                    <span>Accessories</span>
                    <span className="ml-auto">▶</span>
                    
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
                  </div>
                  
                  {/* Games submenu */}
                  <div 
                    className="win95-start-menu-item relative"
                    onMouseEnter={() => handleStartItemHover('games', true)}
                    onMouseLeave={() => handleStartItemHover('games', false)}
                  >
                    <Folder size={16} className="shrink-0" />
                    <span>Games</span>
                    <span className="ml-auto">▶</span>
                    
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
                  </div>
                  
                  {/* System Tools submenu */}
                  <div 
                    className="win95-start-menu-item relative"
                    onMouseEnter={() => handleStartItemHover('systemTools', true)}
                    onMouseLeave={() => handleStartItemHover('systemTools', false)}
                  >
                    <Folder size={16} className="shrink-0" />
                    <span>System Tools</span>
                    <span className="ml-auto">▶</span>
                    
                    {showSystemToolsMenu && (
                      <div className="win95-submenu right-full top-0">
                        <button 
                          className="win95-start-menu-item"
                        >
                          <Cpu size={16} className="shrink-0" />
                          <span>System Information</span>
                        </button>
                        <button 
                          className="win95-start-menu-item"
                        >
                          <FileArchive size={16} className="shrink-0" />
                          <span>Disk Defragmenter</span>
                        </button>
                        <button 
                          className="win95-start-menu-item"
                        >
                          <Server size={16} className="shrink-0" />
                          <span>Backup</span>
                        </button>
                        <button 
                          className="win95-start-menu-item"
                        >
                          <BarChart size={16} className="shrink-0" />
                          <span>Resource Monitor</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
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
                  
                  <button 
                    className="win95-start-menu-item"
                  >
                    <Mail size={16} className="shrink-0" />
                    <span>Outlook Express</span>
                  </button>
                  
                  <button 
                    className="win95-start-menu-item"
                  >
                    <Printer size={16} className="shrink-0" />
                    <span>Microsoft Fax</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Documents menu */}
            <div 
              className="win95-start-menu-item relative"
              onMouseEnter={() => handleStartItemHover('documents', true)}
              onMouseLeave={() => handleStartItemHover('documents', false)}
            >
              <FolderOpen size={16} className="shrink-0" />
              <span>Documents</span>
              <span className="ml-auto">▶</span>
              
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
            </div>
            
            {/* Settings menu */}
            <div 
              className="win95-start-menu-item relative"
              onMouseEnter={() => handleStartItemHover('settings', true)}
              onMouseLeave={() => handleStartItemHover('settings', false)}
            >
              <Settings size={16} className="shrink-0" />
              <span>Settings</span>
              <span className="ml-auto">▶</span>
              
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
            </div>
            
            <button 
              className="win95-start-menu-item"
              onClick={() => handleStartItemClick(openMyComputer)}
            >
              <Computer size={16} className="shrink-0" />
              <span>My Computer</span>
            </button>
            
            <button 
              className="win95-start-menu-item"
            >
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
              onClick={showRunDialog}
            >
              <FileText size={16} className="shrink-0" />
              <span>Run...</span>
            </button>
            
            <div className="h-px bg-win95-border-dark shadow-[0_1px_0_theme(colors.win95.border.light)] my-1"></div>
            
            <button 
              className="win95-start-menu-item"
            >
              <Lock size={16} className="shrink-0" />
              <span>Log Off {window.location.hostname.split('.')[0]}...</span>
            </button>
            
            <button 
              className="win95-start-menu-item"
            >
              <Power size={16} className="shrink-0" />
              <span>Shut Down...</span>
            </button>
          </div>
        </div>
      )}
      
      {runDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setRunDialogOpen(false)}>
          <div className="win95-window p-2 w-80" onClick={(e) => e.stopPropagation()}>
            <div className="win95-titlebar mb-2">
              <div className="flex items-center gap-1">
                <FileText size={14} />
                <span>Run</span>
              </div>
              <button className="win95-title-button" onClick={() => setRunDialogOpen(false)}>
                <span className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="p-2">
              <div className="mb-4">
                <label className="block mb-1">Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</label>
                <div className="flex items-center gap-2">
                  <span>Open:</span>
                  <input type="text" className="win95-inset flex-1 px-2 py-1 bg-white" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button className="win95-button px-3 py-1">OK</button>
                <button className="win95-button px-3 py-1" onClick={() => setRunDialogOpen(false)}>Cancel</button>
                <button className="win95-button px-3 py-1">Browse...</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Win95Taskbar;
