import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findbyId(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findbyEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
