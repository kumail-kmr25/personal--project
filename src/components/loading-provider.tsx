"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CodeTerminalLoading } from '@/components/loading-animation';

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading only on first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setTimeout(() => setIsLoading(false), 0);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <CodeTerminalLoading
            key="loading"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
