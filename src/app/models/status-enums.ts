export enum GoodsStatusEnum {
  NONE,
  PENDING,
  IN_TRANSIT,
  AVAILABLE,
  DEFECTED,
  IN_REPAIR,
  SOLD,
  RETURNED,
  LOST,
  DELETED,
  RESERVED,
}

export enum TaskTypes {
  NONE,
  PROCUREMENT,
  TRANSFER,
}

export enum TaskTypesStatus {
  NONE,
  PENDING,
  OPEN,
  CLOSED,
  COMPLETE,
}

export enum InventoryKey {
  Quantity,
  Serial,
}

export enum UserTypeEnum {
  NONE,
  NOTUSABLE,
  CLIENT,
  CLERK,
  SUPERVISOR,
}

export enum LocationTypesList {
  NONE,
  WAREHOUSE,
  STORE,
  CLIENT,
  SUPPLIER,
}
export enum SessionStatusEnum {
  NONE,
  OPEN,
  CLOSED,
}
export enum PaymentStatusEnum {
  NONE,
  OPEN,
  PAID,
}

export enum StoreOperationType {
  NONE,
  Sale,
  Return,
  Others,
}
