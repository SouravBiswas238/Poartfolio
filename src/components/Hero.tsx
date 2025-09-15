import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 sm:left-10 w-2 h-2 bg-secondary rounded-full animate-ping"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-1 h-1 bg-primary rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-ping animation-delay-2000"></div>
        
        {/* Color combination background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="absolute top-10 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl"
            style={{ backgroundColor: currentTheme.primary }}
          ></div>
          <div 
            className="absolute top-1/3 right-4 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 rounded-full blur-3xl"
            style={{ backgroundColor: currentTheme.secondary }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/4 sm:left-1/3 w-28 sm:w-36 h-28 sm:h-36 rounded-full blur-3xl"
            style={{ backgroundColor: currentTheme.accent }}
          ></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <p className="text-primary font-medium text-base sm:text-lg">Hello, I'm</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <div className="text-text">Sourav Kumar</div>
                  <div className="text-primary">Biswas</div>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light">
                  Software Designer & Full-Stack Developer
                </p>
              </div>

              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Crafting digital experiences through innovative design and code. 
                Specializing in React, Node.js, Python, and Chrome Extensions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  style={{ background: currentTheme.gradient }}
                >
                  <span>View My Work</span>
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Download CV</span>
                </button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-6 justify-center lg:justify-start">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#', label: 'Email' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 sm:p-3 rounded-full bg-surface/50 backdrop-blur-sm text-text-secondary hover:text-primary hover:bg-surface/70 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } order-first lg:order-last`}>
            <div className="relative">
              <div className="relative z-10">
                <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-3xl overflow-hidden border-4 border-primary/30 hover:border-primary/60 transition-all duration-300">
                  <img 
                    src="/WhatsApp Image 2025-07-02 at 4.20.47 pm.jpeg" 
                    alt="Sourav Kumar Biswas" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div 
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full opacity-80 animate-pulse"
                style={{ backgroundColor: currentTheme.secondary }}
              ></div>
              <div 
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full opacity-80 animate-pulse animation-delay-1000"
                style={{ backgroundColor: currentTheme.accent }}
              ></div>
              <div 
                className="absolute top-1/2 -left-3 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full opacity-60 animate-pulse animation-delay-2000"
                style={{ backgroundColor: currentTheme.primary }}
              ></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-text-secondary hover:text-primary transition-colors duration-300 hidden sm:block"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;