import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import resumeData from './data/resume.json';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Terminal,
  Database,
  Cloud,
  Code,
  Award,
  GraduationCap
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDynamicSummary = () => {
    const startDate = new Date('2021-06-01');
    const currentDate = new Date();
    const diffTime = currentDate - startDate;
    const yearsValue = Math.max(0, diffTime / (1000 * 60 * 60 * 24 * 365.25));
    const diffYears = parseFloat(yearsValue.toFixed(1)).toString();
    return resumeData.profile.summary.replace('{years}', diffYears);
  };

  const renderText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <div className="bg-gradient-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-content">
          <a href="#" className="nav-logo">NV<span className="gradient-text">.</span></a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#honors">Honors & Leadership</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="hero container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="badge mb-6" style={{ marginBottom: "2rem" }}>
              {resumeData.profile.title}
            </motion.div>
            <motion.h1 variants={fadeIn}>
              Hi, I'm <span className="gradient-text">{resumeData.profile.name}</span>
            </motion.h1>
            <motion.p variants={fadeIn}>
              {getDynamicSummary()}
            </motion.p>
            <motion.div variants={fadeIn} style={{ display: 'flex', gap: '1rem' }}>
              <a href="#contact" className="btn btn-primary">
                Get In Touch <Mail size={18} />
              </a>
              <a href={resumeData.profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <Linkedin size={18} /> LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>

          <div className="timeline">
            {resumeData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ marginBottom: '0.2rem' }}>{exp.role}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                        {exp.company} {exp.client ? `| Client: ${exp.client}` : ''}
                      </p>
                    </div>
                    <span className="badge">{exp.date}</span>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    {Array.isArray(exp.desc) ? (
                      <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                        {exp.desc.map((point, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}>{renderText(point)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{renderText(exp.desc)}</p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical <span className="gradient-text">Arsenal</span>
          </motion.h2>

          <div className="grid grid-cols-2">
            {resumeData.skills.map((category, idx) => {
              const IconMap = {
                Code: <Code size={24} className="mb-4" style={{ color: 'var(--accent-1)' }} />,
                Cloud: <Cloud size={24} className="mb-4" style={{ color: 'var(--accent-2)' }} />,
                Database: <Database size={24} className="mb-4" style={{ color: 'var(--accent-3)' }} />,
                Terminal: <Terminal size={24} className="mb-4" style={{ color: '#f59e0b' }} />
              };
              return (
                <motion.div
                  key={idx}
                  className="glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {IconMap[category.iconName] || <Code size={24} className="mb-4" style={{ color: 'var(--accent-1)' }} />}
                  <h3 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>{category.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {category.skills.map(skill => (
                      <span key={skill} className="badge">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Honors & Leadership Section */}
        <section id="honors" className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Honors & <span className="gradient-text">Leadership</span>
          </motion.h2>

          <div className="grid grid-cols-2">
            {resumeData.honors_leadership.map((honor, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <div style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-2)',
                  flexShrink: 0
                }}>
                  <Award size={24} />
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {renderText(honor)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">Education</span>
          </motion.h2>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {resumeData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
              >
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '16px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-1)'
                }}>
                  <GraduationCap size={40} />
                </div>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>{edu.degree}</h3>
                    <span className="badge">{edu.date}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: '500', margin: 0 }}>{edu.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
          <motion.div
            className="glass-card"
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2rem' }}>Let's Build Something <span className="gradient-text">Great</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Mail size={18} style={{ color: 'var(--accent-1)' }} /> {resumeData.profile.email}
              </div>
            </div>
            <a href={`mailto:${resumeData.profile.email}`} className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Say Hello
            </a>
            <a href={resumeData.profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Linkedin size={18} /> Connect
            </a>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default App;
