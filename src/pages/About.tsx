
import React from 'react';
import { Globe, Users, Award, PenTool, Calendar, Trophy, Flag, Sparkles, Mail, Linkedin, Twitter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CustomButton } from '@/components/ui/custom-button';
import AboutMission from '@/components/about/AboutMission';
import AboutTimeline from '@/components/about/AboutTimeline';
import AboutTeam from '@/components/about/AboutTeam';
import AboutSeasons from '@/components/about/AboutSeasons';
import AboutGallery from '@/components/about/AboutGallery';
import AboutTestimonials from '@/components/about/AboutTestimonials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" 
        />
        <div className="container relative mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4">About FPSMUN</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-diplomatic-600 to-diplomatic-900">
              Shaping Tomorrow's Global Leaders
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8">
              Join us in fostering international cooperation, developing leadership skills, and creating lasting connections in the world of Model United Nations.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CustomButton variant="primary" size="lg" to="/registration">
                Join Our Community
              </CustomButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Mission Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AboutMission />
      </motion.div>

      {/* Seasons Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AboutSeasons />
      </motion.div>

      {/* Timeline Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AboutTimeline />
      </motion.div>

      {/* Team Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AboutTeam />
      </motion.div>

      {/* Gallery Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AboutGallery />
      </motion.div>

      {/* Testimonials Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AboutTestimonials />
      </motion.div>

      <Footer />
    </div>
  );
}
