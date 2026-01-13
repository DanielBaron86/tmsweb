import {BaseModel} from './base-model';

export  interface GoodsTypesModel extends BaseModel
{
  id:number;
  goodModelId:number
  name:string
  description:string
}
