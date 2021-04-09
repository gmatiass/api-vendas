export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  createOrder({ customer, products }: ICreateOrder): Promise<IOrder>;
  save();
}
