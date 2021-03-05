import Customer from '../typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customers = await customerRepository.find();

    return customers;
  }
}

export default ListCustomerService;
