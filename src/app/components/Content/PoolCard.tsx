import { Card, Button, Checkbox, Dropdown, MenuProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import '../../Scss/CardStyles.scss';
import { Pool, Console, Vehicle } from '@/app/types';
import { useConsoles } from '../Provider/ConsoleProvider';
import { useVehicles } from '../Provider/VehicleProvider';
import { usePools } from '../Provider/PoolProvider';
import { useState, useCallback } from 'react';

interface PoolCardProps {
  pool: Pool;
}

interface SelectionState {
  consoles: string[];
  vehicles: string[];
}

interface MoveRequest {
  sourcePoolId: string;
  targetPoolId: string;
  consoleIds: string[];
  vehicleIds: string[];
}

// Custom hook for managing selections
const useSelections = () => {
  const [selections, setSelections] = useState<SelectionState>({
    consoles: [],
    vehicles: []
  });

  const toggleConsole = useCallback((consoleId: string, checked: boolean) => {
    setSelections(prev => ({
      ...prev,
      consoles: checked 
        ? [...prev.consoles, consoleId]
        : prev.consoles.filter(id => id !== consoleId)
    }));
  }, []);

  const toggleVehicle = useCallback((vehicleId: string, checked: boolean) => {
    setSelections(prev => ({
      ...prev,
      vehicles: checked 
        ? [...prev.vehicles, vehicleId]
        : prev.vehicles.filter(id => id !== vehicleId)
    }));
  }, []);

  const clearSelections = useCallback(() => {
    setSelections({ consoles: [], vehicles: [] });
  }, []);

  const hasSelections = selections.consoles.length > 0 || selections.vehicles.length > 0;

  return {
    selections,
    toggleConsole,
    toggleVehicle,
    clearSelections,
    hasSelections
  };
};

// Console item component
const ConsoleItem = ({ 
  console, 
  isSelected, 
  onToggle 
}: { 
  console: Console; 
  isSelected: boolean; 
  onToggle: (checked: boolean) => void;
}) => (
  <div className="console">
    <Checkbox checked={isSelected} onChange={(e) => onToggle(e.target.checked)}>
      {console.id}
    </Checkbox>
    <p>{console.console_state === 1 ? 'Available' : 'Unavailable'}</p>
  </div>
);

// Vehicle item component
const VehicleItem = ({ 
  vehicle, 
  isSelected, 
  onToggle 
}: { 
  vehicle: Vehicle; 
  isSelected: boolean; 
  onToggle: (checked: boolean) => void;
}) => (
  <div className="vehicle">
    <Checkbox checked={isSelected} onChange={(e) => onToggle(e.target.checked)}>
      {vehicle.id}
    </Checkbox>
    <p>{vehicle.vehicle_state === 1 ? 'Online' : 'Offline'}</p>
    <Button>⋮</Button>
  </div>
);

export default function PoolCard({ pool }: PoolCardProps) {
  const { getConsolesByPool } = useConsoles();
  const { getVehiclesByPool } = useVehicles();
  const { pools } = usePools();
  
  const consoles = getConsolesByPool(pool);
  const vehicles = getVehiclesByPool(pool);
  
  const { selections, toggleConsole, toggleVehicle, clearSelections, hasSelections } = useSelections();

  const handleMove = useCallback(async (targetPoolId: string) => {
    if (!hasSelections) return;

    const moveRequest: MoveRequest = {
      sourcePoolId: pool.id,
      targetPoolId,
      consoleIds: selections.consoles,
      vehicleIds: selections.vehicles
    };

    try {
      const response = await fetch('/api/move-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moveRequest)
      });

      if (response.ok) {
        clearSelections();
        // TODO: Refresh data or update state as needed
      } else {
        console.error('Failed to move items');
      }
    } catch (error) {
      console.error('Error moving items:', error);
    }
  }, [pool.id, selections, hasSelections, clearSelections]);

  const moveMenuItems: MenuProps['items'] = pools
    .filter(targetPool => targetPool.id !== pool.id)
    .map(targetPool => ({
      key: targetPool.id,
      label: targetPool.id,
      onClick: () => handleMove(targetPool.id)
    }));

  return (
    <div className="card-wrapper">
      <div className="card-header">
        <div className="header-title">
          <p>{pool.id}</p>
          <InfoCircleOutlined />
        </div>
        <Button>⋮</Button>
      </div>
      
      <Card
        title={
          <div className="subheader">
            <p>Consoles</p>
            <Dropdown menu={{ items: moveMenuItems }} trigger={['click']}>
              <Button 
                style={{ background: '#3B82F6' }}
                disabled={!hasSelections}
              >
                Move
              </Button>
            </Dropdown>
          </div>
        }
        headStyle={{ background: '#FFFFFF0A' }}
        style={{ width: '100%' }}
      >
        <div className="card-content">
          {consoles.map((console) => (
            <ConsoleItem
              key={console.id}
              console={console}
              isSelected={selections.consoles.includes(console.id)}
              onToggle={(checked) => toggleConsole(console.id, checked)}
            />
          ))}
        </div>
      </Card>
      
      <Card
        title="Vehicles"
        headStyle={{ background: '#FFFFFF0A' }}
        style={{ width: '100%' }}
      >
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selections.vehicles.includes(vehicle.id)}
              onToggle={(checked) => toggleVehicle(vehicle.id, checked)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
