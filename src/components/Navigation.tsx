import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { trackEvent } from "../lib/analytics";

const Navigation: React.FC = () => {
  const { currentTheme, mode, toggleMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (sectionId === "projects") {
      trackEvent("click_nav_projects");
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
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

            {/* Desktop Light/Dark Toggle */}
            <button
              onClick={toggleMode}
              className="p-2 xl:p-3 rounded-full bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center border border-primary border-opacity-25 hover:border-opacity-100"
              aria-label="Toggle light/dark mode"
            >
              {mode === "dark" ? (
                <Sun size={18} className="xl:w-5 xl:h-5 text-primary" />
              ) : (
                <Moon size={18} className="xl:w-5 xl:h-5 text-primary" />
              )}
            </button>
          </div>

          {/* Mobile/Tablet Controls */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            {/* Light/Dark Toggle */}
            <button
              onClick={toggleMode}
              className="p-2 rounded-full bg-surface/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle light/dark mode"
            >
              {mode === "dark" ? (
                <Sun size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
              ) : (
                <Moon size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
              )}
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
    </nav>
  );
};

export default Navigation;
