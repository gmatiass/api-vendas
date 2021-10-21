import { IUser } from '../domain/models/IUser';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUserService;

describe('ListUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsers = new ListUserService(fakeUsersRepository);
  });

  it('should list all users', async () => {
    await fakeUsersRepository.create({
      name: 'Juca Bala',
      email: 'jucabala@apivendas.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Juca Bala',
      email: 'jucabala2@apivendas.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Juca Bala',
      email: 'jucabala3@apivendas.com',
      password: '123456',
    });

    const users = await listUsers.execute();
    const usersRep = await fakeUsersRepository.findAll();

    expect(users.length).toBe(usersRep.length);
    expect(users).toEqual(usersRep);
  });
});
