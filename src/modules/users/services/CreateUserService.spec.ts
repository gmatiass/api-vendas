import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to use the same email', async () => {
    await createUser.execute({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Juca Bala',
        email: 'jucabala@apivendas.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
