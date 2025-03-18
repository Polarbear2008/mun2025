import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Clock, MapPin, Users } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { CustomButton } from './ui/custom-button';

const conferenceDate = new Date('2025-04-02T09:00:00');
const conferenceLocation = 'Fergana Presidential School, Uzbekistan';

const phrases = [
  "Shaping Tomorrow's Leaders",
  "Build Connections",
  "Shape the Future",
  "Join Season 4"
];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const typingSpeed = 100; // ms per character
  const deletingSpeed = 50; // ms per character when deleting
  const pauseDuration = 1500; // pause between phrases
  const pauseBeforeNew = 800; // pause before starting a new phrase

  useEffect(() => {
    setIsVisible(true);
    
    const handleTyping = () => {
      const currentFullPhrase = phrases[phraseIndex];
      
      if (!isDeleting && currentPhrase !== currentFullPhrase) {
        setCurrentPhrase(currentFullPhrase.substring(0, currentPhrase.length + 1));
        return typingSpeed;
      } 
      else if (!isDeleting && currentPhrase === currentFullPhrase) {
        setIsDeleting(true);
        return pauseDuration;
      } 
      else if (isDeleting && currentPhrase !== '') {
        setCurrentPhrase(currentPhrase.substring(0, currentPhrase.length - 1));
        return deletingSpeed;
      } 
      else if (isDeleting && currentPhrase === '') {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        return pauseBeforeNew;
      }
      
      return typingSpeed;
    };
    
    const timeout = setTimeout(() => {
      const nextDelay = handleTyping();
      if (nextDelay) clearTimeout(timeout);
      return setTimeout(() => handleTyping(), nextDelay);
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentPhrase, isDeleting, phraseIndex]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-diplomatic-900 via-diplomatic-800 to-diplomatic-700">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-world-map bg-no-repeat bg-center opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        />
        
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-gold-300"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              y: [null, Math.random() * -100, Math.random() * 100, null],
              x: [null, Math.random() * 100, Math.random() * -100, null],
              opacity: [null, Math.random() * 0.8, 0.1, null]
            }}
            transition={{ 
              duration: Math.random() * 20 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
        
        <motion.div 
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-diplomatic-600 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gold-600 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Model United Nations
            </motion.span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="text-gradient-gold">FPSMUN</span> Season 4
              </motion.span>
              <motion.span 
                className="block text-gold-300 mt-2 min-h-[40px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {currentPhrase}
                <span className="animate-pulse ml-1">|</span>
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-lg text-white/80 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Join delegates from across Uzbekistan to debate pressing global issues, develop 
              leadership skills, and forge valuable connections at our prestigious Model UN conference.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CustomButton to="/registration" variant="accent" size="lg" className="group">
                   Register Now
                  <ChevronRight className="transition-transform group-hover:translate-x-1" size={16} />
                </CustomButton>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                <CustomButton 
                  to="/committees" 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 whitespace-nowrap"
                >
                  Explore Committees
                </CustomButton>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="absolute top-5 left-0 w-32 h-32 border-t-2 border-l-2 border-gold-300/30 -translate-x-8 -translate-y-8 rounded-tl-3xl"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            <motion.div 
              className="absolute bottom-5 right-0 w-32 h-32 border-b-2 border-r-2 border-gold-300/30 translate-x-8 translate-y-8 rounded-br-3xl"
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            />
            
            <motion.div
              className="absolute -top-5 -left-5 w-20 h-1 bg-gradient-to-r from-gold-500/0 via-gold-400 to-gold-500/0"
              animate={{ 
                x: [0, 15, 0],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="absolute -bottom-5 -right-5 w-20 h-1 bg-gradient-to-r from-gold-500/0 via-gold-400 to-gold-500/0"
              animate={{ 
                x: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
            <motion.div
              className="absolute -right-5 top-1/4 h-20 w-1 bg-gradient-to-b from-diplomatic-500/0 via-diplomatic-400 to-diplomatic-500/0"
              animate={{ 
                y: [0, 15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            />
            <motion.div
              className="absolute -left-5 bottom-1/4 h-20 w-1 bg-gradient-to-b from-diplomatic-500/0 via-diplomatic-400 to-diplomatic-500/0"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 2.5 }}
            />
            
            <motion.div 
              className="absolute -top-10 -left-10 w-40 h-1 bg-gradient-to-r from-diplomatic-500/0 via-diplomatic-400 to-diplomatic-500/0"
              animate={{ 
                x: [0, 30, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-1 bg-gradient-to-r from-gold-500/0 via-gold-400 to-gold-500/0"
              animate={{ 
                x: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-elegant relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-diplomatic-500/5 opacity-30"></div>
              
              <motion.div 
                className="text-center mb-6 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h2 className="text-2xl font-display font-bold text-white mb-2">Conference Countdown</h2>
                <p className="text-white/70">Mark your calendars for the big event</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="relative z-10"
              >
                <CountdownTimer targetDate={conferenceDate} />
              </motion.div>
              
              <motion.div 
                className="mt-6 space-y-3 text-white/80 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <Calendar className="text-gold-300" size={18} />
                  <span>April 2, 2025</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <Clock className="text-gold-300" size={18} />
                  <span>9:00 AM - 4:00 PM</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                >
                  <MapPin className="text-gold-300" size={18} />
                  <span>{conferenceLocation}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.9 }}
                >
                  <Users className="text-gold-300" size={18} />
                  <span>80 delegates across Uzbekistan</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-6 pt-6 border-t border-white/10 text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                <Link 
                  to="/schedule" 
                  className="text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>View Full Schedule</span>
                  <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
