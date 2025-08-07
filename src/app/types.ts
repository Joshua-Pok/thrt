export interface Console{
    id: string,
    console_state: number;
    assigned_vehicle: string | undefined
}

export interface ConsoleData{
    [consoleId: string]: Console;
}

export interface VehicleData{
    [vehicleId: string]: Vehicle;
}

export interface Vehicle{
    id: string,
    vehicle_state: number,
    assigned_console: string | undefined,
}

export interface VehicleUpdateData{

}
export interface VehiclePatchData{
    id: string;
    property: string;
    new_value: number;
}

export interface VehicleRemoveData{
    id: string
}

export interface Pool{
    id: string,
    vehicle_ids: string[],
    console_ids: string[],
}

export interface PoolData{
    [poolId: string]: Pool,
}

export interface PoolRemoveData{
    id: string;
}

export interface PoolPatchData{
    id: string,
    property: string,
    new_value: string[],
}