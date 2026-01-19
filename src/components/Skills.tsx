import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

const Skills: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    {
      name: "React",
      level: 95,
      color: "from-blue-400 to-cyan-400",
      category: "Frontend",
    },
    {
      name: "TypeScript",
      level: 90,
      color: "from-blue-500 to-blue-600",
      category: "Frontend",
    },
    {
      name: "Node.js",
      level: 88,
      color: "from-green-400 to-green-500",
      category: "Backend",
    },
    {
      name: "Python",
      level: 85,
      color: "from-yellow-400 to-orange-400",
      category: "Backend",
    },
    {
      name: "Chrome Extensions",
      level: 92,
      color: "from-purple-400 to-pink-400",
      category: "Specialty",
    },
    {
      name: "UI/UX Design",
      level: 87,
      color: "from-pink-400 to-red-400",
      category: "Design",
    },
    {
      name: "MongoDB",
      level: 82,
      color: "from-green-500 to-green-600",
      category: "Database",
    },
    {
      name: "Tailwind CSS",
      level: 93,
      color: "from-cyan-400 to-teal-400",
      category: "Frontend",
    },
    {
      name: "React Native",
      level: 80,
      color: "from-green-600 to-green-700",
      category: "Mobile App",
    },
    {
      name: "GraphQL",
      level: 78,
      color: "from-pink-500 to-purple-500",
      category: "API",
    },
    {
      name: "Docker",
      level: 75,
      color: "from-blue-600 to-blue-700",
      category: "DevOps",
    },
    {
      name: "Figma",
      level: 89,
      color: "from-purple-400 to-purple-500",
      category: "Design",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProgress(true), 500);
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

  const SkillCircle: React.FC<{ skill: Skill; index: number }> = ({
    skill,
    index,
  }) => {
    const [count, setCount] = useState(0);
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset =
      circumference - (skill.level / 100) * circumference;

    useEffect(() => {
      if (animateProgress) {
        const timer = setTimeout(() => {
          const interval = setInterval(() => {
            setCount((prev) => {
              if (prev >= skill.level) {
                clearInterval(interval);
                return skill.level;
              }
              return prev + 1;
            });
          }, 20);
        }, index * 100);

        return () => clearTimeout(timer);
      }
    }, [animateProgress, skill.level, index]);

    return (
      <div
        className={`transform transition-all duration-700 delay-${index * 100} ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="group relative p-4 sm:p-6 bg-surface/30 backdrop-blur-sm rounded-2xl border border-surface/50 hover:border-primary/50 hover:bg-surface/50 transition-all duration-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-surface"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={currentTheme.primary}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={
                    animateProgress ? strokeDashoffset : circumference
                  }
                  strokeLinecap="round"
                  className="transition-all duration-2000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-2xl font-bold text-text">
                  {count}%
                </span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-text font-semibold text-base sm:text-lg">
                {skill.name}
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                {skill.category}
              </p>
            </div>
          </div>

          {/* Hover effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `${currentTheme.gradient}10` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
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
              <span className="text-primary">Skills & Expertise</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              A comprehensive overview of my technical skills and proficiency
              levels across different technologies and domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <SkillCircle key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
