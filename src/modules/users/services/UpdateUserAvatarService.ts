import uploadConfig from '@config/upload';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFilename);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();

      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      const filename = await diskProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
