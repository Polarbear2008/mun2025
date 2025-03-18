import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Variants } from 'framer-motion';

/**
 * Hook to manage page transitions
 * @param delay - Delay in milliseconds before showing content
 * @returns Object containing loading state
 */
export function usePageTransition(delay: number = 300) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);

  useEffect(() => {
    const currentPathname = location.pathname;
    const currentSearch = location.search;
    const currentKey = `${currentPathname}${currentSearch}`;
    const prevKey = prevPathname ? `${prevPathname}${location.search}` : null;
    
    // Only trigger loading state when path or search params change
    if (prevKey !== null && prevKey !== currentKey) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
      
      return () => clearTimeout(timer);
    } else if (prevPathname === null) {
      // First load
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay / 2); // Faster initial load
      
      return () => clearTimeout(timer);
    }
    
    setPrevPathname(currentPathname);
  }, [location.pathname, location.search, prevPathname, delay]);

  return { isLoading };
}

/**
 * Hook to manage component transitions
 * @param delay - Delay in milliseconds before showing content
 * @param dependencies - Array of dependencies that trigger loading state when changed
 * @returns Object containing loading state
 */
export function useComponentTransition(delay: number = 200, dependencies: any[] = []) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { isLoading };
}

/**
 * Variants for framer-motion animations
 */
export const transitionVariants = {
  pageVariants: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  } as Variants,
  
  itemVariants: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 } 
    }
  } as Variants,
  
  fadeVariants: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  } as Variants
};
