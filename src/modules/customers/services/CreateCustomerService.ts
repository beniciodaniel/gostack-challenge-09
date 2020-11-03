import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    // Especificando que este parâmetro será resolvido pela injeção
    // do tsyringe quando o serviço for instanciado pelo "container"
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    // validando algumas coisas
    const doesCustomerExist = await this.customersRepository.findByEmail(email);

    if (doesCustomerExist) {
      throw new AppError('This email is already assigned to a customer');
    }

    const customer = await this.customersRepository.create({ name, email });

    return customer;
  }
}

export default CreateCustomerService;
