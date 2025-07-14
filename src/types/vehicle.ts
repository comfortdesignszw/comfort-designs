export interface VehicleEntry {
  id: string;
  dateTime: Date;
  driverName: string;
  tripTo: string;
  vehicleType: string;
  vehiclePlateNumber: string;
  mileageOut: number;
  fuelGaugeBefore: FuelLevel;
  mileageIn: number;
  fuelGaugeAfter: FuelLevel;
  totalMileage: number;
  createdAt: Date;
  updatedAt: Date;
}

export type FuelLevel = 
  | "Full"
  | "Full−"
  | "Three Quarter+"
  | "Three Quarter"
  | "Three Quarter−"
  | "Half+"
  | "Half"
  | "Half−"
  | "Quarter+"
  | "Quarter"
  | "Quarter−"
  | "Empty+";

export interface VehicleEntryInput {
  dateTime: Date;
  driverName: string;
  tripTo: string;
  vehicleType: string;
  vehiclePlateNumber: string;
  mileageOut: number;
  fuelGaugeBefore: FuelLevel;
  mileageIn: number;
  fuelGaugeAfter: FuelLevel;
}

export interface VehicleStats {
  totalEntries: number;
  totalMileage: number;
  averageMileagePerTrip: number;
  mostUsedVehicle: string;
  fuelEfficiencyTrend: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}