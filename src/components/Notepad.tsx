
import React, { useState } from 'react';

const Notepad: React.FC = () => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('Untitled');
  const [showFindDialog, setShowFindDialog] = useState(false);
  const [findText, setFindText] = useState('');
  const [isFindCaseSensitive, setIsFindCaseSensitive] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [replaceText, setReplaceText] = useState('');
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle tab key to insert spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      setText(text.substring(0, start) + '    ' + text.substring(end));
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        const textarea = e.target as HTMLTextAreaElement;
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleFindNext = () => {
    if (!findText) return;
    
    const searchText = isFindCaseSensitive ? text : text.toLowerCase();
    const searchTerm = isFindCaseSensitive ? findText : findText.toLowerCase();
    
    const textArea = document.getElementById('notepad-textarea') as HTMLTextAreaElement;
    const currentPos = textArea.selectionEnd;
    
    const foundPos = searchText.indexOf(searchTerm, currentPos);
    if (foundPos !== -1) {
      textArea.focus();
      textArea.setSelectionRange(foundPos, foundPos + searchTerm.length);
    } else {
      // Search from beginning if not found from current position
      const fromStartPos = searchText.indexOf(searchTerm);
      if (fromStartPos !== -1) {
        textArea.focus();
        textArea.setSelectionRange(fromStartPos, fromStartPos + searchTerm.length);
      } else {
        alert(`Cannot find "${findText}"`);
      }
    }
  };

  const handleReplace = () => {
    if (!findText) return;
    
    const textArea = document.getElementById('notepad-textarea') as HTMLTextAreaElement;
    const selStart = textArea.selectionStart;
    const selEnd = textArea.selectionEnd;
    
    if (selEnd > selStart) {
      const selectedText = text.substring(selStart, selEnd);
      if ((isFindCaseSensitive && selectedText === findText) || 
          (!isFindCaseSensitive && selectedText.toLowerCase() === findText.toLowerCase())) {
        const newText = text.substring(0, selStart) + replaceText + text.substring(selEnd);
        setText(newText);
        
        // Set cursor position after the replacement
        setTimeout(() => {
          textArea.selectionStart = textArea.selectionEnd = selStart + replaceText.length;
        }, 0);
      } else {
        handleFindNext();
      }
    } else {
      handleFindNext();
    }
  };

  const handleReplaceAll = () => {
    if (!findText) return;
    
    let count = 0;
    let newText = text;
    
    if (isFindCaseSensitive) {
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      newText = text.replace(regex, () => {
        count++;
        return replaceText;
      });
    } else {
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      newText = text.replace(regex, () => {
        count++;
        return replaceText;
      });
    }
    
    setText(newText);
    alert(`Replaced ${count} occurrences.`);
  };

  const handleSave = () => {
    alert(`Saving "${fileName}.txt" (Simulated)`);
    setShowSaveDialog(false);
  };

  const toggleMenuDropdown = (menu: string) => {
    if (showMenuDropdown === menu) {
      setShowMenuDropdown(null);
    } else {
      setShowMenuDropdown(menu);
    }
  };

  const closeAllDialogs = () => {
    setShowFindDialog(false);
    setShowReplaceDialog(false);
    setShowAboutDialog(false);
    setShowSaveDialog(false);
    setShowMenuDropdown(null);
  };

  return (
    <div className="p-2 h-full flex flex-col" onClick={() => setShowMenuDropdown(null)}>
      <div className="flex mb-2 border-b border-win95-border-dark">
        <button 
          className={`px-2 py-0.5 ${showMenuDropdown === 'file' ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuDropdown('file');
          }}
        >
          File
        </button>
        <button 
          className={`px-2 py-0.5 ${showMenuDropdown === 'edit' ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuDropdown('edit');
          }}
        >
          Edit
        </button>
        <button 
          className={`px-2 py-0.5 ${showMenuDropdown === 'format' ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuDropdown('format');
          }}
        >
          Format
        </button>
        <button 
          className={`px-2 py-0.5 ${showMenuDropdown === 'view' ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuDropdown('view');
          }}
        >
          View
        </button>
        <button 
          className={`px-2 py-0.5 ${showMenuDropdown === 'help' ? 'bg-win95-darkgray text-white' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuDropdown('help');
          }}
        >
          Help
        </button>
      </div>
      
      {/* File Menu */}
      {showMenuDropdown === 'file' && (
        <div className="win95-menu absolute top-5 left-2 z-10" onClick={(e) => e.stopPropagation()}>
          <button className="win95-menu-item" onClick={() => { setText(''); setFileName('Untitled'); setShowMenuDropdown(null); }}>
            New
          </button>
          <button className="win95-menu-item" onClick={() => { setShowSaveDialog(true); setShowMenuDropdown(null); }}>
            Save
          </button>
          <button className="win95-menu-item" onClick={() => { setShowSaveDialog(true); setShowMenuDropdown(null); }}>
            Save As...
          </button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item">Page Setup...</button>
          <button className="win95-menu-item">Print...</button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item">Exit</button>
        </div>
      )}
      
      {/* Edit Menu */}
      {showMenuDropdown === 'edit' && (
        <div className="win95-menu absolute top-5 left-10 z-10" onClick={(e) => e.stopPropagation()}>
          <button className="win95-menu-item">Undo</button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item">Cut</button>
          <button className="win95-menu-item">Copy</button>
          <button className="win95-menu-item">Paste</button>
          <button className="win95-menu-item">Delete</button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item" onClick={() => { setShowFindDialog(true); setShowMenuDropdown(null); }}>
            Find...
          </button>
          <button className="win95-menu-item" onClick={() => { setShowReplaceDialog(true); setShowMenuDropdown(null); }}>
            Replace...
          </button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item">Select All</button>
          <button className="win95-menu-item">Time/Date</button>
        </div>
      )}
      
      {/* Help Menu */}
      {showMenuDropdown === 'help' && (
        <div className="win95-menu absolute top-5 right-2 z-10" onClick={(e) => e.stopPropagation()}>
          <button className="win95-menu-item">Help Topics</button>
          <div className="win95-menu-divider"></div>
          <button className="win95-menu-item" onClick={() => { setShowAboutDialog(true); setShowMenuDropdown(null); }}>
            About Notepad
          </button>
        </div>
      )}
      
      <textarea
        id="notepad-textarea"
        className="win95-inset flex-1 p-2 resize-none focus:outline-none bg-white font-mono"
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      ></textarea>
      
      {/* Find Dialog */}
      {showFindDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowFindDialog(false)}>
          <div className="win95-window p-2 w-80" onClick={(e) => e.stopPropagation()}>
            <div className="win95-titlebar mb-2">
              <span>Find</span>
              <button className="win95-title-button" onClick={() => setShowFindDialog(false)}>×</button>
            </div>
            <div className="p-2">
              <div className="mb-4">
                <label className="block mb-1">Find what:</label>
                <input 
                  type="text" 
                  className="win95-inset w-full px-2 py-1 bg-white"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox"
                  id="case-sensitive"
                  className="mr-2"
                  checked={isFindCaseSensitive}
                  onChange={() => setIsFindCaseSensitive(!isFindCaseSensitive)}
                />
                <label htmlFor="case-sensitive">Match case</label>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1"
                  onClick={handleFindNext}
                  disabled={!findText}
                >
                  Find Next
                </button>
                <button 
                  className="win95-button px-3 py-1" 
                  onClick={() => setShowFindDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Replace Dialog */}
      {showReplaceDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowReplaceDialog(false)}>
          <div className="win95-window p-2 w-80" onClick={(e) => e.stopPropagation()}>
            <div className="win95-titlebar mb-2">
              <span>Replace</span>
              <button className="win95-title-button" onClick={() => setShowReplaceDialog(false)}>×</button>
            </div>
            <div className="p-2">
              <div className="mb-2">
                <label className="block mb-1">Find what:</label>
                <input 
                  type="text" 
                  className="win95-inset w-full px-2 py-1 bg-white"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Replace with:</label>
                <input 
                  type="text" 
                  className="win95-inset w-full px-2 py-1 bg-white"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox"
                  id="case-sensitive-replace"
                  className="mr-2"
                  checked={isFindCaseSensitive}
                  onChange={() => setIsFindCaseSensitive(!isFindCaseSensitive)}
                />
                <label htmlFor="case-sensitive-replace">Match case</label>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1"
                  onClick={handleFindNext}
                  disabled={!findText}
                >
                  Find Next
                </button>
                <button 
                  className="win95-button px-3 py-1"
                  onClick={handleReplace}
                  disabled={!findText}
                >
                  Replace
                </button>
                <button 
                  className="win95-button px-3 py-1"
                  onClick={handleReplaceAll}
                  disabled={!findText}
                >
                  Replace All
                </button>
                <button 
                  className="win95-button px-3 py-1" 
                  onClick={() => setShowReplaceDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* About Dialog */}
      {showAboutDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowAboutDialog(false)}>
          <div className="win95-window p-2 w-80" onClick={(e) => e.stopPropagation()}>
            <div className="win95-titlebar mb-2">
              <span>About Notepad</span>
              <button className="win95-title-button" onClick={() => setShowAboutDialog(false)}>×</button>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-win95-gray flex items-center justify-center border-2 border-win95-border-light mr-4">
                  <div className="text-xl">📝</div>
                </div>
                <div>
                  <div className="font-bold">Windows 95 Notepad</div>
                  <div className="text-xs">Version 4.0</div>
                </div>
              </div>
              <div className="text-xs">
                <p>© 1981-1995 Microsoft Corporation</p>
                <p className="mt-2">This product is licensed to:</p>
                <p>Windows 95 User</p>
              </div>
              <div className="flex justify-end mt-4">
                <button className="win95-button px-4 py-1" onClick={() => setShowAboutDialog(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowSaveDialog(false)}>
          <div className="win95-window p-2 w-96" onClick={(e) => e.stopPropagation()}>
            <div className="win95-titlebar mb-2">
              <span>Save As</span>
              <button className="win95-title-button" onClick={() => setShowSaveDialog(false)}>×</button>
            </div>
            <div className="p-2">
              <div className="mb-4">
                <div className="mb-2">Save in:</div>
                <div className="win95-inset p-1 h-32 overflow-auto">
                  <div className="flex items-center p-1 hover:bg-win95-blue hover:text-white">
                    <div className="w-5 h-5 mr-2">💾</div>
                    <div>My Documents</div>
                  </div>
                  <div className="flex items-center p-1 hover:bg-win95-blue hover:text-white">
                    <div className="w-5 h-5 mr-2">💾</div>
                    <div>Desktop</div>
                  </div>
                  <div className="flex items-center p-1 hover:bg-win95-blue hover:text-white">
                    <div className="w-5 h-5 mr-2">💾</div>
                    <div>C:</div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1">File name:</label>
                <input 
                  type="text" 
                  className="win95-inset px-2 py-1 bg-white w-full"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Save as type:</label>
                <select className="win95-inset px-2 py-1 bg-white w-full">
                  <option>Text Documents (*.txt)</option>
                  <option>All Files (*.*)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button 
                  className="win95-button px-3 py-1" 
                  onClick={() => setShowSaveDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notepad;
