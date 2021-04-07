import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import Order from '../infra/typeorm/entities/Order';

interface IRequest {
  order_id: string;
}

class ShowOrderService {
  public async execute({ order_id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
