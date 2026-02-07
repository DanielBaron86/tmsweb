import {BaseModel} from './base-model';



export interface TaskModels extends BaseModel {
  id: number;
  taskType: number;
  taskStatus: number;
  description: string;
  creatorId: number;
  userName?: string
}

export  interface ProcurementsSubtaskModel {
  id: number;
  taskId: number;
  goodTypeId: number;
  goodType: string;
  location: number;
  quantity: number;
  remainingQuantity: number;
}
export interface ProcurementsModel extends TaskModels{
  TasksEntitiesProcurements: ProcurementsSubtaskModel[];
}
