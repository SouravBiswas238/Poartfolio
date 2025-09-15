import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ThemeSelector from './components/ThemeSelector';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

function AppContent() {
  const { currentTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeProvider>
      <div className={`min-h-screen bg-background text-text transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Animation */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-10 -left-10 w-20 h-20 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20"
            style={{ backgroundColor: currentTheme.primary }}
          ></div>
          <div 
            className="absolute top-1/3 -right-10 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000 opacity-20"
            style={{ backgroundColor: currentTheme.secondary }}
          ></div>
          <div 
            className="absolute -bottom-10 left-1/3 w-24 h-24 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000 opacity-20"
            style={{ backgroundColor: currentTheme.accent }}
          ></div>
        </div>

        <Navigation />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;