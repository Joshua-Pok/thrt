import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import socket from '../../socket';
import { Console, ConsoleData } from '@/app/types';

interface ConsoleContextType {
  consoles: Console[];
  getConsolesByPool: (pool: import('@/app/types').Pool) => Console[];
  getConsoleById: (id: string) => Console | undefined;
}

const ConsoleContext = createContext<ConsoleContextType | undefined>(undefined);

export const ConsoleProvider = ({ children }: { children: ReactNode }) => {
  const [consoles, setConsoles] = useState<Console[]>([]);

  useEffect(() => {
    const handleConsoleInit = (data: ConsoleData) => {
      const consolesArray = Object.values(data);
      setConsoles(consolesArray);
    };
    const handleConsoleUpdate = (data: ConsoleData) => {
      const updatedConsole = Object.values(data)[0];
      setConsoles((prev: Console[]) => 
        prev.map(console => console.id === updatedConsole.id ? updatedConsole : console)
      );
    };
    const handleConsolePatch = (data: { id: string; property: string; new_value: any }) => {
      setConsoles((prev: Console[]) =>
        prev.map(console =>
          console.id === data.id
            ? { ...console, [data.property]: data.new_value }
            : console
        )
      );
    };
    const handleConsoleRemove = (data: { id: string }) => {
      setConsoles((prev: Console[]) => prev.filter(console => console.id !== data.id));
    };
    socket.on('onConsoleInit', handleConsoleInit);
    socket.on('onConsoleUpdate', handleConsoleUpdate);
    socket.on('onConsolePatch', handleConsolePatch);
    socket.on('onConsoleRemove', handleConsoleRemove);
    return () => {
      socket.off('onConsoleInit', handleConsoleInit);
      socket.off('onConsoleUpdate', handleConsoleUpdate);
      socket.off('onConsolePatch', handleConsolePatch);
      socket.off('onConsoleRemove', handleConsoleRemove);
    };
  }, []);

  const getConsolesByPool = (pool: import('@/app/types').Pool) =>
    consoles.filter(console => pool.console_ids.includes(console.id));
  
  const getConsoleById = (id: string) => consoles.find(console => console.id === id);

  return (
    <ConsoleContext.Provider value={{ consoles, getConsolesByPool, getConsoleById }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsoles = () => {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error('useConsoles must be used within a ConsoleProvider');
  }
  return context;
}; 
