import React from 'react';
import type { Poem } from '../data/poems';
import { BookOpen, X, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  poems: Poem[];
  currentPoemId: string;
  onSelect: (id: string) => void;
  onRandom: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ poems, currentPoemId, onSelect, onRandom, isOpen, onClose }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-[#f7f5f0] shadow-xl z-50 border-r border-stone-200"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    诗集
                  </h2>
                  <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-stone-600" />
                  </button>
                </div>

                <div className="mb-4">
                  <button
                    onClick={() => {
                      onRandom();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-stone-200 hover:bg-stone-300 rounded-xl text-stone-700 font-bold transition-colors"
                  >
                    <Shuffle className="w-4 h-4" />
                    随机一首
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  {poems.map(poem => (
                    <button
                      key={poem.id}
                      onClick={() => {
                        onSelect(poem.id);
                        onClose();
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group ${currentPoemId === poem.id
                        ? 'bg-stone-800 text-stone-50 shadow-md'
                        : 'hover:bg-stone-200 text-stone-600'
                        }`}
                    >
                      <div className="text-lg font-bold font-serif">{poem.title}</div>
                      <div className={`text-sm mt-1 ${currentPoemId === poem.id ? 'text-stone-400' : 'text-stone-400'}`}>
                        {poem.author}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-6 mt-auto border-t border-stone-200 text-xs text-stone-400 text-center">
                  Poem Vanish v1.0
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
