
import React, { useState } from 'react';
import Win95Window from './Win95Window';
import Win95Taskbar from './Win95Taskbar';
import Win95DesktopIcon from './Win95DesktopIcon';
import { Folder, FileText, Computer, Settings, Image, Mail, Globe, Calendar, Clock, Music, Calculator as CalculatorIcon, HelpCircle } from 'lucide-react';

interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  isMinimized: boolean;
  zIndex: number;
}

const Win95Desktop: React.FC = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const openWindow = (title: string, content: React.ReactNode, icon: React.ReactNode) => {
    const id = `window-${Date.now()}`;
    const newWindow = {
      id,
      title,
      content,
      icon,
      isMinimized: false,
      zIndex: nextZIndex,
    };
    
    setWindows([...windows, newWindow]);
    setActiveWindow(id);
    setNextZIndex(nextZIndex + 1);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(window => window.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(
      windows.map(window =>
        window.id === id ? { ...window, isMinimized: true } : window
      )
    );
    setActiveWindow(null);
  };

  const restoreWindow = (id: string) => {
    setWindows(
      windows.map(window =>
        window.id === id
          ? { ...window, isMinimized: false, zIndex: nextZIndex }
          : window
      )
    );
    setActiveWindow(id);
    setNextZIndex(nextZIndex + 1);
  };

  const activateWindow = (id: string) => {
    if (activeWindow === id) return;
    
    setWindows(
      windows.map(window =>
        window.id === id
          ? { ...window, zIndex: nextZIndex }
          : window
      )
    );
    setActiveWindow(id);
    setNextZIndex(nextZIndex + 1);
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const openMyComputer = () => {
    openWindow("My Computer", (
      <div className="p-4 h-full flex flex-wrap gap-4 content-start">
        <Win95DesktopIcon 
          label="(C:)" 
          icon={<Computer size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="(D:)" 
          icon={<Computer size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Control Panel" 
          icon={<Settings size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
      </div>
    ), <Computer size={16} />);
  };

  const openNotepad = () => {
    openWindow("Untitled - Notepad", (
      <div className="p-2 h-full flex flex-col">
        <textarea className="win95-inset flex-1 p-2 resize-none focus:outline-none bg-white" />
      </div>
    ), <FileText size={16} />);
  };

  const openMyDocuments = () => {
    openWindow("My Documents", (
      <div className="p-4 h-full flex flex-wrap gap-4 content-start">
        <Win95DesktopIcon 
          label="Document.txt" 
          icon={<FileText size={32} className="text-win95-darkgray" />} 
          onClick={openNotepad} 
        />
        <Win95DesktopIcon 
          label="Resume.doc" 
          icon={<FileText size={32} className="text-win95-darkgray" />} 
          onClick={openNotepad} 
        />
        <Win95DesktopIcon 
          label="Notes.txt" 
          icon={<FileText size={32} className="text-win95-darkgray" />} 
          onClick={openNotepad} 
        />
      </div>
    ), <Folder size={16} />);
  };

  const openPaintApp = () => {
    openWindow("Untitled - Paint", (
      <div className="p-2 h-full flex flex-col">
        <div className="win95-inset flex-1 bg-white relative">
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-1 bg-win95-gray border-b border-win95-border-dark">
            <button className="win95-button px-2 py-0.5 text-xs">File</button>
            <button className="win95-button px-2 py-0.5 text-xs">Edit</button>
            <button className="win95-button px-2 py-0.5 text-xs">View</button>
            <button className="win95-button px-2 py-0.5 text-xs">Help</button>
          </div>
          <div className="pt-8 h-full flex items-center justify-center text-win95-darkgray">
            <Image size={64} />
          </div>
        </div>
      </div>
    ), <Image size={16} />);
  };

  const openInternetExplorer = () => {
    openWindow("Internet Explorer", (
      <div className="p-2 h-full flex flex-col">
        <div className="flex gap-1 mb-2">
          <button className="win95-button px-2">Back</button>
          <button className="win95-button px-2">Forward</button>
          <button className="win95-button px-2">Refresh</button>
          <button className="win95-button px-2">Home</button>
        </div>
        <div className="flex gap-1 mb-2 items-center">
          <span>Address:</span>
          <input type="text" className="win95-inset flex-1 px-2 py-1 bg-white" defaultValue="https://www.microsoft.com" />
          <button className="win95-button px-2">Go</button>
        </div>
        <div className="win95-inset flex-1 bg-white flex items-center justify-center">
          <div className="text-center">
            <Globe size={64} className="mx-auto mb-4 text-win95-darkgray" />
            <p>Welcome to the Internet!</p>
            <p className="text-xs text-win95-darkgray mt-2">This page cannot be displayed.</p>
          </div>
        </div>
      </div>
    ), <Globe size={16} />);
  };

  const openCalendar = () => {
    const date = new Date();
    openWindow("Calendar", (
      <div className="p-4 h-full">
        <div className="win95-inset p-2 bg-white">
          <div className="font-bold text-center mb-2">
            {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            <div className="font-bold">Su</div>
            <div className="font-bold">Mo</div>
            <div className="font-bold">Tu</div>
            <div className="font-bold">We</div>
            <div className="font-bold">Th</div>
            <div className="font-bold">Fr</div>
            <div className="font-bold">Sa</div>
            {Array.from({ length: 31 }, (_, i) => (
              <div 
                key={i}
                className={`p-1 ${i + 1 === date.getDate() ? 'bg-win95-blue text-white' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    ), <Calendar size={16} />);
  };

  const openCalculator = () => {
    openWindow("Calculator", (
      <div className="p-2 h-full">
        <div className="win95-inset mb-2 p-2 bg-white text-right">0</div>
        <div className="grid grid-cols-4 gap-1">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
            <button key={key} className="win95-button py-1">{key}</button>
          ))}
        </div>
      </div>
    ), <CalculatorIcon size={16} />);
  };

  const openMediaPlayer = () => {
    openWindow("Media Player", (
      <div className="p-2 h-full flex flex-col">
        <div className="win95-inset flex-1 bg-win95-darkgray flex items-center justify-center">
          <div className="text-center text-white">
            <Music size={48} className="mx-auto mb-2" />
            <p>No media loaded</p>
          </div>
        </div>
        <div className="flex gap-1 mt-2 justify-center">
          <button className="win95-button px-3">▶️</button>
          <button className="win95-button px-3">⏸️</button>
          <button className="win95-button px-3">⏹️</button>
        </div>
      </div>
    ), <Music size={16} />);
  };

  const openHelpCenter = () => {
    openWindow("Help and Support", (
      <div className="p-4 h-full flex flex-col">
        <div className="mb-4 flex gap-2">
          <HelpCircle size={24} className="text-win95-darkgray shrink-0" />
          <div>
            <div className="font-bold">Windows 95 Help</div>
            <div className="text-xs">Get assistance with Windows 95</div>
          </div>
        </div>
        <div className="win95-inset flex-1 bg-white p-2">
          <div className="font-bold mb-2">Contents</div>
          <ul className="text-win95-darkgray text-sm">
            <li className="mb-1">• Getting Started with Windows</li>
            <li className="mb-1">• Using the Desktop</li>
            <li className="mb-1">• Managing Files and Folders</li>
            <li className="mb-1">• Connecting to Networks</li>
            <li className="mb-1">• Troubleshooting</li>
          </ul>
        </div>
      </div>
    ), <HelpCircle size={16} />);
  };

  return (
    <div className="fixed inset-0">
      <div className="flex flex-wrap gap-4 p-4 content-start">
        <Win95DesktopIcon 
          label="My Computer"
          icon={<Computer size={32} className="text-win95-darkgray" />}
          onClick={openMyComputer}
        />
        <Win95DesktopIcon 
          label="My Documents"
          icon={<Folder size={32} className="text-win95-darkgray" />}
          onClick={openMyDocuments}
        />
        <Win95DesktopIcon 
          label="Notepad"
          icon={<FileText size={32} className="text-win95-darkgray" />}
          onClick={openNotepad}
        />
        <Win95DesktopIcon 
          label="Paint"
          icon={<Image size={32} className="text-win95-darkgray" />}
          onClick={openPaintApp}
        />
        <Win95DesktopIcon 
          label="Internet Explorer"
          icon={<Globe size={32} className="text-win95-darkgray" />}
          onClick={openInternetExplorer}
        />
        <Win95DesktopIcon 
          label="Calendar"
          icon={<Calendar size={32} className="text-win95-darkgray" />}
          onClick={openCalendar}
        />
        <Win95DesktopIcon 
          label="Calculator"
          icon={<CalculatorIcon size={32} className="text-win95-darkgray" />}
          onClick={openCalculator}
        />
        <Win95DesktopIcon 
          label="Media Player"
          icon={<Music size={32} className="text-win95-darkgray" />}
          onClick={openMediaPlayer}
        />
        <Win95DesktopIcon 
          label="Help"
          icon={<HelpCircle size={32} className="text-win95-darkgray" />}
          onClick={openHelpCenter}
        />
      </div>
      
      {windows.map((window) => (
        !window.isMinimized && (
          <Win95Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            isActive={activeWindow === window.id}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onActivate={() => activateWindow(window.id)}
          >
            {window.content}
          </Win95Window>
        )
      ))}

      <Win95Taskbar
        windows={windows}
        activeWindow={activeWindow}
        startMenuOpen={startMenuOpen}
        toggleStartMenu={toggleStartMenu}
        restoreWindow={restoreWindow}
        openNotepad={openNotepad}
        openMyComputer={openMyComputer}
        openPaintApp={openPaintApp}
        openInternetExplorer={openInternetExplorer}
        openCalendar={openCalendar}
        openCalculator={openCalculator}
        openMediaPlayer={openMediaPlayer}
        openHelpCenter={openHelpCenter}
      />
    </div>
  );
};

export default Win95Desktop;
