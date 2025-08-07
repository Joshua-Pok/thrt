import { ReactElement, useEffect, useState } from 'react';
import socket from '../../socket';
import { Vehicle, VehicleData, VehiclePatchData } from '@/app/types';

export const VehicleProvider = (children: ReactElement) => {
  const [isConnected, setIsConnected] = useState(false);
  const [VehicleData, setVehicleData] = useState<Vehicle[]>([]);
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleVehicleInit = (data: VehicleData) => {
      const vehicles = Object.values(data);
      setVehicleData(vehicles);
    };

    const handleVehicleUpdate = (data: VehicleData) => {
      const updatedVehicle = Object.values(data)[0];
      setVehicleData((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle,
        ),
      );
    };

    const handleVehiclePatch = (data: VehiclePatchData) => {
      setVehicleData((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === data.id
            ? { ...vehicle, [data.property]: data.new_value }
            : vehicle,
        ),
      );
    };

    const handleVehicleRemove = (data: { id: string }) => {
      setVehicleData((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== data.id),
      );
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('onConsoleInit', handleVehicleInit);
    socket.on('onVehicleUpdate', handleVehicleUpdate);
    socket.on('onVehiclePatch', handleVehiclePatch);
    socket.on('onVehicleRemove', handleVehicleRemove);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('onConsoleInit', handleVehicleInit);
      socket.off('onVehicleUpdate', handleVehicleUpdate);
      socket.off('onVehiclePatch', handleVehiclePatch);
      socket.off('onVehicleRemove', handleVehicleRemove);
    };
  }, []);
};
