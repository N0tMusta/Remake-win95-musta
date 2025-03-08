
import React from 'react';

interface Win95DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const Win95DesktopIcon: React.FC<Win95DesktopIconProps> = ({ label, icon, onClick }) => {
  return (
    <button 
      className="win95-desktop-icon focus:outline-none" 
      onClick={onClick}
      tabIndex={0}
    >
      <div className="win95-icon">
        {icon}
      </div>
      <div className="win95-desktop-icon-label">
        {label}
      </div>
    </button>
  );
};

export default Win95DesktopIcon;
