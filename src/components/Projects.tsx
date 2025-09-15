import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Code, Zap, Globe, Database, Smartphone, Server, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  image: string;
  features: string[];
}

const Projects: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive admin dashboard built with React and Node.js for managing products, orders, and analytics with real-time data visualization and advanced filtering capabilities.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express', 'JWT'],
      category: 'Full-Stack',
      icon: Globe,
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Real-time Analytics', 'Order Management', 'Product Catalog', 'User Authentication'],
    },
    {
      id: 2,
      title: 'Task Management Chrome Extension',
      description: 'A productivity-focused Chrome extension that helps users organize tasks, set reminders, and track progress across different websites with seamless integration.',
      tech: ['JavaScript', 'Chrome API', 'LocalStorage', 'CSS3', 'Manifest V3'],
      category: 'Extension',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Cross-site Integration', 'Smart Reminders', 'Progress Tracking', 'Data Sync'],
    },
    {
      id: 3,
      title: 'Python Data Analytics Tool',
      description: 'An automated data processing tool that extracts insights from large datasets using Python libraries and generates interactive reports with machine learning predictions.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Flask', 'Scikit-learn', 'NumPy'],
      category: 'Data Science',
      icon: Database,
      gradient: 'from-green-500 to-teal-500',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Data Visualization', 'ML Predictions', 'Automated Reports', 'API Integration'],
    },
    {
      id: 4,
      title: 'Real-time Chat Application',
      description: 'A modern chat application with real-time messaging, file sharing, user authentication, and group chat functionality built with React and Socket.io.',
      tech: ['React', 'Socket.io', 'Express', 'JWT', 'MongoDB', 'Cloudinary'],
      category: 'Real-time',
      icon: Smartphone,
      gradient: 'from-orange-500 to-red-500',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Real-time Messaging', 'File Sharing', 'Group Chats', 'User Presence'],
    },
    {
      id: 5,
      title: 'Portfolio Website Builder',
      description: 'A drag-and-drop website builder that allows users to create beautiful portfolio websites with customizable templates, components, and responsive design.',
      tech: ['React', 'TypeScript', 'Tailwind', 'DnD Kit', 'Framer Motion', 'Supabase'],
      category: 'SaaS',
      icon: Code,
      gradient: 'from-violet-500 to-purple-500',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Drag & Drop', 'Custom Templates', 'Responsive Design', 'Export Code'],
    },
    {
      id: 6,
      title: 'API Monitoring Dashboard',
      description: 'A comprehensive monitoring solution for tracking API performance, uptime, response times with alert notifications and detailed analytics reports.',
      tech: ['React', 'Node.js', 'Redis', 'WebSocket', 'PostgreSQL', 'Docker'],
      category: 'DevOps',
      icon: Server,
      gradient: 'from-cyan-500 to-blue-500',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Real-time Monitoring', 'Alert System', 'Performance Analytics', 'API Testing'],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  // Close modal when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <div
      className={`transform transition-all duration-700 delay-${index * 100} ${
        isVisible ? 'translate-y-0 opacity-[500]' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="group relative bg-surface/40 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-surface/50 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
        {/* Project Image */}
        <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 sm:px-3 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
              {project.category}
            </span>
          </div>
          
          {/* Project Icon */}
          <div className="absolute top-3 right-3">
            <div 
              className="p-1.5 sm:p-2 rounded-lg backdrop-blur-sm"
              style={{ background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)` }}
            >
              <project.icon size={16} className="sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          
          <p className="text-text-secondary text-xs sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {project.tech.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-surface/50 text-text-secondary rounded text-xs border border-surface/50">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => setSelectedProject(project)}
              className="flex-1 px-3 py-2 sm:px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border border-primary/20 hover:border-primary/40"
            >
              View Details
            </button>
            <div className="flex gap-2">
              <button className="flex-1 sm:flex-none p-2 bg-surface/50 hover:bg-surface/70 rounded-lg transition-all duration-300 border border-surface/50 hover:border-primary/30">
                <Github size={14} className="sm:w-4 sm:h-4 text-text-secondary hover:text-primary transition-colors duration-300 mx-auto" />
              </button>
              <button className="flex-1 sm:flex-none p-2 bg-surface/50 hover:bg-surface/70 rounded-lg transition-all duration-300 border border-surface/50 hover:border-primary/30">
                <ExternalLink size={14} className="sm:w-4 sm:h-4 text-text-secondary hover:text-primary transition-colors duration-300 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="projects" className="py-8 sm:py-12 lg:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-primary">
                Featured Projects
              </span>
            </h2>
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
            <p className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4">
              A showcase of my recent work, demonstrating expertise across different technologies and domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          
          <div className="relative bg-surface/95 backdrop-blur-md rounded-xl border border-primary/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
                  <div 
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ background: currentTheme.gradient }}
                  >
                    <selectedProject.icon size={20} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-text line-clamp-1">{selectedProject.title}</h3>
                    <span className="text-primary text-sm">{selectedProject.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200 flex-shrink-0"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Project Image */}
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {selectedProject.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-text font-semibold mb-2 text-base">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 py-1">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-text font-semibold mb-2 text-base">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded text-sm border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex-1"
                  style={{ background: currentTheme.gradient }}
                >
                  <Github size={16} className="text-white" />
                  <span className="text-white">View Code</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-surface/50 hover:bg-surface/70 text-text rounded-lg font-medium transition-all duration-300 flex-1 border border-surface/50 hover:border-primary/30">
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;