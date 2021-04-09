import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    //const redisCache = new RedisCache();

    let products = await RedisCache.recover<IProduct[]>(
      'apivendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();

      await RedisCache.save('apivendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
