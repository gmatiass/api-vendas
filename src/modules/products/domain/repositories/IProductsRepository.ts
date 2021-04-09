import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  findAll(): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
}
