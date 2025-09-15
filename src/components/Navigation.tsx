import React, { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navigation: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleThemeSelect = (themeKey: string) => {
    setTheme(themeKey);
    setShowThemeModal(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-lg border-b border-surface/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative group cursor-pointer">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: currentTheme.gradient,
                  borderColor: currentTheme.primary,
                }}
              >
                <span className="text-white font-bold text-xs sm:text-sm lg:text-lg tracking-wider">
                  SKB
                </span>
              </div>
              <div
                className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full border border-white sm:border-2"
                style={{ backgroundColor: currentTheme.accent }}
              ></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm xl:text-base font-medium transition-colors duration-200 hover:text-primary ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-text-secondary"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-100 transition-transform duration-200"></div>
                )}
              </button>
            ))}

            {/* Desktop Theme Selector Button */}
            <button
              onClick={() => setShowThemeModal(true)}
              className="p-2 xl:p-3 rounded-full bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center border border-primary border-opacity-25 hover:border-opacity-100"
              aria-label="Change theme"
            >
              <Settings
                size={18}
                className="xl:w-5 xl:h-5 text-primary animate-spin-slow"
              />
            </button>
          </div>

          {/* Mobile/Tablet Controls */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            {/* Theme Button */}
            <button
              onClick={() => setShowThemeModal(true)}
              className="p-2 rounded-full bg-surface/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
              aria-label="Change theme"
            >
              <Settings
                size={16}
                className="sm:w-[18px] sm:h-[18px] text-primary animate-spin-slow"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button p-2 rounded-lg text-text-secondary hover:text-text hover:bg-surface/30 transition-all duration-200 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu lg:hidden bg-surface/95 backdrop-blur-md rounded-xl mb-3 sm:mb-4 mx-1 sm:mx-2 border border-surface/50 shadow-lg">
            <div className="p-3 sm:p-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-lg ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-text-secondary"
                  } ${
                    index !== navItems.length - 1
                      ? "border-b border-surface/30"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Theme Selector Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowThemeModal(false)}
          />

          <div className="relative bg-surface/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-primary/20 w-full max-w-xs sm:max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-text">
                  Choose Theme
                </h3>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="p-1.5 sm:p-2 hover:bg-primary/10 rounded-lg transition-colors duration-100 border border-transparent hover:border-primary"
                >
                  <X size={18} className="sm:w-5 sm:h-5 text-text-secondary" />
                </button>
              </div>

              {/* Theme Options */}
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {Object.entries(availableThemes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => handleThemeSelect(key)}
                    className={`group relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                      currentTheme.name === theme.name
                        ? "border-2 bg-white/10 shadow-lg"
                        : "border-surface/30 bg-surface/50 hover:border-surface/70"
                    }`}
                    style={{
                      borderColor:
                        currentTheme.name === theme.name
                          ? theme.primary
                          : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                          style={{ background: theme.gradient }}
                        />
                        <div className="text-left">
                          <p className="font-medium text-text text-xs sm:text-sm">
                            {theme.name}
                          </p>
                          <div className="flex space-x-1 mt-1">
                            <div
                              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <div
                              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                              style={{ backgroundColor: theme.secondary }}
                            />
                            <div
                              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                              style={{ backgroundColor: theme.accent }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Color Preview Bar */}
                      <div className="flex flex-col space-y-1">
                        <div
                          className="w-10 h-1.5 sm:w-16 sm:h-2 rounded-full"
                          style={{ background: theme.gradient }}
                        />
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-1.5 sm:w-5 sm:h-2 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div
                            className="w-2 h-1.5 sm:w-5 sm:h-2 rounded-full"
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <div
                            className="w-2 h-1.5 sm:w-5 sm:h-2 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {currentTheme.name === theme.name && (
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white sm:border-2">
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
        </div>
      )}
    </nav>
  );
};

export default Navigation;
