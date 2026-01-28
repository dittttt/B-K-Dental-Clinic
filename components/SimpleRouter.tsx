import React, { createContext, useContext, useState } from 'react';

const RouterContext = createContext<{
  path: string;
  navigate: (to: string) => void;
}>({ path: '/', navigate: () => {} });

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize path to root ('/') strictly.
  // In sandboxed environments (blobs/iframes), window.location.pathname is unreliable 
  // and often refers to the blob path, which causes the app to render nothing.
  const [path, setPath] = useState('/'); 

  const navigate = (to: string) => {
    // 1. Parse the target url
    let targetPath = to;
    let targetHash = '';

    if (to.includes('#')) {
      const parts = to.split('#');
      targetPath = parts[0];
      targetHash = parts[1];
    }
    
    // If targetPath is empty string (e.g. link was "#faq"), assume current path
    if (targetPath === '') {
        targetPath = path; 
    }
    
    // Normalize root path if just '/'
    if (targetPath === '') targetPath = '/';

    // 2. Update State
    // We intentionally DO NOT use window.history.pushState here to avoid SecurityErrors
    // in sandboxed environments. The app works as a single-page application in memory.
    if (targetPath !== path) {
      setPath(targetPath);
      window.scrollTo(0, 0);
      
      // Handle hash scroll after render
      if (targetHash) {
        setTimeout(() => {
          const el = document.getElementById(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Same path navigation (just scrolling)
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Link: React.FC<{ 
  to: string; 
  children: React.ReactNode; 
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ to, children, className, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};