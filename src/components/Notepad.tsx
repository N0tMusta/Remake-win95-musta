import React, { useState, useRef, useEffect } from 'react';
import { FileText, Save, Folder, Printer } from 'lucide-react';

interface NotepadProps {
  initialText?: string;
}

const Notepad: React.FC<NotepadProps> = ({ initialText = '' }) => {
  const [text, setText] = useState(initialText);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Basic auto-indent on new line
      const textarea = e.target;
      const start = textarea.selectionStart;
      const currentLineStart = textarea.value.lastIndexOf('\n', start - 1) + 1;
      let indent = '';
      for (let i = currentLineStart; i < start; i++) {
        if (textarea.value[i] === ' ' || textarea.value[i] === '\t') {
          indent += textarea.value[i];
        } else {
          break;
        }
      }
      
      // Insert newline and indentation
      const newValue = textarea.value.substring(0, start) + '\n' + indent + textarea.value.substring(start);
      setText(newValue);
      
      // Set cursor position after the newline and indentation
      textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
      e.preventDefault(); // Prevent the default Enter key behavior
    }
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
      setText(newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const toggleFileMenu = () => {
    setShowFileMenu(!showFileMenu);
  };

  const saveFile = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notepad.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const newFile = () => {
    setText('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Menu Bar */}
      <div className="bg-win95-gray-light border-b border-win95-border-dark py-0.5 px-1 flex">
        <button className="px-2 py-0.5" onClick={toggleFileMenu}>File</button>
        <button className="px-2 py-0.5">Edit</button>
        <button className="px-2 py-0.5">Search</button>
        <button className="px-2 py-0.5">Help</button>
      </div>

      {/* File Menu */}
      {showFileMenu && (
        <div className="win95-menu absolute top-6 left-2 z-10">
          <button className="win95-menu-item" onClick={newFile}>
            <FileText size={14} className="mr-2" />
            New
          </button>
          <button className="win95-menu-item">
            <Folder size={14} className="mr-2" />
            Open...
          </button>
          <button className="win95-menu-item" onClick={saveFile}>
            <Save size={14} className="mr-2" />
            Save
          </button>
          <button className="win95-menu-item">
            <Save size={14} className="mr-2" />
            Save As...
          </button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item">
            <Printer size={14} className="mr-2" />
            Print...
          </button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item" onClick={toggleFileMenu}>Exit</button>
        </div>
      )}

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        className="win95-inset flex-grow p-2 resize-none outline-none"
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleTab(e);
        }}
      />
    </div>
  );
};

export default Notepad;
