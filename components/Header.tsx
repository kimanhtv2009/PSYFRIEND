import React from 'react';

// A simple SVG logo for PsyFriend as a placeholder for logo.png
const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        <path d="M12 18C15.31 18 18 15.31 18 12H16C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12H6C6 15.31 8.69 18 12 18Z" fill="currentColor" opacity="0.6"/>
        <path d="M12 12.5C12.83 12.5 13.5 11.83 13.5 11C13.5 10.17 12.83 9.5 12 9.5C11.17 9.5 10.5 10.17 10.5 11C10.5 11.83 11.17 12.5 12 12.5Z" fill="currentColor"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 z-10">
      <Logo />
      <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
        PsyFriend
      </h1>
    </header>
  );
};