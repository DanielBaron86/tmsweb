export  interface  BaseModel {
  createdDate: Date | null;
  updatedDate: Date | null;
}

export interface paginatedResult<T> {
  result: T[];
  paginationHeader: PaginationHeader;
}

export interface PaginationHeader {
  TotalItemCount: number;
  TotalPageCount: number;
  PageSize: number;
  CurrentPage: number;
}

