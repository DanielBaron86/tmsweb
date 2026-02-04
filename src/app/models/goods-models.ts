import {BaseModel} from './base-model';
import {LocationUnitModel} from './location-models';


export interface BaseItem extends BaseModel {
  id: number
  description: string;
  manufacturer: string
}

export interface GoodsTypesModel extends BaseModel {
  id: number;
  goodModelId: number;
  name: string;
  description: string;
  type: string;
  manufacturer: string
  inventoryKey: number
  goodModelBaseTypeEntity?: BaseItem;
}


export interface GoodsModels extends BaseModel {
  id: number;
  goodModelId: number;
  price: number;
  status: number
  serialNumber: string;
  locationId: number;
  goodsTypes?: GoodsTypesModel;
  locationTypesInstances?: LocationUnitModel;
}

export interface v_GoodsTypesInstances extends BaseModel {
  id: number;
  goodModelId: number;
  goodBaseId: number;
  price: number;
  locationId: number;
  locationName: string;
  serialNumber: string
  name: string
  type: string
  manufacturer: string
  status: number
  quantity: number;
}


