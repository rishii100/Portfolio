import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Moon, Sun, Download, ExternalLink, 
  Github, Linkedin, Twitter, Mail, Phone, MapPin,
  Brain, Code, Award, GraduationCap, Briefcase,
  Star, Calendar, ArrowUp, Sparkles
} from 'lucide-react';
import './App.css';

// Import AI components
import { PersonaRouter } from './components/PersonaRouter';
import { RAGChat } from './components/RAGChat';
import { CritiqueTool } from './components/CritiqueTool';
import { usePortfolioStore } from './store/portfolioStore';
import { personalInfo } from './data/portfolioData';

// Portfolio sections data
const portfolioSections = {
  skills: [
    { category: 'AI/ML', skills: ['Machine Learning', 'Deep Learning', 'Gen AI', 'LLM Development', 'NLP', 'Computer Vision'] },
    { category: 'Programming', skills: ['Python', 'JavaScript', 'PHP', 'React', 'Node.js', 'Docker'] },
    { category: 'Cloud & Tools', skills: ['AWS', 'Google Cloud', 'Git', 'MongoDB', 'PostgreSQL', 'PyTorch'] },
    { category: 'Other', skills: ['Blockchain', 'Web3', 'UX/UI Design', 'Data Analysis', 'Leadership'] }
  ],
  experience: [
    {
      title: 'AI Intern',
      company: 'MyLead Fintech Private Limited',
      location: 'Mumbai, India',
      duration: 'May 2024 - Jul 2024',
      description: 'Developed chat-based customer support system for PinoBuddy app using ML models, web scraping, and GPT-3.5 fine-tuning deployed on AWS.',
      achievements: ['Built end-to-end AI pipeline', 'Integrated 3rd-party APIs', 'Deployed on AWS infrastructure']
    },
    {
      title: 'Machine Learning Intern',
      company: 'Bharat Intern',
      location: 'Remote',
      duration: 'Feb 2024 - Mar 2024',
      description: 'Performed EDA and feature engineering to improve model performance, achieving 88% accuracy using R-squared metrics.',
      achievements: ['88% model accuracy', 'Advanced feature engineering', 'Performance optimization']
    },
    {
      title: 'Analytics Intern',
      company: 'Grameen Shakti Microfinance Pvt. Ltd.',
      location: 'Kolkata, India',
      duration: 'Jun 2023 - Jul 2023',
      description: 'Created predictive analytics tool for loan repayment behavior analysis, improving recovery rate by 40%.',
      achievements: ['40% improvement in loan recovery', 'Predictive analytics implementation', 'Financial impact analysis']
    }
  ],
  projects: [
    {
      title: 'MediAlert',
      period: 'Jan 2025 - Mar 2025',
      description: 'AI-powered adverse event detection system using Deepgram ASR and AWS Comprehend Medical.',
      tech: ['Deepgram', 'AWS Comprehend', 'NLP', 'Medical AI'],
      achievements: ['90%+ accuracy in risk prediction', 'Real-time speech processing', 'FDA FAERS integration']
    },
    {
      title: 'Hope - Disaster Response Chatbot',
      period: 'Sep 2024 - Dec 2024',
      description: 'AI chatbot with RAG and Gemini Pro for disaster response, boosting accuracy by 85%.',
      tech: ['Gemini Pro', 'RAG', 'Vector Database', 'Disaster Management'],
      achievements: ['85% accuracy improvement', '40% faster query responses', 'Vector database integration']
    },
    {
      title: 'SyncSkills',
      period: 'Jan 2024 - Apr 2024',
      description: 'Resume evaluation platform using Gemini AI for recruitment process optimization.',
      tech: ['Gemini AI', 'Web Development', 'Recruitment Tech'],
      achievements: ['30% recruitment process improvement', 'Automated feedback system', 'Job matching algorithm']
    },
    {
      title: 'Abstractify',
      period: 'Oct 2023 - Dec 2023',
      description: 'News summarization system using T5 Transformer with 97% accuracy.',
      tech: ['T5 Transformer', 'PyTorch Lightning', 'NLP'],
      achievements: ['97% summarization accuracy', 'Real-time processing', 'Research publication']
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering (AI/ML)',
      institution: 'Manipal University Jaipur',
      location: 'Jaipur, India',
      duration: 'Aug 2021 - Present',
      status: 'Final Year'
    },
    {
      degree: 'Class XII (Science)',
      institution: 'Kendriya Vidyalaya IIM Joka',
      location: 'Kolkata, India',
      duration: 'May 2018 - Apr 2021',
      status: 'Completed'
    }
  ],
  awards: [
    {
      title: "Dean's Academic Excellence Award",
      organization: 'Manipal University Jaipur',
      date: 'Nov 2024',
      description: 'Highest Grade Point Average in 6th Semester CSE(AIML) Department'
    },
    {
      title: '2x Student Excellence Award',
      organization: 'Manipal University Jaipur',
      date: '2024',
      description: 'Among 1000+ students for dedication to learning and development'
    },
    {
      title: 'HACKS 8.0 - Winner (1st Position)',
      organization: 'MUJ ACM Student Chapter',
      date: 'Oct 2023',
      description: '1st position among 500+ participants'
    },
    {
      title: 'INFORMATICA - 3rd Position',
      organization: 'Manipal University Jaipur',
      date: 'Jan 2024',
      description: 'Research paper presentation among 500+ papers in ICCAIML\'24'
    },
    {
      title: 'DeFi Hacks - 3rd Position',
      organization: 'MUJ ACM Student Chapter',
      date: 'Oct 2023',
      description: 'Blockchain and DeFi development competition'
    }
  ]
};

