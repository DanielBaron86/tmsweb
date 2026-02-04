export interface GoodsOrder {
  goodTypeId: number
  goodType: string
  location: number
  quantity: number
}

export interface CreateProcurement {
  creatorId: number
  userName: string
  description: string
  goodsOrder: GoodsOrder[]
}
