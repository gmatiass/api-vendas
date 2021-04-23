import { injectable, inject } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<ICustomer[] | undefined> {
    const customers = await this.customerRepository.findAll();

    return customers;
  }
}

export default ListCustomerService;
