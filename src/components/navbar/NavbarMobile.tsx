import React, { memo, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from '@/lib/utils';

interface NavbarMobileProps {
  scrolled: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isHomePage: boolean;
  navLinks: any[];
}

// Memoized dropdown item component
const MobileDropdownItem = memo(({ 
  item, 
  location, 
  scrolled, 
  onClick
}: { 
  item: any; 
  location: any; 
  scrolled: boolean; 
  onClick: (path: string) => void;
}) => {
  // Check if the current path matches this item's path
  const isActive = (() => {
    // For season pages
    if (item.path.startsWith('/seasons/')) {
      return location.pathname === item.path;
    }
    return location.pathname === item.path;
  })();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent immediate navigation
    onClick(item.path);
  };

  return (
    <a 
      key={item.name}
      href={item.path} 
      className={cn(
        "flex items-center py-3 px-4 rounded-lg transition-all duration-300",
        isActive
          ? scrolled 
            ? 'bg-diplomatic-800 text-white font-medium' 
            : 'bg-diplomatic-700/60 text-white font-medium' 
          : scrolled 
            ? 'text-white hover:bg-diplomatic-800' 
            : 'text-white/80 hover:bg-diplomatic-700/50'
      )}
      onClick={handleClick}
    >
      <ChevronRight size={14} className="mr-2 opacity-70" />
      <div>
        <div className="text-sm">{item.name}</div>
        <div className="text-xs opacity-75">
          {item.name.includes("Season 1") ? "Global Health Emergencies" : 
           item.name.includes("Season 2") ? "Climate Action & Development" : 
           "Digital Transformation & Governance"}
        </div>
      </div>
    </a>
  );
});

MobileDropdownItem.displayName = 'MobileDropdownItem';

const NavbarMobile: React.FC<NavbarMobileProps> = ({ 
  scrolled, 
  isMenuOpen, 
  toggleMenu, 
  isHomePage,
  navLinks
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  // Reset open dropdowns when menu closes
  React.useEffect(() => {
    if (!isMenuOpen) {
      setOpenDropdowns([]);
    }
  }, [isMenuOpen]);

  // Handle delayed navigation with transition
  const handleNavigation = useCallback((path: string) => {
    if (isNavigating) return; // Prevent multiple clicks
    
    setIsNavigating(true);
    
    // Close the mobile menu
    toggleMenu();
    
    // Add a small delay before navigation to allow for transition
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 300); // Increased delay for smoother transition
  }, [navigate, isNavigating, toggleMenu]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "md:hidden absolute top-16 left-0 right-0 overflow-hidden z-50",
            scrolled 
              ? 'bg-diplomatic-900 shadow-elegant border-t border-diplomatic-800' 
              : isHomePage 
                ? 'bg-diplomatic-800 border-t border-diplomatic-700'
                : 'bg-diplomatic-700 border-t border-diplomatic-600'
          )}
        >
          <div className="px-4 py-5 space-y-1">
            {navLinks.map((link) => {
              // Handle dropdown items
              if (link.hasDropdown && link.dropdownItems) {
                const isOpen = openDropdowns.includes(link.name);
                
                return (
                  <Collapsible 
                    key={link.name}
                    open={isOpen}
                    onOpenChange={() => toggleDropdown(link.name)}
                    className="w-full"
                  >
                    <CollapsibleTrigger 
                      className={cn(
                        "flex justify-between items-center w-full py-3 px-3 rounded-lg transition-colors",
                        location.pathname === link.path || location.pathname.startsWith(link.path)
                          ? scrolled 
                            ? 'bg-diplomatic-800 text-white font-medium' 
                            : 'bg-diplomatic-700 text-white font-medium' 
                          : scrolled 
                            ? 'text-white hover:bg-diplomatic-800' 
                            : 'text-white/90 hover:bg-diplomatic-700'
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={cn(
                          "transition-transform duration-200",
                          isOpen ? 'transform rotate-180' : ''
                        )} 
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-2 space-y-1 mt-1">
                      {link.dropdownItems.map((item: any) => (
                        <motion.div
                          key={item.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="transition-all duration-300"
                        >
                          <MobileDropdownItem
                            item={item}
                            location={location}
                            scrolled={scrolled}
                            onClick={handleNavigation}
                          />
                        </motion.div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }
              
              // Regular navigation items (non-dropdown)
              return (
                <div key={link.name}>
                  <Link 
                    to={link.path} 
                    className={cn(
                      "block py-3 px-3 rounded-lg transition-colors",
                      location.pathname === link.path || 
                      (link.path === '/resources' && location.pathname.startsWith('/resources'))
                        ? scrolled 
                          ? 'bg-diplomatic-800 text-white font-medium' 
                          : 'bg-diplomatic-700 text-white font-medium' 
                        : scrolled 
                          ? 'text-white hover:bg-diplomatic-800' 
                          : 'text-white/90 hover:bg-diplomatic-700'
                    )}
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Link 
                to="/registration" 
                className="bg-gold-500 hover:bg-gold-600 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 w-full flex justify-center items-center gap-2 shadow-gold"
                onClick={toggleMenu}
              >
                <Globe size={18} />
                <span>Register Now</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(NavbarMobile);
