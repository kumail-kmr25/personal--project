"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  'const developer = {',
  '  name: "Kumail Kmr",',
  '  role: "Full-Stack Developer",',
  '  skills: ["Next.js", "TypeScript", "PostgreSQL"],',
  '  experience: "5+ years",',
  '  projects: 50,',
  '  clients: 30,',
  '  passion: "Building revenue-generating apps"',
  '};',
  '',
  'console.log("Initializing portfolio...");',
  'console.log("Loading projects...");',
  'console.log("Compiling success stories...");',
  '',
  '// Welcome to my portfolio!',
  '// Ready in 3... 2... 1...',
];

export function CodeTerminalLoading({ onComplete }: { onComplete: () => void }) {
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      const timer = setTimeout(() => onComplete(), 1000);
      return () => clearTimeout(timer);
    }

    const currentLine = codeLines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => {
          const newCode = [...prev];
          if (newCode[currentLineIndex] === undefined) {
            newCode[currentLineIndex] = '';
          }
          newCode[currentLineIndex] += currentLine[currentCharIndex];
          return newCode;
        });
        setCurrentCharIndex(prev => prev + 1);
        setProgress(((currentLineIndex * 100 + (currentCharIndex / currentLine.length) * 100) / codeLines.length));
      }, 30); // Typing speed

      return () => clearTimeout(timer);
    } else {
      // Move to next line after pause
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [currentCharIndex, currentLineIndex, onComplete]); // Removed codeLines.length dependency

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 lg:p-12"
    >
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Terminal Window */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 flex flex-col flex-1 min-h-0">
          {/* Terminal Header */}
          <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-600 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              </div>
              <span className="ml-4 text-xs font-semibold text-gray-400 font-mono tracking-widest uppercase">portfolio.ts</span>
            </div>
            
            <button 
              onClick={handleSkip}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-800 px-3 py-1 rounded"
              title="Skip Animation"
            >
              Skip
            </button>
          </div>

          {/* Code Area */}
          <div className="p-6 font-mono text-sm overflow-auto flex-1 custom-scrollbar">
            {displayedCode.map((line, lineIndex) => (
              <div key={lineIndex} className="flex mb-1 items-start whitespace-pre-wrap word-break">
                {/* Line Number */}
                <span className="text-gray-500 select-none mr-4 text-right w-8 opacity-50 shrink-0">
                  {(lineIndex + 1).toString().padStart(2, '0')}
                </span>
                
                {/* Code with Syntax Highlighting */}
                <span className="flex-1">
                  <SyntaxHighlight code={line} />
                  {lineIndex === currentLineIndex && showCursor && (
                    <span className="inline-block w-2.5 h-4 bg-blue-400 ml-1 animate-pulse align-middle" />
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-800/80 px-6 py-4 border-t border-gray-700 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest font-bold">
                Compiling portfolio...
              </span>
              <span className="text-xs text-blue-400 font-black font-mono">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 shrink-0 pb-4"
        >
          <p className="text-white text-lg font-bold tracking-tight">
            Initializing Portfolio Experience
          </p>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-extrabold mt-2">
            Kumail Kmr • Full-Stack Developer
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Syntax Highlighting Component
function SyntaxHighlight({ code }: { code: string }) {
  // Keywords
  if (code.includes('const ') || code.includes('console.')) {
    // split to highlight specific words
    if (code.startsWith('const ')) {
      return (
        <span>
          <span className="text-purple-400">const </span>
          <span className="text-blue-300">{code.substring(6)}</span>
        </span>
      );
    }
    if (code.startsWith('console.log')) {
      return (
        <span>
          <span className="text-yellow-200">console</span>
          <span className="text-gray-400">.</span>
          <span className="text-blue-300">log</span>
          <span className="text-gray-300">{code.substring(11)}</span>
        </span>
      );
    }
    return <span className="text-purple-400">{code}</span>;
  }
  // Comments
  if (code.trim().startsWith('//')) {
    return <span className="text-emerald-400/70 italic">{code}</span>;
  }
  // Strings inside array/object (simple regex based for safe render)
  if (code.includes('"') && !code.startsWith('console.log')) {
    const parts = code.split('"');
    return (
      <>
        {parts.map((part, i) => (
          i % 2 === 0 ? 
            <span key={i} className="text-emerald-300">{part}</span> : 
            <span key={i} className="text-amber-300">&quot;{part}&quot;</span>
        ))}
      </>
    );
  }
  // Properties
  if (code.includes(':') && code.trim().startsWith(' ')) {
    const [prop, ...rest] = code.split(':');
    return (
      <span>
       <span className="text-rose-400">{prop}</span>
       <span className="text-gray-400">:</span>
       <span className="text-blue-300">{rest.join(':')}</span>
      </span>
    );
  }
  // Default
  return <span className="text-gray-300">{code}</span>;
}
