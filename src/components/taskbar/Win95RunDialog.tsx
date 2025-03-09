
import React from 'react';
import { FileText } from 'lucide-react';

interface Win95RunDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Win95RunDialog: React.FC<Win95RunDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div className="win95-window p-2 w-80" onClick={(e) => e.stopPropagation()}>
        <div className="win95-titlebar mb-2">
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>Run</span>
          </div>
          <button className="win95-title-button" onClick={onClose}>
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
            <button className="win95-button px-3 py-1" onClick={onClose}>Cancel</button>
            <button className="win95-button px-3 py-1">Browse...</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Win95RunDialog;
