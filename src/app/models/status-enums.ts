export enum GoodsStatusEnum
{
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
  RESERVED
}




export enum TaskTypes
{
  NONE,
  PROCUREMENT,
  TRANSFER,

}

export  enum TaskTypesStatus
{
  NONE,
  PENDING,
  OPEN,
  CLOSED,
  COMPLETE
}

export enum InventoryKey {
  Quantity,
  Serial
}
