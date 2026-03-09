import { BaseModel } from './base-model';
import { LocationUnitModel } from './location-models';
import { UserResource } from './user-models';

export interface CashRegisterModel extends BaseModel {
  id: number;
  registerNumber: number;
  locationId: number;
  notes: string[];
  locationTypesInstances: LocationUnitModel;
}

export interface CreateCashRegisterModel {
  registerNumber: number;
  locationId: number;
  notes: string[];
}

export interface CashRegisterSession extends BaseModel {
  id: number;
  sessionStatus: number;
  assignedClerk: number;
  cashRegisterId: number;
  openHour: Date | null;
  closeHour: Date | null;
  notes: string[];
  user: UserResource;
}

export interface CreateSessionModel {
  assignedClerk: number;
  cashRegisterId: number;
}
