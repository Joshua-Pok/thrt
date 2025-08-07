import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import socket from '../../socket';
import { Pool, PoolData } from '@/app/types';

interface PoolContextType {
  pools: Pool[];
  getPoolById: (id: string) => Pool | undefined;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);

export const PoolProvider = ({ children }: { children: ReactNode }) => {
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    const handlePoolInit = (data: PoolData) => {
      const poolsArray = Object.values(data);
      setPools(poolsArray);
    };
    socket.on('onPoolInit', handlePoolInit);
    return () => {
      socket.off('onPoolInit', handlePoolInit);
    };
  }, []);

  const getPoolById = (id: string) => pools.find(pool => pool.id === id);

  return (
    <PoolContext.Provider value={{ pools, getPoolById }}>
      {children}
    </PoolContext.Provider>
  );
};

export const usePools = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error('usePools must be used within a PoolProvider');
  }
  return context;
};
