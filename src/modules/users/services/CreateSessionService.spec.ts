import 'reflect-metadata';
import CreateSessionService from './CreateSessionService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a session', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', () => {
    expect(
      createSession.execute({
        email: 'jucabala@apivendas.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'jucabala@apivendas.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
