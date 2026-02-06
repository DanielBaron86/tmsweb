import {BaseItem, GoodsTypesModel, v_GoodsTypesInstances} from './goods-models';

export  interface  BaseModel {
  createdDate?: Date | null;
  updatedDate?: Date | null;
}

export interface paginatedResult<T> {
  result: T;
  paginationHeader: PaginationHeader;
}

export interface BaseCollectionName {
  pageNumber: number;
  collectionName: BaseItem[];
}

export interface TypesCollectionName {
  pageNumber: number;
  collectionName: GoodsTypesModel[];
}

export interface ItemInstanceCollectionName {
  pageNumber: number;
  collectionName: v_GoodsTypesInstances[];
}

export interface PaginationHeader {
  TotalItemCount: number;
  TotalPageCount: number;
  PageSize: number;
  CurrentPage: number;
}

