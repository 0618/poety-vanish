import { useState, useEffect } from 'react';
import { poems } from './data/poems';
import PoemDisplay from './components/PoemDisplay';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import { Menu } from 'lucide-react';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPoemId, setCurrentPoemId] = useState(poems[0].id);
  const [level, setLevel] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPoem = poems.find(p => p.id === currentPoemId) || poems[0];

  const handleRandom = () => {
    const randomPoem = poems[Math.floor(Math.random() * poems.length)];
    setCurrentPoemId(randomPoem.id);
  };

  useEffect(() => {
    // Only add global keydown listener if NOT on landing page
    if (showLanding) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Space or Right Arrow -> Increase Level
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault(); // Prevent scrolling for space
        setLevel(prev => Math.min(prev + 1, 3));
      }

      // Left Arrow -> Decrease Level
      if (e.code === 'ArrowLeft') {
        setLevel(prev => Math.max(prev - 1, 0));
      }

      // Sidebar toggle with 'm'
      if (e.key === 'm') {
        setIsSidebarOpen(prev => !prev);
      }

      // Random poem with 'n' (Next) or 'r' (Random)
      if (e.key === 'n' || e.key === 'r') {
        handleRandom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLanding]); // Depend on showLanding

  if (showLanding) {
    return <LandingPage onStart={() => {
      handleRandom();
      setShowLanding(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 font-serif overflow-hidden relative selection:bg-stone-200">

      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/rice-paper-2.png")`
        }}>
      </div>

      {/* Header / Controls Trigger */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-start z-30 pointer-events-none">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="pointer-events-auto p-3 rounded-full bg-white/50 backdrop-blur-md shadow-sm hover:shadow-md transition-all text-stone-600 hover:text-stone-900 border border-stone-200/50"
          title="Menu (m)"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-stone-200/50">
            <span className="text-stone-400 text-sm font-sans uppercase tracking-widest font-bold">Level</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map(l => (
                <div
                  key={l}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${l <= level ? 'bg-stone-800 scale-110' : 'bg-stone-300 scale-90'}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-stone-200/50 text-xs text-stone-400 font-sans max-w-[200px] text-right">
            <span className="font-bold text-stone-500">Space/Right</span> to hide <br />
            <span className="font-bold text-stone-500">Left</span> to reveal <br />
            <span className="font-bold text-stone-500">N / R</span> for random
          </div>
        </div>
      </div>

      <Sidebar
        poems={poems}
        currentPoemId={currentPoemId}
        onSelect={setCurrentPoemId}
        onRandom={handleRandom}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="relative z-10 transition-all duration-500 ease-out">
        <PoemDisplay poem={currentPoem} level={level} />
      </main>

    </div>
  );
}

export default App;
