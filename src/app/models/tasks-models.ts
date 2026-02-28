import { BaseModel } from './base-model';
import { LocationUnitModel } from './location-models';
import { GoodsModels } from './goods-models';
import { TaskTypesStatus } from './status-enums';

export interface TaskModels extends BaseModel {
  id: number;
  taskType: number;
  taskStatus: number;
  description: string;
  creatorId: number;
  userName?: string;
}

export interface ProcurementsSubtaskModel {
  id: number;
  taskId: number;
  goodTypeId: number;
  goodType: string;
  location: number;
  quantity: number;
  remainingQuantity: number;
  locationTypesInstances: LocationUnitModel;
}
export interface ProcurementsModel extends TaskModels {
  tasksEntitiesProcurements: ProcurementsSubtaskModel[];
}
export interface FulfillGoodsModel {
  price: number;
  serialNumber: string;
  quantity: number;
}

export interface FulfilmentModel {
  supplier: number;
  subTaskId: number;
  userId: number;
  fulfillGoodsModels: FulfillGoodsModel[];
}

export interface ReturnFulfillTask {
  goodsModels: GoodsModels[];
  rejectedProcurementTransfer: RejectedProcurementTransfer[];
}

export interface RejectedProcurementTransfer {
  location: number;
  supplier: number;
  subTaskId: number;
  serialNumber: string;
  reason: string;
}

export interface TransferTask {
  creatorId: number;
  userName: string;
  description: string;
  goodsTransfer: {
    goodId: number[];
    toLocation: number;
  };
}

export interface TasksModelWithTransfer extends TaskModels {
  tasksEntitiesTransferList: TasksEntitiesTransferModel[];
}
export interface TasksEntitiesTransferModel {
  id: number;
  taskId: number;
  goodId: number;
  serialNumber: string;
  fromLocation: number;
  fromLocationName: string;
  toLocation: number;
  toLocationName: string;
  taskStatus: TaskTypesStatus | null;
}

export interface FulfillGoodsTransfer {
  userId: number;
  fulfillGoodsTransfer: string[];
}
