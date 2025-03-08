import React, { useState, useRef, useEffect } from 'react';
import { X, Minus } from 'lucide-react';

interface Win95WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onActivate: () => void;
  width?: number;
  height?: number;
}

const Win95Window: React.FC<Win95WindowProps> = ({ 
  id, 
  title, 
  children, 
  icon, 
  isActive, 
  zIndex, 
  onClose, 
  onMinimize, 
  onActivate,
  width: initialWidth = 400,
  height: initialHeight = 300
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const randomX = Math.floor(Math.random() * 100) + 50;
    const randomY = Math.floor(Math.random() * 100) + 50;
    setPosition({ x: randomX, y: randomY });
  }, [id]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    onActivate();
    
    if (e.button !== 0) return;
    
    setIsDragging(true);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
  };
  
  const handleResizeMouseDown = (direction: string, e: React.MouseEvent) => {
    onActivate();
    
    if (e.button !== 0) return;
    
    setIsResizing(true);
    setResizeDirection(direction);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setInitialSize({ width: size.width, height: size.height });
    setInitialPosition({ x: position.x, y: position.y });
    
    e.stopPropagation();
    e.preventDefault();
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing) {
        const deltaX = e.clientX - initialMousePos.x;
        const deltaY = e.clientY - initialMousePos.y;
        
        let newWidth = initialSize.width;
        let newHeight = initialSize.height;
        let newX = initialPosition.x;
        let newY = initialPosition.y;
        
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(200, initialSize.width + deltaX);
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(100, initialSize.height + deltaY);
        }
        if (resizeDirection.includes('w')) {
          const widthChange = initialSize.width - Math.max(200, initialSize.width - deltaX);
          newWidth = initialSize.width - widthChange;
          newX = initialPosition.x + widthChange;
        }
        if (resizeDirection.includes('n')) {
          const heightChange = initialSize.height - Math.max(100, initialSize.height - deltaY);
          newHeight = initialSize.height - heightChange;
          newY = initialPosition.y + heightChange;
        }
        
        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, initialMousePos, initialSize, initialPosition, resizeDirection]);
  
  const handleWindowClick = () => {
    if (!isActive) {
      onActivate();
    }
  };
  
  return (
    <div 
      ref={windowRef}
      className="win95-window absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex,
      }}
      onClick={handleWindowClick}
    >
      <div 
        className="win95-titlebar cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="flex">
          <button 
            className="focus:outline-none w-6 h-6 flex items-center justify-center hover:bg-win95-darkgray"
            onClick={onMinimize}
          >
            <Minus size={10} />
          </button>
          <button 
            className="focus:outline-none w-6 h-6 flex items-center justify-center hover:bg-win95-darkgray"
            onClick={onClose}
          >
            <X size={10} />
          </button>
        </div>
      </div>
      <div className="p-1 flex flex-col h-[calc(100%-25px)]">
        {children}
      </div>
      
      <div 
        className="absolute right-0 bottom-0 w-3 h-3 cursor-se-resize"
        onMouseDown={(e) => handleResizeMouseDown('se', e)}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-1 cursor-e-resize"
        onMouseDown={(e) => handleResizeMouseDown('e', e)}
      />
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 cursor-w-resize"
        onMouseDown={(e) => handleResizeMouseDown('w', e)}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
        onMouseDown={(e) => handleResizeMouseDown('s', e)}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-1 cursor-n-resize"
        onMouseDown={(e) => handleResizeMouseDown('n', e)}
      />
    </div>
  );
};

export default Win95Window;
