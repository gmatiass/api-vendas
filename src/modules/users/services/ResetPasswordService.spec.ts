import AppError from '@shared/errors/AppError';
import { subHours } from 'date-fns';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../domain/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to reset password with a unvalid token', async () => {
    await fakeUserTokensRepository.generate('123123');

    expect(
      resetPassword.execute({
        token: 'token',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with a unvalid user', async () => {
    const userToken = await fakeUserTokensRepository.generate('123123');

    await fakeUserRepository.create({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    expect(
      resetPassword.execute({
        token: userToken.token,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with a expired token', async () => {
    const user = await fakeUserRepository.create({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    userToken.created_at = subHours(userToken.created_at, 6);

    expect(
      resetPassword.execute({
        token: userToken.token,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      token: userToken.token,
      password: 'password',
    });

    expect(
      await fakeHashProvider.compareHash('password', user.password),
    ).toBeTruthy();
  });
});
