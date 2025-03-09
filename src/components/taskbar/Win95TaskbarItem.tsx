
import React, { ReactNode } from 'react';

interface Win95TaskbarItemProps {
  id: string;
  title: string;
  icon: ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClick: () => void;
}

const Win95TaskbarItem: React.FC<Win95TaskbarItemProps> = ({
  id,
  title,
  icon,
  isActive,
  isMinimized,
  onClick
}) => {
  return (
    <button
      className={`win95-taskbar-item ${isActive && !isMinimized ? 'active' : ''}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="truncate">{title}</span>
    </button>
  );
};

export default Win95TaskbarItem;
