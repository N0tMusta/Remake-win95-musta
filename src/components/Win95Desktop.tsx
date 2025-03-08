
import React, { useState } from 'react';
import Win95Window from './Win95Window';
import Win95Taskbar from './Win95Taskbar';
import Win95DesktopIcon from './Win95DesktopIcon';
import { Folder, FileText, Computer, Settings } from 'lucide-react';

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
      </div>
    ), <Folder size={16} />);
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
      />
    </div>
  );
};

export default Win95Desktop;
