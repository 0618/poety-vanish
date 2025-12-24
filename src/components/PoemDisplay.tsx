import React from 'react';
import { motion } from 'framer-motion';
import type { Poem, PoemLine } from '../data/poems';

interface PoemDisplayProps {
  poem: Poem;
  level: number;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem, level }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 transition-colors duration-500">
      <div className="max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-stone-900 mb-2">{poem.title}</h1>
          <p className="text-xl md:text-2xl text-stone-500 font-light tracking-wider">{poem.author}</p>
        </motion.div>

        <div className="mt-12 space-y-8 text-2xl md:text-3xl leading-relaxed font-serif text-stone-800">
          {poem.lines.map((line, index) => (
            <LineRenderer key={index} line={line} level={level} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LineRenderer: React.FC<{ line: PoemLine; level: number }> = ({ line, level }) => {
  // Logic for different levels
  if (level === 3) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-10 my-2" // preserve height
      >
        {line.text}
      </motion.div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-[1px]">
      {processLineWithLogic(line, level)}
    </div>
  )
}

const MaskedChar = ({ char, visible }: { char: string, visible: boolean }) => {
  return (
    <span className="relative inline-block w-[1em] h-[1.2em] text-center">
      <motion.span
        initial={false}
        animate={{ opacity: visible ? 1 : 0, filter: visible ? 'blur(0px)' : 'blur(4px)' }}
        transition={{ duration: 0.5 }}
      >
        {char}
      </motion.span>
      {!visible && (
        <span className="absolute inset-0 text-stone-200/50 flex items-center justify-center pt-1" aria-hidden="true">
          •
        </span>
      )}
    </span>
  )
}


function processLineWithLogic(line: PoemLine, level: number) {
  const chars = line.text.split('');

  // Determine visibility for each char
  const visibilityMap = new Array(chars.length).fill(true);

  if (level >= 1) {
    // Mask keywords
    line.keywords.forEach(keyword => {
      let pos = line.text.indexOf(keyword);
      while (pos !== -1) {
        for (let i = 0; i < keyword.length; i++) {
          visibilityMap[pos + i] = false;
        }
        pos = line.text.indexOf(keyword, pos + 1);
      }
    });
  }

  if (level >= 2) {
    // Mask second half
    const firstPuncIndex = line.text.search(/[，？！,?!]/);
    if (firstPuncIndex !== -1) {
      for (let i = firstPuncIndex + 1; i < chars.length; i++) {
        visibilityMap[i] = false;
      }
    }
  }

  if (level === 3) {
    visibilityMap.fill(false);
  }

  return chars.map((char, i) => (
    <MaskedChar key={i} char={char} visible={visibilityMap[i]} />
  ));
}

export default PoemDisplay;
