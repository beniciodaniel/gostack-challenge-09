import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { name, email } = request.body;

    // START SERVICE
    // o service possui parametro injetável (ou seja, possui uma deixa para receber o que precisa)
    // os containers com as instâncias únicas dos repositórios estao em SHARED/container/index e o
    // "container" aqui importado do "tsyringe" faz a ponte pegando instanciando a classe do serviço e injetando
    // dentro dela o container que precisa lá do SHARED/container/index
    const createCustomer = container.resolve(CreateCustomerService);
    const customer = await createCustomer.execute({ name, email });
    // END SERVICE

    return response.json(customer);
  }
}
