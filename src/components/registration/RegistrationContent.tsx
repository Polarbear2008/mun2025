import React from 'react';
import { motion } from 'framer-motion';
import RegistrationSteps from './RegistrationSteps';
import FeeCalculator from './FeeCalculator';
import PersonalInfoStep from './PersonalInfoStep';
import PreferencesStep from './PreferencesStep';
import AdditionalInfoStep from './AdditionalInfoStep';
import ConfirmationStep from './ConfirmationStep';

interface RegistrationContentProps {
  step: number;
  formData: any;
  isSubmitting: boolean;
  calculateFee: () => { originalFee: number; discount: number; finalFee: number };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const RegistrationContent: React.FC<RegistrationContentProps> = ({
  step,
  formData,
  isSubmitting,
  calculateFee,
  handleChange,
  nextStep,
  prevStep,
  handleSubmit
}) => {
  const fee = calculateFee();

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="chip-gold mb-3"
        >
          Delegate Registration
        </motion.span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-diplomatic-900 mb-6">
          Join the Global Dialogue
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
          Begin your journey as a delegate in our prestigious Model United Nations conference. Complete the form below to secure your place.
        </p>
        
        {/* Registration Fee Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FeeCalculator hasIELTS={formData.hasIELTS} hasSAT={formData.hasSAT} />
        </motion.div>
      </motion.div>
      
      {/* Registration steps indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <RegistrationSteps currentStep={step} />
      </motion.div>
      
      {/* Registration form */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <PersonalInfoStep 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep} 
            />
          )}
          
          {step === 2 && (
            <PreferencesStep 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep} 
              prevStep={prevStep} 
            />
          )}
          
          {step === 3 && (
            <AdditionalInfoStep 
              formData={formData} 
              handleChange={handleChange} 
              calculateFee={calculateFee}
              handleSubmit={handleSubmit}
              prevStep={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
          
          {step === 4 && (
            <ConfirmationStep fee={fee} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationContent;
