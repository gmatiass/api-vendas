import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
