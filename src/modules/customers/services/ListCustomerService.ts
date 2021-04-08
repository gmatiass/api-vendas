import Customer from '../infra/typeorm/entities/Customer';
import { injectable, inject } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<Customer[] | undefined> {
    const customers = await this.customerRepository.findAll();

    return customers;
  }
}

export default ListCustomerService;
