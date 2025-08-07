import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import socket from '../../socket';
import { Vehicle, VehicleData, VehiclePatchData } from '@/app/types';

interface VehicleContextType {
  vehicles: Vehicle[];
  getVehiclesByPool: (pool: import('@/app/types').Pool) => Vehicle[];
  getVehicleById: (id: string) => Vehicle | undefined;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const handleVehicleInit = (data: VehicleData) => {
      const vehiclesArray = Object.values(data);
      setVehicles(vehiclesArray);
    };
    const handleVehicleUpdate = (data: VehicleData) => {
      const updatedVehicle = Object.values(data)[0];
      setVehicles((prev: Vehicle[]) => 
        prev.map(vehicle => vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle)
      );
    };
    const handleVehiclePatch = (data: VehiclePatchData) => {
      setVehicles((prev: Vehicle[]) =>
        prev.map(vehicle =>
          vehicle.id === data.id
            ? { ...vehicle, [data.property]: data.new_value }
            : vehicle
        )
      );
    };
    const handleVehicleRemove = (data: { id: string }) => {
      setVehicles((prev: Vehicle[]) => prev.filter(vehicle => vehicle.id !== data.id));
    };
    socket.on('onVehicleInit', handleVehicleInit);
    socket.on('onVehicleUpdate', handleVehicleUpdate);
    socket.on('onVehiclePatch', handleVehiclePatch);
    socket.on('onVehicleRemove', handleVehicleRemove);
    return () => {
      socket.off('onVehicleInit', handleVehicleInit);
      socket.off('onVehicleUpdate', handleVehicleUpdate);
      socket.off('onVehiclePatch', handleVehiclePatch);
      socket.off('onVehicleRemove', handleVehicleRemove);
    };
  }, []);

  const getVehiclesByPool = (pool: import('@/app/types').Pool) =>
    vehicles.filter(vehicle => pool.vehicle_ids.includes(vehicle.id));
  
  const getVehicleById = (id: string) => vehicles.find(vehicle => vehicle.id === id);

  return (
    <VehicleContext.Provider value={{ vehicles, getVehiclesByPool, getVehicleById }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};
