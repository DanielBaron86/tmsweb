import { BaseModel } from './base-model';
import { LocationUnitModel } from './location-models';
import { UserResource } from './user-models';
import { GoodsModels } from './goods-models';

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
  cashRegisterEntity?: CashRegisterEntityModel;
}

export interface CreateSessionModel {
  assignedClerk: number;
  cashRegisterId: number;
}

export interface CashRegisterEntityModel extends BaseModel {
  id: number;
  registerNumber: number;
  locationId: number;
  notes?: string[] | null;
  locationTypesInstances: LocationUnitModel;
}

export interface StoreCartsEntityDetailsModel extends BaseModel {
  id: number;
  cartId: number;
  operationType: number; // 1 - Sale, 2 - Return
  goodId: number;
  goodsTypesInstance?: GoodsModels;
  price: number;
  notes?: string[] | null;
}

export interface CartModel extends BaseModel {
  id: number;
  clerktId: number;
  userEntity?: UserResource;
  storeLocation: number;
  locationTypesInstances?: LocationUnitModel;
  clientId: number;
  accounts?: UserResource;
  sessionId: number;
  status: number; // 1 - Open, 2 - Paid
  total: number;
  paid: number;
  remaining: number;
}

export interface CartModelWithDetails extends CartModel {
  storeCartsEntityDetails: StoreCartsEntityDetailsModel[];
}

export interface CartItem {
  operationType: number;
  goodId: number;
  price: number;
  notes: string[];
}
