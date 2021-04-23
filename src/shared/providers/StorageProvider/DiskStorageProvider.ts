import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    //Debugs de upload de arquivos
    //console.log('save');

    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.directory, file),
    );
    //Debugs de upload de arquivos
    //console.log('file');
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    //Debugs de upload de arquivos
    //console.log('delete');

    const filePath = path.resolve(uploadConfig.directory, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
