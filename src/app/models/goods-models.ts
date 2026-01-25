import {BaseModel} from './base-model';

export  interface GoodsTypesModel extends BaseModel
{
  id:number;
  goodModelId:number;
  name:string;
  description:string;
}


export interface GoodsModels extends BaseModel
{
  id:number;
  goodModelId:number;
  price:number;
  status: number
  serialNumber:string;
  locationId:number;
}

export  interface BaseItem extends BaseModel{
  id:number
  goodModelBaseTypeId: number;
  description: string;
  manufacturer: string
}
