
import React, { ReactNode } from 'react';

interface Win95StartMenuItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const Win95StartMenuItem: React.FC<Win95StartMenuItemProps> = ({
  icon,
  label,
  onClick,
  hasSubmenu = false,
  onMouseEnter,
  onMouseLeave,
  className = '',
  children
}) => {
  return (
    <div
      className={`win95-start-menu-item relative ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
      <span>{label}</span>
      {hasSubmenu && <span className="ml-auto">▶</span>}
      {children}
    </div>
  );
};

export default Win95StartMenuItem;
