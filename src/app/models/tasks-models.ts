import {BaseModel} from './base-model';



export interface TaskModels extends BaseModel {
  id: number;
  taskType: number;
  taskStatus: number;
  description: string;
  userId: number;
  userName?: string
}
