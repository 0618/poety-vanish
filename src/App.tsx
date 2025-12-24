import { useState, useEffect, useRef } from 'react';
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

  // Touch handling state
  const touchStart = useRef<{ x: number, y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchStart.current.x - touchEnd.x;
    const deltaY = touchStart.current.y - touchEnd.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    // Check for Swipe (horizontal dominance)
    if (absDeltaX > minSwipeDistance && absDeltaX > absDeltaY) {
      if (deltaX > 0) {
        // Swipe Left -> Next/Random
        handleRandom();
      }
      // Swipe Right -> could be Back/Prev Poem (not implemented yet), letting it fall through to tap?
      // For now, let's strictly handle Swipe Left, and ignore Swipe Right to avoid accidental triggers
      touchStart.current = null;
      return;
    }

    // Check for Tap (minimal movement)
    if (absDeltaX < 10 && absDeltaY < 10) {
      // Tap Logic
      const screenWidth = window.innerWidth;
      const tapX = touchEnd.x;

      if (tapX < screenWidth * 0.25) {
        // Left 25% -> Decrease Level
        setLevel(prev => Math.max(prev - 1, 0));
      } else {
        // Right 75% -> Increase Level
        setLevel(prev => Math.min(prev + 1, 3));
      }
    }

    touchStart.current = null;
  };

  return (
    <div
      className="min-h-screen bg-[#fcfbf9] text-stone-800 font-serif overflow-hidden relative selection:bg-stone-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

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
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-stone-200/50 ${l === level ? 'scale-110' : 'scale-90 hover:scale-100'}`}
                  aria-label={`Set difficulty to level ${l}`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${l <= level ? 'bg-stone-800' : 'bg-stone-300'}`} />
                </button>
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
