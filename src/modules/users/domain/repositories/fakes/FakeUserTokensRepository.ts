import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { IUserTokensRepository } from '../IUserTokensRepository';
import { v4 as uuidv4 } from 'uuid';
import { toDate } from 'date-fns';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      tokenFind => tokenFind.token === token,
    );

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = uuidv4();
    userToken.token = uuidv4();
    userToken.user_id = user_id;
    userToken.created_at = toDate(Date.now());

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
