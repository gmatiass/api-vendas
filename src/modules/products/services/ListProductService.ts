import Product from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'apivendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('apivendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
