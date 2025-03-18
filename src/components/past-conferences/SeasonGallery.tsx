import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SeasonData } from '@/data/seasonsData';
import { X } from 'lucide-react';

interface SeasonGalleryProps {
  season: SeasonData;
}

const SeasonGallery: React.FC<SeasonGalleryProps> = ({ season }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren", 
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      }
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-12"
      >
        <h2 className={`text-3xl font-bold ${season.textColor} dark:text-white`}>Photo Gallery</h2>
        <p className="text-neutral-600 dark:text-neutral-300 mt-3 max-w-2xl mx-auto">
          Visual highlights from our Season {season.year} conference capturing key moments and memories.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {season.photos.map((photo, index) => (
          <motion.div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg group relative cursor-pointer"
            variants={itemVariants}
            whileHover={{ y: -7, scale: 1.03 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={photo.url} 
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-t ${season.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-white font-semibold text-lg">{photo.caption}</h3>
              <p className="text-white/90 text-sm">Season {season.year}</p>
            </div>
            
            <div className={`absolute top-3 right-3 ${season.mediumBg} ${season.textColor} text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
              {index + 1}/{season.photos.length}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={season.photos[selectedImage].url} 
              alt={season.photos[selectedImage].caption} 
              className="w-full h-full object-contain"
            />
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white">
              <h3 className="text-lg font-semibold">{season.photos[selectedImage].caption}</h3>
              <p className="text-sm opacity-80">Season {season.year}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SeasonGallery;
