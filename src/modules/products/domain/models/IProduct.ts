import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export interface IProduct {
  id: string;
  order_products: OrdersProducts[]; //Substituir por interface IOrdersProducts de @orders.
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
