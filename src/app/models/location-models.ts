import {BaseModel} from './base-model';

export interface LocationTypesModel extends BaseModel{
  id: number;
  locationType: number;
  description: string;
}

export interface LocationUnitModel extends BaseModel{
  id: number;
  locationTypeID: number;
  address: string;
  description: string;
  locationTypesEntity?: LocationTypesModel | null;
}
export interface LocationCollectionName {
  pageNumber: number;
  collectionName: LocationUnitModel[];
}
