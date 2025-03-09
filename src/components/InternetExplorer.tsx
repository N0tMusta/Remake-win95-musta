
import React, { useState, useEffect } from 'react';
import { Globe, ArrowLeft, ArrowRight, Refresh, Home, FileText, Search } from 'lucide-react';

interface WebPage {
  url: string;
  title: string;
  content: React.ReactNode;
}

const InternetExplorer: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState("https://www.microsoft.com");
  const [inputUrl, setInputUrl] = useState("https://www.microsoft.com");
  const [history, setHistory] = useState<string[]>(["https://www.microsoft.com"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([
    "https://www.microsoft.com",
    "https://www.yahoo.com",
    "https://www.geocities.com"
  ]);

  // Simulated web pages
  const webPages: Record<string, WebPage> = {
    "https://www.microsoft.com": {
      url: "https://www.microsoft.com",
      title: "Microsoft - Where do you want to go today?",
      content: (
        <div className="p-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="text-3xl font-bold text-win95-blue">Microsoft</div>
          </div>
          <div className="mb-6 text-lg">Welcome to Microsoft.com</div>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button className="win95-button px-4 py-2">Products</button>
            <button className="win95-button px-4 py-2">Support</button>
            <button className="win95-button px-4 py-2">Downloads</button>
            <button className="win95-button px-4 py-2">Contact Us</button>
          </div>
          <div className="win95-inset p-4 max-w-md mx-auto">
            <div className="font-bold mb-2">Latest News</div>
            <ul className="text-left">
              <li className="mb-1">• Windows 95 released to great acclaim!</li>
              <li className="mb-1">• Microsoft Office gets new features</li>
              <li className="mb-1">• Internet Explorer 4.0 coming soon</li>
              <li className="mb-1">• Bill Gates predicts a computer in every home</li>
            </ul>
          </div>
        </div>
      )
    },
    "https://www.yahoo.com": {
      url: "https://www.yahoo.com",
      title: "Yahoo! - The world's favorite online guide",
      content: (
        <div className="p-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="text-3xl font-bold text-purple-700">Yahoo!</div>
          </div>
          <div className="win95-inset p-2 max-w-md mx-auto mb-4">
            <input 
              type="text" 
              className="w-full p-1" 
              placeholder="Search the web" 
            />
            <button className="win95-button mt-2 px-4 py-1">Search</button>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="win95-inset p-2 text-left">
              <div className="font-bold mb-1">Directory</div>
              <ul className="text-sm">
                <li>• Arts & Humanities</li>
                <li>• Business & Economy</li>
                <li>• Computers & Internet</li>
                <li>• Education</li>
                <li>• Entertainment</li>
                <li>• Government</li>
              </ul>
            </div>
            <div className="win95-inset p-2 text-left">
              <div className="font-bold mb-1">Yahoo! Services</div>
              <ul className="text-sm">
                <li>• My Yahoo!</li>
                <li>• Yahoo! Mail</li>
                <li>• Yahoo! Chat</li>
                <li>• Yahoo! Messenger</li>
                <li>• Yahoo! Games</li>
                <li>• Yahoo! Classifieds</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    "https://www.geocities.com": {
      url: "https://www.geocities.com",
      title: "GeoCities - Your Home on the Web",
      content: (
        <div className="p-4">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-green-600">GeoCities</div>
            <div className="text-sm">Your Home on the Web</div>
          </div>
          <div className="win95-inset p-3 max-w-md mx-auto mb-4">
            <div className="font-bold mb-2 text-center">Welcome to GeoCities!</div>
            <div className="text-sm">
              Join our community and create your own free homepage! Express yourself to the world!
            </div>
            <div className="flex justify-center mt-2">
              <button className="win95-button px-4 py-1">Sign Up Now!</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="win95-inset p-2">
              <div className="font-bold mb-1">Neighborhoods</div>
              <ul className="text-xs">
                <li>• Hollywood (Entertainment)</li>
                <li>• SiliconValley (Computers)</li>
                <li>• Broadway (Arts & Literature)</li>
                <li>• Tokyo (Asian Culture)</li>
                <li>• Athens (Education)</li>
                <li>• CapitolHill (Politics)</li>
              </ul>
            </div>
            <div className="win95-inset p-2">
              <div className="font-bold mb-1">Trending Sites</div>
              <div className="text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 mr-1"></div>
                  <div>Cool Cat Page</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 mr-1"></div>
                  <div>90s Music Fan</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 mr-1"></div>
                  <div>My Vacation Photos</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 mr-1"></div>
                  <div>X-Files Fan Club</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 mr-1"></div>
                  <div>Under Construction</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <img 
              src="data:image/gif;base64,R0lGODlhGAAYAPf/AP///wAAAP///////////////////////////yH5BAEAAP8ALAAAAAAYABgAAAj/AP8JHEiwoMGDCBMqRAhg4cKHECNKnEixosWLGDNq3Mixo8ePIEOKHGkQAMmTKFOqXMkSgMuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cOPKnUu3rt27ePPq3cu3r9+/gAMLHky4sOHDiBMrXsy4sePHkCNLnky5suXLmDNr3sy5s+fPoEOLHk26tOnTqFOrXs26tevXsGPLnk27tu3buHPr3s27t+/fwIMLH068uPHjyJMrX868ufPn0KNLn069uvXr2LNr3869u/fv4MOLDh9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEEYo4YQUVmjhhRhmqOGGHHbo4YcghijiiCSWaOKJKKao4oostujiizDGKOOMNNZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQRinllFRWaeWVWGap5ZZcdunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6quwxirrrLTWauutuOaq66689urrr8AGK+ywxBZr7LHIJqvsssw26+yz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuOSWa+656Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcs8MAEF2zwwQgnrPDCDDfs8MMQRyzxxBRXbPHFGGes8cYcd+zxxyCHLPLIJJds8skop6zyyiy37PLLMMcs88w012zzzTjnrPPOPPfs889ABy300EQXbfTRSCet9NJMN+3001BHLfXUVFdt9dVYZ6311lx37fXXYIct9thkl2322WinrfbabLft9ttwxy333HTXbffdeOet99589+3334AHLvjghBf+qdoFAQA7" 
              alt="Under Construction" 
              className="mx-auto"
            />
            <div className="text-xs mt-2">This site is under construction. Please check back later!</div>
          </div>
        </div>
      )
    }
  };

  const navigate = (url: string) => {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setCurrentUrl(url);
      setInputUrl(url);
      
      // Update history
      if (history[historyIndex] !== url) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(url);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(history[historyIndex - 1]);
      setInputUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(history[historyIndex + 1]);
      setInputUrl(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const goHome = () => {
    navigate("https://www.microsoft.com");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl);
  };

  const addBookmark = () => {
    if (!bookmarks.includes(currentUrl)) {
      setBookmarks([...bookmarks, currentUrl]);
    }
  };

  const getDefaultPage = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Globe size={64} className="mx-auto mb-4 text-win95-darkgray" />
        <p>Page not found</p>
        <p className="text-xs text-win95-darkgray mt-2">The page cannot be displayed.</p>
      </div>
    </div>
  );

  const currentPage = webPages[currentUrl] || {
    url: currentUrl,
    title: "Page not found",
    content: getDefaultPage()
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="flex gap-1 mb-2">
        <button 
          className="win95-button px-2 py-1"
          onClick={goBack}
          disabled={historyIndex === 0}
        >
          <ArrowLeft size={14} />
        </button>
        <button 
          className="win95-button px-2 py-1"
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
        >
          <ArrowRight size={14} />
        </button>
        <button 
          className="win95-button px-2 py-1"
          onClick={refresh}
        >
          <Refresh size={14} />
        </button>
        <button 
          className="win95-button px-2 py-1"
          onClick={goHome}
        >
          <Home size={14} />
        </button>
        <button 
          className="win95-button px-2 py-1"
          onClick={addBookmark}
        >
          <FileText size={14} />
        </button>
        <button 
          className="win95-button px-2 py-1"
        >
          <Search size={14} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-1 mb-2 items-center">
        <span>Address:</span>
        <input 
          type="text" 
          className="win95-inset flex-1 px-2 py-1 bg-white" 
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button type="submit" className="win95-button px-2 py-1">Go</button>
      </form>
      
      <div className="win95-inset flex-1 bg-white overflow-auto relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-center">
              <div className="mb-2">Loading...</div>
              <div className="win95-progress-bar w-48">
                <div className="win95-progress-value animate-progress"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-win95-gray border-b border-win95-border-dark p-1 font-bold">
              {currentPage.title}
            </div>
            <div className="overflow-auto">
              {currentPage.content}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 flex justify-between text-xs">
        <div>Status: {isLoading ? 'Loading...' : 'Done'}</div>
        <div>Internet Zone</div>
      </div>
    </div>
  );
};

export default InternetExplorer;
