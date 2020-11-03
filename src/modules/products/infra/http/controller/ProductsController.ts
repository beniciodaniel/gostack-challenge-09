import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    // recupera os dados pela requisição
    const { name, price, quantity } = request.body;

    // start service
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({ name, price, quantity });
    // end service

    return response.status(200).json(product);
  }
}
