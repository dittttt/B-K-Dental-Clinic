import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext<{
  path: string;
  navigate: (to: string) => void;
}>({ path: '/', navigate: () => {} });

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    // 1. Parse the target url
    let targetPath = to;
    let targetHash = '';

    if (to.includes('#')) {
      const parts = to.split('#');
      targetPath = parts[0];
      targetHash = parts[1];
    }
    
    // Default to root if empty path
    if (targetPath === '') targetPath = '/';

    // 2. Update Browser History
    if (targetPath !== window.location.pathname) {
      window.history.pushState({}, '', to);
      setPath(targetPath);
      window.scrollTo(0, 0);
    } else {
      // Just updating hash or same page
      window.history.pushState({}, '', to);
      if (!targetHash) window.scrollTo(0, 0);
    }

    // 3. Handle Scrolling for anchors
    if (targetHash) {
      // Small delay to allow render
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
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