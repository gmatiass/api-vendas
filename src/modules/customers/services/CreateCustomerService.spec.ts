import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to use the same email', async () => {
    await createCustomer.execute({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
    });

    expect(
      createCustomer.execute({
        name: 'Juca Bala',
        email: 'jucabala@apivendas.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
