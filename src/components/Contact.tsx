import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Contact: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'sourav@example.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Location', value: 'Kolkata, India' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-primary">
                Get In Touch
              </span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? Let's collaborate and create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6">Let's Connect</h3>
                  <p className="text-text-secondary mb-6 sm:mb-8 text-sm sm:text-base">
                    I'm always interested in new opportunities and exciting projects. 
                    Feel free to reach out if you'd like to discuss potential collaborations.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-surface/30 backdrop-blur-sm border border-surface/50 hover:border-primary/50 transition-all duration-300"
                    >
                      <div 
                        className="p-2 sm:p-3 rounded-lg"
                        style={{ background: currentTheme.gradient }}
                      >
                        <info.icon size={18} className="sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-text-secondary text-xs sm:text-sm">{info.label}</p>
                        <p className="text-text font-medium text-sm sm:text-base">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h4 className="text-text font-semibold mb-4 text-sm sm:text-base">Follow Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="group p-2 sm:p-3 bg-surface/30 backdrop-blur-sm rounded-xl border border-surface/50 hover:border-primary/50 transition-all duration-300 transform hover:scale-110"
                        aria-label={social.label}
                      >
                        <social.icon size={18} className="sm:w-5 sm:h-5 text-text-secondary group-hover:text-primary transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-xl text-text placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-xl text-text placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-xl text-text placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-sm sm:text-base"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full px-6 sm:px-8 py-3 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    style={{ background: currentTheme.gradient }}
                  >
                    <span>Send Message</span>
                    <Send size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>

                {/* Thank You Message */}
                {showThankYou && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-xl">
                    <div className="text-center p-8">
                      <div 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: currentTheme.gradient }}
                      >
                        <Send size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-text mb-2">Thank You!</h3>
                      <p className="text-text-secondary text-sm sm:text-base">Your message has been sent successfully. I'll get back to you soon!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;