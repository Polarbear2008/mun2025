import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { SeasonData } from '@/data/seasonsData';
import { Users, Mail, Linkedin, Twitter } from 'lucide-react';

interface SeasonTeamProps {
  season: SeasonData;
}

const SeasonTeam: React.FC<SeasonTeamProps> = ({ season }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`team-${season.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pb-12"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-white shadow-sm">
            <div className={`${season.lightBg} p-3 rounded-full ${season.textColor}`}>
              <Users size={24} />
            </div>
          </div>
          <h2 className={`text-3xl font-bold ${season.textColor}`}>Conference Organizers</h2>
          <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
            Meet the dedicated team behind Season {season.year} who made the conference possible.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {season.organizers.map((person, index) => (
            <motion.div
              key={index}
              className={`text-center p-8 rounded-xl ${season.lightBg} shadow-md border border-white/30 relative overflow-hidden group`}
              variants={item}
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-md relative z-10">
                <motion.img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              <h3 className={`text-xl font-bold ${season.textColor} mb-1`}>{person.name}</h3>
              <p className={`${season.secondaryTextColor} mb-4`}>{person.role}</p>
              
              <Separator className="my-5 opacity-30" />
              
              <p className="text-neutral-600 text-sm relative z-10 mb-6">
                Played a key role in organizing the {season.year} conference, bringing expertise in international relations and diplomatic protocol.
              </p>

              <div className="flex justify-center space-x-3 mt-4">
                <motion.a 
                  href="#" 
                  className={`${season.mediumBg} ${season.textColor} p-2 rounded-full hover:scale-110 transition-transform`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <Mail size={18} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className={`${season.mediumBg} ${season.textColor} p-2 rounded-full hover:scale-110 transition-transform`}
                  whileHover={{ scale: 1.15, rotate: -5 }}
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className={`${season.mediumBg} ${season.textColor} p-2 rounded-full hover:scale-110 transition-transform`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <Twitter size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeasonTeam;
