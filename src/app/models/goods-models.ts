import {BaseModel} from './base-model';
import {LocationUnitModel} from './location-models';


export  interface BaseItem extends BaseModel{
  id:number
  goodModelBaseTypeId: number;
  description: string;
  manufacturer: string
}
export  interface GoodsTypesModel extends BaseModel
{
  id:number;
  goodModelId:number;
  name:string;
  description:string;
  goodModelBaseType?:BaseItem;
}


export interface GoodsModels extends BaseModel
{
  id:number;
  goodModelId:number;
  price:number;
  status: number
  serialNumber:string;
  locationId:number;
  goodsTypes?:GoodsTypesModel;
  locationTypesInstances?: LocationUnitModel;
}


