import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/roshithrobert', color: '#6e5494' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/roshithrobert', color: '#0A66C2' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/roshithrobert', color: '#1DA1F2' },
    { name: 'Email', icon: 'email', url: 'mailto:roshithrobert7@gmail.com', color: '#FF4D4D' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Large text with animation */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] pointer-events-none select-none whitespace-nowrap"
          animate={{ opacity: [0.01, 0.025, 0.01] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            WebkitTextStroke: '1px rgba(255,255,255,0.02)',
            color: 'transparent',
          }}
        >
          LET'S TALK
        </motion.div>

        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute bottom-0 right-0 w-[60vw] h-[60vh] rounded-full blur-[150px]"
          animate={{
            background: [
              'radial-gradient(circle, rgba(255,77,77,0.15) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,140,0,0.15) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,77,77,0.15) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute top-20 left-20 w-[40vw] h-[40vh] rounded-full blur-[120px]"
          animate={{
            background: [
              'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Text */}
          <div className="flex flex-col justify-center">
            {/* Section label */}
            <motion.div className="flex items-center gap-4 mb-8 reveal">
              <div className="w-12 h-px bg-[#FF4D4D]" />
              <span 
                className="text-[#FF4D4D] text-xs uppercase"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.25em' }}
              >
                ( 04 ) — Get In Touch
              </span>
            </motion.div>

            {/* Main heading */}
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[0.95] reveal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              Let's build
              <br />
              something{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] to-[#FF8C00]"
                style={{ fontStyle: 'italic' }}
              >
                unforgettable
              </span>
            </h2>

            {/* Description */}
            <p 
              className="text-white/60 text-base leading-[1.9] mb-12 max-w-lg reveal"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
            >
              Have a project in mind? Let's collaborate and create something extraordinary together. 
              I'm always excited to work on innovative ideas.
            </p>

            {/* Contact info */}
            <div className="space-y-6 reveal">
              <a
                href="mailto:roshithrobert7@gmail.com"
                className="group flex items-center gap-4 text-xl md:text-2xl text-white hover:text-[#FF4D4D] transition-colors"
                data-magnetic
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF4D4D] group-hover:bg-[#FF4D4D]/10 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                roshithrobert7@gmail.com
              </a>

              <a
                href="tel:+919188539872"
                className="group flex items-center gap-4 text-xl md:text-2xl text-white hover:text-[#FF4D4D] transition-colors"
                data-magnetic
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF4D4D] group-hover:bg-[#FF4D4D]/10 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                +91 9188539872
              </a>
            </div>

            {/* Social links with enhanced hover */}
            <div className="flex items-center gap-3 mt-12 reveal">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 rounded-full glass flex items-center justify-center text-white/60 overflow-hidden"
                  data-magnetic
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${link.color}40, ${link.color}20)` }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors">
                    {link.icon === 'github' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {link.icon === 'linkedin' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {link.icon === 'twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {link.icon === 'email' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </span>
                  {/* Tooltip */}
                  <span 
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right side - Form with glass styling */}
          <div className="flex flex-col justify-center">
            <motion.div 
              className="relative glass rounded-3xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Form header */}
              <div className="mb-8">
                <h3 
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Send a message
                </h3>
                <p 
                  className="text-white/40 text-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  I'll get back to you within 24 hours
                </p>
              </div>

              {/* Success overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 glass rounded-3xl flex flex-col items-center justify-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                    >
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h4 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      Message Sent!
                    </h4>
                    <p className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                      Thanks for reaching out
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name input */}
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: focusedField === 'name' 
                        ? 'linear-gradient(135deg, #FF4D4D50, #FF8C0050)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                    }}
                    animate={{ opacity: focusedField === 'name' ? 1 : 0 }}
                  />
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full glass-dark rounded-xl px-5 py-4 text-white focus:outline-none transition-all placeholder:text-white/30"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.95rem' }}
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                {/* Email input */}
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: focusedField === 'email' 
                        ? 'linear-gradient(135deg, #FF4D4D50, #FF8C0050)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                    }}
                    animate={{ opacity: focusedField === 'email' ? 1 : 0 }}
                  />
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full glass-dark rounded-xl px-5 py-4 text-white focus:outline-none transition-all placeholder:text-white/30"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.95rem' }}
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                {/* Message input */}
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: focusedField === 'message' 
                        ? 'linear-gradient(135deg, #FF4D4D50, #FF8C0050)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                    }}
                    animate={{ opacity: focusedField === 'message' ? 1 : 0 }}
                  />
                  <div className="relative">
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      className="w-full glass-dark rounded-xl px-5 py-4 text-white focus:outline-none transition-all resize-none placeholder:text-white/30"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.95rem' }}
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-5 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #FF4D4D, #FF8C00)' }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  data-magnetic
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    whileHover={{ translateX: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span 
                    className={`relative z-10 flex items-center justify-center gap-3 transition-opacity text-sm uppercase ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.15em', color: 'white' }}
                  >
                    Send Message
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </span>
                  
                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <motion.svg 
                        className="w-5 h-5 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </motion.svg>
                    </span>
                  )}
                </motion.button>
              </form>

              {/* Form footer */}
              <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure & encrypted</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
