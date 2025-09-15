import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const handleThemeSelect = (themeKey: string) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 bg-surface/40 backdrop-blur-md rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Change theme"
      >
        <Settings size={20} className="text-primary animate-spin-slow" />
      </button>

      {/* Theme Selector Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-surface/90 backdrop-blur-md rounded-2xl border border-primary/20 p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text">Choose Your Theme</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {Object.entries(availableThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeSelect(key)}
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    currentTheme.name === theme.name
                      ? 'border-2 bg-white/10 shadow-lg'
                      : 'border-gray-600/30 bg-gray-800/50 hover:border-gray-400/50'
                  }`}
                  style={{
                    borderColor: currentTheme.name === theme.name ? theme.primary : undefined
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ background: theme.gradient }}
                      />
                      <div className="text-left">
                        <p className="font-medium text-text text-sm">{theme.name}</p>
                        <div className="flex space-x-1 mt-1">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Color Preview Bar */}
                    <div className="flex flex-col space-y-1">
                      <div 
                        className="w-16 h-2 rounded-full"
                        style={{ background: theme.gradient }}
                      />
                      <div className="flex space-x-1">
                        <div 
                          className="w-5 h-2 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="w-5 h-2 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div 
                          className="w-5 h-2 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {currentTheme.name === theme.name && (
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white">
                      <div 
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector;