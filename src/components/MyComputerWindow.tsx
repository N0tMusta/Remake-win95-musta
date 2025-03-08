import React, { useState } from 'react';
import Win95DesktopIcon from './Win95DesktopIcon';
import { Computer, Folder, HardDrive, Settings, FileText, Map, Info, MoreHorizontal, Printer, Network, Clock, User, Maximize2, Monitor } from 'lucide-react';

interface MyComputerProps {
  openWindow: (title: string, content: React.ReactNode, icon: React.ReactNode) => void;
}

const MyComputerWindow: React.FC<MyComputerProps> = ({ openWindow }) => {
  const [currentView, setCurrentView] = useState<'icon' | 'list' | 'details'>('icon');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'size' | 'date'>('name');
  
  const handleViewChange = (view: 'icon' | 'list' | 'details') => {
    setCurrentView(view);
  };
  
  const handleSortChange = (sort: 'name' | 'type' | 'size' | 'date') => {
    setSortBy(sort);
  };
  
  const openCDrive = () => {
    openWindow("(C:)", (
      <DriveContent driveLetter="C" driveType="Local Disk" usedSpace={1.2} totalSpace={2.1} />
    ), <HardDrive size={16} />);
  };
  
  const openDDrive = () => {
    openWindow("(D:)", (
      <DriveContent driveLetter="D" driveType="CD-ROM" usedSpace={0} totalSpace={0.65} />
    ), <HardDrive size={16} />);
  };
  
  const openControlPanel = () => {
    openWindow("Control Panel", (
      <div className="p-4 h-full flex flex-wrap gap-4 content-start">
        <Win95DesktopIcon 
          label="Display" 
          icon={<Monitor size={32} className="text-win95-darkgray" />} 
          onClick={() => openDisplaySettings()} 
        />
        <Win95DesktopIcon 
          label="Mouse" 
          icon={<div className="text-win95-darkgray">🖱️</div>} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Keyboard" 
          icon={<div className="text-win95-darkgray">⌨️</div>} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Sounds" 
          icon={<div className="text-win95-darkgray">🔊</div>} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Date/Time" 
          icon={<Clock size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Printers" 
          icon={<Printer size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Network" 
          icon={<Network size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="Users" 
          icon={<User size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="System" 
          icon={<Info size={32} className="text-win95-darkgray" />} 
          onClick={() => openSystemProperties()} 
        />
      </div>
    ), <Settings size={16} />);
  };
  
  const openDisplaySettings = () => {
    openWindow("Display Properties", (
      <div className="p-4 h-full">
        <div className="win95-inset p-2 bg-white h-full flex flex-col">
          <div className="flex border-b border-win95-border-dark mb-2">
            <button className="win95-button px-2 py-1 mr-1">Background</button>
            <button className="win95-button px-2 py-1 mr-1">Screen Saver</button>
            <button className="win95-button px-2 py-1 mr-1">Appearance</button>
            <button className="win95-button px-2 py-1">Settings</button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="win95-window w-40 h-32 mb-4 flex flex-col">
              <div className="win95-titlebar text-xs">
                <div>Active Window</div>
                <div className="flex">
                  <button className="w-4 h-4 flex items-center justify-center">_</button>
                  <button className="w-4 h-4 flex items-center justify-center">□</button>
                  <button className="w-4 h-4 flex items-center justify-center">×</button>
                </div>
              </div>
              <div className="p-1 text-xs">Window content</div>
            </div>
            
            <div className="text-sm mb-4">Color scheme: Windows Standard</div>
            
            <div className="flex gap-2">
              <button className="win95-button px-2 py-1">Change Colors...</button>
              <button className="win95-button px-2 py-1">Apply</button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <button className="win95-button px-4 py-1">OK</button>
            <button className="win95-button px-4 py-1">Cancel</button>
            <button className="win95-button px-4 py-1">Apply</button>
          </div>
        </div>
      </div>
    ), <Monitor size={16} />);
  };
  
  const openSystemProperties = () => {
    openWindow("System Properties", (
      <div className="p-4 h-full">
        <div className="win95-inset p-2 bg-white h-full flex flex-col">
          <div className="flex border-b border-win95-border-dark mb-2">
            <button className="win95-button px-2 py-1 mr-1">General</button>
            <button className="win95-button px-2 py-1 mr-1">Device Manager</button>
            <button className="win95-button px-2 py-1 mr-1">Hardware Profiles</button>
            <button className="win95-button px-2 py-1">Performance</button>
          </div>
          
          <div className="flex-1 p-2">
            <div className="flex items-center justify-center mb-4">
              <div className="mr-4">
                <img src="https://i.imgur.com/Ip8qlil.png" alt="Windows 95 Logo" className="w-16 h-16" />
              </div>
              <div>
                <div className="font-bold">Microsoft Windows 95</div>
                <div className="text-xs">4.00.950 B</div>
                <div className="text-xs mt-2">Copyright © 1981-1995 Microsoft Corp.</div>
              </div>
            </div>
            
            <div className="win95-inset p-2 bg-white mb-4">
              <div className="text-sm mb-1">Computer:</div>
              <div className="text-xs ml-4">Pentium 90MHz</div>
              <div className="text-sm mb-1 mt-2">Memory:</div>
              <div className="text-xs ml-4">16 MB RAM</div>
              <div className="text-sm mb-1 mt-2">System:</div>
              <div className="text-xs ml-4">Microsoft Windows 95</div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button className="win95-button px-4 py-1">OK</button>
            <button className="win95-button px-4 py-1">Cancel</button>
            <button className="win95-button px-4 py-1">Apply</button>
          </div>
        </div>
      </div>
    ), <Info size={16} />);
  };
  
  const openNetworkNeighborhood = () => {
    openWindow("Network Neighborhood", (
      <div className="p-4 h-full flex flex-wrap gap-4 content-start">
        <Win95DesktopIcon 
          label="Entire Network" 
          icon={<Network size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
        <Win95DesktopIcon 
          label="WORKGROUP" 
          icon={<Folder size={32} className="text-win95-darkgray" />} 
          onClick={() => {}} 
        />
      </div>
    ), <Network size={16} />);
  };
  
  const openDialupNetworking = () => {
    openWindow("Dial-Up Networking", (
      <div className="p-4 h-full flex flex-wrap gap-4 content-start">
        <Win95DesktopIcon 
          label="Make New Connection" 
          icon={<div className="text-win95-darkgray">📞</div>} 
          onClick={() => {}} 
        />
      </div>
    ), <div className="text-win95-darkgray">📞</div>);
  };
  
  const openPrinters = () => {
    openWindow("Printers", (
      <div className="p-4 h-full flex flex-wrap gap-4 content-start">
        <Win95DesktopIcon 
          label="Add Printer" 
          icon={<div className="text-win95-darkgray">🖨️</div>} 
          onClick={() => {}} 
        />
      </div>
    ), <Printer size={16} />);
  };
  
  const renderToolbar = () => (
    <div className="border-b border-win95-border-dark mb-2">
      <div className="flex p-1">
        <div className="flex gap-1 mr-4">
          <button className="win95-button px-2 text-xs py-0.5">File</button>
          <button className="win95-button px-2 text-xs py-0.5">Edit</button>
          <button className="win95-button px-2 text-xs py-0.5">View</button>
          <button className="win95-button px-2 text-xs py-0.5">Help</button>
        </div>
        
        <div className="flex gap-1">
          <button className="win95-button w-6 h-6 flex items-center justify-center">
            <MoreHorizontal size={12} />
          </button>
          <div className="win95-divider"></div>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${currentView === 'icon' ? 'active' : ''}`}
            onClick={() => handleViewChange('icon')}
          >
            <Maximize2 size={12} />
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => handleViewChange('list')}
          >
            <div className="text-xs">▤</div>
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${currentView === 'details' ? 'active' : ''}`}
            onClick={() => handleViewChange('details')}
          >
            <div className="text-xs">≡</div>
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderView = () => {
    if (currentView === 'details') {
      return (
        <div className="win95-inset bg-white flex-1 p-1 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="font-bold">
                <th className="text-left p-1">Name</th>
                <th className="text-left p-1">Type</th>
                <th className="text-left p-1">Size</th>
                <th className="text-left p-1">Free Space</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-win95-blue hover:text-white cursor-pointer" onClick={openCDrive}>
                <td className="p-1 flex items-center"><HardDrive size={16} className="mr-1" />(C:)</td>
                <td className="p-1">Local Disk</td>
                <td className="p-1">2.1 GB</td>
                <td className="p-1">900 MB</td>
              </tr>
              <tr className="hover:bg-win95-blue hover:text-white cursor-pointer" onClick={openDDrive}>
                <td className="p-1 flex items-center"><HardDrive size={16} className="mr-1" />(D:)</td>
                <td className="p-1">CD-ROM</td>
                <td className="p-1">650 MB</td>
                <td className="p-1">650 MB</td>
              </tr>
              <tr className="hover:bg-win95-blue hover:text-white cursor-pointer" onClick={openControlPanel}>
                <td className="p-1 flex items-center"><Settings size={16} className="mr-1" />Control Panel</td>
                <td className="p-1">System Folder</td>
                <td className="p-1">-</td>
                <td className="p-1">-</td>
              </tr>
              <tr className="hover:bg-win95-blue hover:text-white cursor-pointer" onClick={openNetworkNeighborhood}>
                <td className="p-1 flex items-center"><Network size={16} className="mr-1" />Network Neighborhood</td>
                <td className="p-1">System Folder</td>
                <td className="p-1">-</td>
                <td className="p-1">-</td>
              </tr>
              <tr className="hover:bg-win95-blue hover:text-white cursor-pointer" onClick={openDialupNetworking}>
                <td className="p-1 flex items-center"><div className="mr-1">📞</div>Dial-Up Networking</td>
                <td className="p-1">System Folder</td>
                <td className="p-1">-</td>
                <td className="p-1">-</td>
              </tr>
              <tr className="hover:bg-win95-blue hover:text-white cursor-pointer" onClick={openPrinters}>
                <td className="p-1 flex items-center"><Printer size={16} className="mr-1" />Printers</td>
                <td className="p-1">System Folder</td>
                <td className="p-1">-</td>
                <td className="p-1">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (currentView === 'list') {
      return (
        <div className="win95-inset bg-white flex-1 p-2 overflow-auto">
          <div className="grid grid-cols-2 gap-1">
            <div className="flex items-center hover:bg-win95-blue hover:text-white cursor-pointer p-1" onClick={openCDrive}>
              <HardDrive size={16} className="mr-1" />(C:)
            </div>
            <div className="flex items-center hover:bg-win95-blue hover:text-white cursor-pointer p-1" onClick={openDDrive}>
              <HardDrive size={16} className="mr-1" />(D:)
            </div>
            <div className="flex items-center hover:bg-win95-blue hover:text-white cursor-pointer p-1" onClick={openControlPanel}>
              <Settings size={16} className="mr-1" />Control Panel
            </div>
            <div className="flex items-center hover:bg-win95-blue hover:text-white cursor-pointer p-1" onClick={openNetworkNeighborhood}>
              <Network size={16} className="mr-1" />Network Neighborhood
            </div>
            <div className="flex items-center hover:bg-win95-blue hover:text-white cursor-pointer p-1" onClick={openDialupNetworking}>
              <div className="mr-1">📞</div>Dial-Up Networking
            </div>
            <div className="flex items-center hover:bg-win95-blue hover:text-white cursor-pointer p-1" onClick={openPrinters}>
              <Printer size={16} className="mr-1" />Printers
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="win95-inset bg-white flex-1 p-4 overflow-auto">
          <div className="flex flex-wrap gap-4 content-start">
            <Win95DesktopIcon 
              label="(C:)" 
              icon={<HardDrive size={32} className="text-win95-darkgray" />} 
              onClick={openCDrive} 
            />
            <Win95DesktopIcon 
              label="(D:)" 
              icon={<HardDrive size={32} className="text-win95-darkgray" />} 
              onClick={openDDrive} 
            />
            <Win95DesktopIcon 
              label="Control Panel" 
              icon={<Settings size={32} className="text-win95-darkgray" />} 
              onClick={openControlPanel} 
            />
            <Win95DesktopIcon 
              label="Network Neighborhood" 
              icon={<Network size={32} className="text-win95-darkgray" />} 
              onClick={openNetworkNeighborhood} 
            />
            <Win95DesktopIcon 
              label="Dial-Up Networking" 
              icon={<div className="text-win95-darkgray">📞</div>} 
              onClick={openDialupNetworking} 
            />
            <Win95DesktopIcon 
              label="Printers" 
              icon={<Printer size={32} className="text-win95-darkgray" />} 
              onClick={openPrinters} 
            />
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {renderToolbar()}
      <div className="text-xs px-2 mb-1">
        <span>My Computer</span>
      </div>
      {renderView()}
      <div className="flex items-center justify-between p-1 border-t border-win95-border-light mt-1 text-xs">
        <div>6 objects</div>
        <div>15.2 MB</div>
      </div>
    </div>
  );
};

const DriveContent: React.FC<{
  driveLetter: string;
  driveType: string;
  usedSpace: number;
  totalSpace: number;
}> = ({ driveLetter, driveType, usedSpace, totalSpace }) => {
  const freeSpace = totalSpace - usedSpace;
  const percentUsed = Math.round((usedSpace / totalSpace) * 100) || 0;
  
  const [currentView, setCurrentView] = useState<'icon' | 'list' | 'details'>('icon');
  
  const handleViewChange = (view: 'icon' | 'list' | 'details') => {
    setCurrentView(view);
  };
  
  const renderToolbar = () => (
    <div className="border-b border-win95-border-dark mb-2">
      <div className="flex p-1">
        <div className="flex gap-1 mr-4">
          <button className="win95-button px-2 text-xs py-0.5">File</button>
          <button className="win95-button px-2 text-xs py-0.5">Edit</button>
          <button className="win95-button px-2 text-xs py-0.5">View</button>
          <button className="win95-button px-2 text-xs py-0.5">Help</button>
        </div>
        
        <div className="flex gap-1">
          <button className="win95-button w-6 h-6 flex items-center justify-center">
            <MoreHorizontal size={12} />
          </button>
          <div className="win95-divider"></div>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${currentView === 'icon' ? 'active' : ''}`}
            onClick={() => handleViewChange('icon')}
          >
            <Maximize2 size={12} />
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => handleViewChange('list')}
          >
            <div className="text-xs">▤</div>
          </button>
          <button 
            className={`win95-button w-6 h-6 flex items-center justify-center ${currentView === 'details' ? 'active' : ''}`}
            onClick={() => handleViewChange('details')}
          >
            <div className="text-xs">≡</div>
          </button>
        </div>
      </div>
    </div>
  );
  
  const getFolderContents = () => {
    if (driveLetter === 'C') {
      return (
        <>
          <Win95DesktopIcon 
            label="Program Files" 
            icon={<Folder size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
          <Win95DesktopIcon 
            label="Windows" 
            icon={<Folder size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
          <Win95DesktopIcon 
            label="My Documents" 
            icon={<Folder size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
          <Win95DesktopIcon 
            label="Temp" 
            icon={<Folder size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
          <Win95DesktopIcon 
            label="autoexec.bat" 
            icon={<FileText size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
          <Win95DesktopIcon 
            label="config.sys" 
            icon={<FileText size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
          <Win95DesktopIcon 
            label="msdos.sys" 
            icon={<FileText size={32} className="text-win95-darkgray" />} 
            onClick={() => {}} 
          />
        </>
      );
    } else if (driveLetter === 'D') {
      return (
        <div className="flex items-center justify-center h-full text-win95-darkgray">
          <div className="text-center">
            <div className="mb-2">CD-ROM Drive</div>
            <div className="text-xs">No disc inserted</div>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {renderToolbar()}
      <div className="text-xs px-2 mb-1">
        <span>Drive ({driveLetter}:)</span>
      </div>
      
      <div className="win95-inset bg-white p-2 mb-2">
        <div className="text-xs mb-1">Drive {driveLetter}: ({driveType})</div>
        <div className="flex gap-2 items-center">
          <div className="win95-inset bg-white h-4 flex-1">
            <div className="bg-win95-blue h-full" style={{ width: `${percentUsed}%` }}></div>
          </div>
          <div className="text-xs w-24">
            {percentUsed}% used
          </div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <div>{usedSpace.toFixed(1)} GB used</div>
          <div>{freeSpace.toFixed(1)} GB free</div>
          <div>{totalSpace.toFixed(1)} GB total</div>
        </div>
      </div>
      
      <div className="win95-inset bg-white flex-1 p-4 overflow-auto">
        <div className="flex flex-wrap gap-4 content-start">
          {getFolderContents()}
        </div>
      </div>
      
      <div className="flex items-center justify-between p-1 border-t border-win95-border-light mt-1 text-xs">
        <div>{driveLetter === 'C' ? '7 objects' : '0 objects'}</div>
        <div>{freeSpace.toFixed(1)} GB free</div>
      </div>
    </div>
  );
};

export default MyComputerWindow;
