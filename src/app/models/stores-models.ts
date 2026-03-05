import { BaseModel } from './base-model';
import { LocationUnitModel } from './location-models';

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
