
import React, { useState, useRef, useEffect } from 'react';
import { Image, Save, Folder, FileText, Settings, RefreshCw } from 'lucide-react';

type Tool = 'pencil' | 'brush' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'text' | 'fill' | 'dropper';
type StrokeStyle = 'solid' | 'dashed' | 'dotted';

const Paint: React.FC = () => {
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState('#000000');
  const [thickness, setThickness] = useState(2);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{x: number, y: number} | null>(null);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [strokeStyle, setStrokeStyle] = useState<StrokeStyle>('solid');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Colors palette
  const colors = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
    '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to fill the container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set default styles
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = thickness;
    
    // Fill with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = thickness;
    
    // Apply stroke style
    if (contextRef.current) {
      switch (strokeStyle) {
        case 'dashed':
          contextRef.current.setLineDash([5, 5]);
          break;
        case 'dotted':
          contextRef.current.setLineDash([2, 2]);
          break;
        case 'solid':
        default:
          contextRef.current.setLineDash([]);
          break;
      }
    }
  }, [color, thickness, strokeStyle]);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
      setIsDrawing(true);
    } else if (tool === 'line' || tool === 'rectangle' || tool === 'circle') {
      setStartPoint({ x, y });
      setIsDrawing(true);
      
      // Save the canvas state before drawing
      setSavedImage(canvas.toDataURL());
    } else if (tool === 'fill') {
      // Simple fill (in real paint, this would use flood fill algorithm)
      contextRef.current.fillStyle = color;
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
    } else if (tool === 'dropper') {
      // Get color at point (not fully accurate in this simplified version)
      const data = contextRef.current.getImageData(x, y, 1, 1).data;
      const hexColor = `#${data[0].toString(16).padStart(2, '0')}${data[1].toString(16).padStart(2, '0')}${data[2].toString(16).padStart(2, '0')}`;
      setColor(hexColor);
    } else if (tool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        contextRef.current.fillStyle = color;
        contextRef.current.font = `${thickness * 6}px Arial`;
        contextRef.current.fillText(text, x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pencil') {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    } else if (tool === 'brush') {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    } else if (tool === 'eraser') {
      contextRef.current.strokeStyle = '#FFFFFF';
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
      contextRef.current.strokeStyle = color; // Restore color
    } else if (tool === 'line' || tool === 'rectangle' || tool === 'circle') {
      if (savedImage && startPoint) {
        // Restore the canvas to the state before drawing
        const img = new Image();
        img.src = savedImage;
        img.onload = () => {
          if (!contextRef.current) return;
          contextRef.current.drawImage(img, 0, 0);
          
          // Now draw the current shape
          contextRef.current.beginPath();
          
          if (tool === 'line') {
            contextRef.current.moveTo(startPoint.x, startPoint.y);
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
          } else if (tool === 'rectangle') {
            const width = x - startPoint.x;
            const height = y - startPoint.y;
            contextRef.current.strokeRect(startPoint.x, startPoint.y, width, height);
          } else if (tool === 'circle') {
            const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
            contextRef.current.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
            contextRef.current.stroke();
          }
        };
      }
    }
  };

  const endDrawing = () => {
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      contextRef.current?.closePath();
    }
    setIsDrawing(false);
    setStartPoint(null);
    setSavedImage(null);
  };

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;
    contextRef.current.fillStyle = 'white';
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveImage = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'paint-drawing.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const toggleMenu = (menu: string) => {
    setShowFileMenu(menu === 'file' ? !showFileMenu : false);
    setShowEditMenu(menu === 'edit' ? !showEditMenu : false);
    setShowViewMenu(menu === 'view' ? !showViewMenu : false);
    setShowHelpMenu(menu === 'help' ? !showHelpMenu : false);
  };

  return (
    <div className="p-2 h-full flex flex-col">
      {/* Menu Bar */}
      <div className="mb-2 flex border-b border-win95-border-dark">
        <button 
          className={`px-2 py-0.5 ${showFileMenu ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={() => toggleMenu('file')}
        >
          File
        </button>
        <button 
          className={`px-2 py-0.5 ${showEditMenu ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={() => toggleMenu('edit')}
        >
          Edit
        </button>
        <button 
          className={`px-2 py-0.5 ${showViewMenu ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={() => toggleMenu('view')}
        >
          View
        </button>
        <button 
          className={`px-2 py-0.5 ${showHelpMenu ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={() => toggleMenu('help')}
        >
          Help
        </button>
      </div>
      
      {/* File Menu Dropdown */}
      {showFileMenu && (
        <div className="win95-menu absolute top-6 left-2 z-10">
          <button className="win95-menu-item" onClick={() => { clearCanvas(); toggleMenu(''); }}>
            <FileText size={14} className="mr-2" />
            New
          </button>
          <button className="win95-menu-item">
            <Folder size={14} className="mr-2" />
            Open...
          </button>
          <button className="win95-menu-item" onClick={() => { saveImage(); toggleMenu(''); }}>
            <Save size={14} className="mr-2" />
            Save
          </button>
          <button className="win95-menu-item">
            <Save size={14} className="mr-2" />
            Save As...
          </button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item">Print...</button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item" onClick={() => toggleMenu('')}>Exit</button>
        </div>
      )}
      
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <div className="win95-inset p-1 flex gap-1 bg-win95-gray">
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'pencil' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('pencil')}
            title="Pencil"
          >
            ✏️
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'brush' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('brush')}
            title="Brush"
          >
            🖌️
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'eraser' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >
            🧹
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'fill' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('fill')}
            title="Fill"
          >
            🪣
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'text' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('text')}
            title="Text"
          >
            A
          </button>
          <div className="win95-divider-vertical mx-1"></div>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'line' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('line')}
            title="Line"
          >
            ╱
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'rectangle' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('rectangle')}
            title="Rectangle"
          >
            □
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'circle' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('circle')}
            title="Circle"
          >
            ○
          </button>
          <div className="win95-divider-vertical mx-1"></div>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${tool === 'dropper' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setTool('dropper')}
            title="Color Picker"
          >
            👁️
          </button>
        </div>
        
        <div className="win95-inset p-1 flex gap-1 bg-win95-gray">
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${strokeStyle === 'solid' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setStrokeStyle('solid')}
            title="Solid Line"
          >
            —
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${strokeStyle === 'dashed' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setStrokeStyle('dashed')}
            title="Dashed Line"
          >
            - -
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${strokeStyle === 'dotted' ? 'bg-win95-darkgray text-white' : ''}`}
            onClick={() => setStrokeStyle('dotted')}
            title="Dotted Line"
          >
            •••
          </button>
        </div>
        
        <div className="win95-inset p-1 flex gap-1 items-center bg-win95-gray">
          <span className="text-xs mr-1">Size:</span>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={thickness} 
            onChange={(e) => setThickness(parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-xs ml-1">{thickness}px</span>
        </div>
      </div>
      
      <div className="flex flex-1 gap-2">
        {/* Color Palette */}
        <div className="win95-inset p-1 grid grid-cols-2 gap-1 h-fit">
          {colors.map((c, i) => (
            <button 
              key={i}
              className={`w-6 h-6 border ${color === c ? 'border-white' : 'border-win95-border-dark'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
        </div>
        
        {/* Canvas */}
        <div className="win95-inset flex-1 bg-white overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            className="w-full h-full cursor-crosshair"
          />
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="mt-2 win95-inset py-1 px-2 text-xs flex justify-between items-center">
        <div>Tool: {tool.charAt(0).toUpperCase() + tool.slice(1)}</div>
        <div>Color: {color}</div>
        <div>Size: {thickness}px</div>
      </div>
    </div>
  );
};

export default Paint;
