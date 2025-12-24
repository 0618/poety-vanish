import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers, Wind } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 font-serif relative overflow-hidden flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]">

      <div className="max-w-3xl w-full z-10 flex flex-col gap-16">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900">
            Poetry Vanish
          </h1>
          <p className="text-2xl md:text-3xl text-stone-500 font-light tracking-wide">
            渐隐诗词
          </p>
          <p className="text-stone-400 text-sm tracking-widest uppercase mt-4">
            The Art of Memory
          </p>
        </motion.div>

        {/* Inspirations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center space-y-3 group">
            <div className="p-4 rounded-full bg-stone-100/50 mb-2 group-hover:bg-stone-200/50 transition-colors duration-500">
              <Layers className="w-6 h-6 text-stone-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800">层层递进</h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-[200px]">
              四个阶段，循序渐进。<br />
              从朗读到背诵，自然发生。
            </p>
            <span className="text-xs text-stone-400 font-sans border border-stone-200 px-2 py-1 rounded">
              Space / →
            </span>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center space-y-3 group">
            <div className="p-4 rounded-full bg-stone-100/50 mb-2 group-hover:bg-stone-200/50 transition-colors duration-500">
              <BookOpen className="w-6 h-6 text-stone-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800">回溯复习</h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-[200px]">
              随时回退，温故知新。<br />
              遗忘之处，即是突破点。
            </p>
            <span className="text-xs text-stone-400 font-sans border border-stone-200 px-2 py-1 rounded">
              ← Left
            </span>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center space-y-3 group">
            <div className="p-4 rounded-full bg-stone-100/50 mb-2 group-hover:bg-stone-200/50 transition-colors duration-500">
              <Wind className="w-6 h-6 text-stone-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800">心流体验</h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-[200px]">
              极简界面，摒弃干扰。<br />
              此刻，只有你与诗歌。
            </p>
            <span className="text-xs text-stone-400 font-sans border border-stone-200 px-2 py-1 rounded">
              Focus
            </span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center pt-8"
        >
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-stone-800 text-stone-100 rounded-full hover:bg-stone-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 font-sans tracking-widest uppercase text-sm font-bold">
              开始背诵 (Start)
            </span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-stone-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </button>
        </motion.div>

      </div>

      {/* Footer / Copyright */}
      <div className="absolute bottom-6 text-stone-300 text-xs font-sans">
        © 2024 Poetry Vanish
      </div>
    </div>
  );
}
