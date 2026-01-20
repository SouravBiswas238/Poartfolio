import React, { useEffect, useRef, useState } from "react";
import { Code, Palette, Zap, MonitorSmartphone } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const About: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-primary">About Me</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Profile Image */}
            <div
              className={`transform transition-all duration-1000 delay-300 order-2 lg:order-1 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="w-80 h-80 sm:w-96 sm:h-96 mx-auto rounded-2xl overflow-hidden border-4 border-primary/30 hover:border-primary/60 transition-all duration-300">
                  <img
                    src="/sourav2.JPG"
                    alt="Sourav Kumar Biswas"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-secondary rounded-full animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-primary rounded-full animate-pulse animation-delay-1000"></div>
              </div>
            </div>

            {/* About Content */}
            <div
              className={`transform transition-all duration-1000 delay-500 order-1 lg:order-2 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-6">
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                  I'm a passionate software designer with a keen eye for
                  creating intuitive and visually appealing digital experiences.
                  My journey in tech spans across frontend development, backend
                  architecture, and innovative Chrome extension creation.
                </p>

                <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                  With expertise in React, Node.js, and Python, I bridge the gap
                  between design and functionality, ensuring every project
                  delivers both aesthetic excellence and robust performance.
                </p>

                {/* Key Points */}
                <div className="grid gap-4 mt-6 sm:mt-8">
                  {[
                    {
                      icon: Code,
                      title: "Full-Stack Development",
                      desc: "React, Node.js, Python",
                    },
                    {
                      icon: Palette,
                      title: "UI/UX Design",
                      desc: "Modern, user-centric interfaces",
                    },
                    {
                      icon: Zap,
                      title: "Chrome Extensions",
                      desc: "Innovative browser solutions",
                    },
                    {
                      icon: MonitorSmartphone,
                      title: "Mobile App Development",
                      desc: "Cross-platform applications",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-surface/30 backdrop-blur-sm border border-surface/50 hover:border-primary/50 transition-all duration-300"
                    >
                      <div
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ background: currentTheme.gradient }}
                      >
                        <item.icon
                          size={18}
                          className="sm:w-5 sm:h-5 text-white"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-1 text-sm sm:text-base">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary text-xs sm:text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