// Navigation component
const Navigation = () => {
  const { isDarkMode, toggleDarkMode, isMobileMenuOpen, toggleMobileMenu, scrollToSection } = usePortfolioStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'awards', label: 'Awards' },
    { id: 'critique-tool', label: 'AI Tools' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Aneerban</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { personaClassification } = usePortfolioStore();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >


            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Aneerban Saha
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
            >
              {personaClassification ? (
                personaClassification.persona === 'recruiter' ? 
                  'AI/ML Engineer & Full Stack Developer ready to drive innovation at your company' :
                personaClassification.persona === 'developer' ?
                  'Passionate about building AI-powered solutions and contributing to open source' :
                personaClassification.persona === 'researcher' ?
                  'Research-focused AI engineer with publications in text summarization and NLP' :
                  'AI/ML Engineer & Full Stack Developer passionate about creating intelligent solutions'
              ) : (
                'AI/ML Engineer & Full Stack Developer passionate about creating intelligent solutions'
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => usePortfolioStore.getState().scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-medium"
              >
                View My Work
              </button>
              <button
                onClick={() => usePortfolioStore.getState().scrollToSection('contact')}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all transform hover:scale-105 font-medium"
              >
                Get In Touch
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-6 mt-8"
            >
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1557562645-4eee56b29bc1"
                alt="Professional coding and AI development"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-90 font-medium">AI/ML Engineer</p>
                <p className="text-lg font-semibold">Aneerban Saha</p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-80"></div>
              <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm a passionate AI/ML engineer and full-stack developer currently pursuing my B.Tech in Computer Science 
            with AI/ML specialization at Manipal University Jaipur. With hands-on experience in building intelligent 
            systems and a track record of winning hackathons, I love creating solutions that make a real impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                What Drives Me
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I'm fascinated by the intersection of artificial intelligence and real-world problem solving. 
                From improving loan recovery rates by 40% at Grameen Shakti to building disaster response 
                chatbots with 85% accuracy improvement, I believe in creating AI solutions that truly matter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hackathon Wins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">90%+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">ML Model Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">8.06</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg"
                alt="Professional Development"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Technical Skills
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My expertise spans across AI/ML, full-stack development, and emerging technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioSections.skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Professional Experience
            </h2>
          </div>
        </motion.div>

        <div className="space-y-8">
          {portfolioSections.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{exp.location}</p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {exp.duration}
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.achievements.map((achievement, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-powered solutions that solve real-world problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioSections.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.period}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Achievements:
                </p>
                <ul className="space-y-1">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Awards Section
const AwardsSection = () => {
  return (
    <section id="awards" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Awards & Recognition
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioSections.awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
                  {award.date}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {award.title}
              </h3>
              
              <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                {award.organization}
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Education Section
const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Education
            </h2>
          </div>
        </motion.div>

        <div className="space-y-8">
          {portfolioSections.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <div className="text-gray-500 dark:text-gray-400">{edu.duration}</div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {edu.cgpa && `CGPA: ${edu.cgpa}`}
                    {edu.percentage && edu.percentage}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{edu.status}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Ready to collaborate on exciting AI projects or discuss opportunities? 
            I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
          >
            <Mail className="w-8 h-8 mx-auto mb-4 text-blue-300" />
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-blue-100">{personalInfo.email}</p>
          </motion.a>

          <motion.a
            href={`tel:${personalInfo.phone}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
          >
            <Phone className="w-8 h-8 mx-auto mb-4 text-blue-300" />
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-blue-100">{personalInfo.phone}</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl"
          >
            <MapPin className="w-8 h-8 mx-auto mb-4 text-blue-300" />
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-blue-100">{personalInfo.location}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex justify-center gap-6">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
              <Twitter className="w-6 h-6" />
            </a>
            <a href={personalInfo.kaggle} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Scroll to Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Main App Component
function App() {
  const { isDarkMode } = usePortfolioStore();

  useEffect(() => {
    // Initialize dark mode on app load
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
      usePortfolioStore.setState({ isDarkMode: true });
    } else {
      document.documentElement.classList.remove('dark');
      usePortfolioStore.setState({ isDarkMode: false });
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document when state changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <EducationSection />
        <CritiqueTool />
        <ContactSection />
      </main>

      {/* AI Components */}
      <PersonaRouter />
      <RAGChat />
      <ScrollToTop />

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Aneerban Saha. Built with React, Tailwind CSS, Framer Motion, and powered by Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
