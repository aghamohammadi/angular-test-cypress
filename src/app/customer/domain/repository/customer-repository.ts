import { ICustomer } from "../entities/interfaces/icustomer"



export interface ICustomerPersistence {
  create(entity: any): Promise<any>;
  update(entity: any): Promise<any>;
  remove(email: string): Promise<any>;
  getAll(): Promise<any>
  get(email: string): Promise<any>
}

class CustomerRepository {
  constructor(private iPersistence: ICustomerPersistence) { }

  public async create(entity: ICustomer) {
    return await this.iPersistence.create(entity)
  }
  public async update(entity: ICustomer) {
    return await this.iPersistence.update(entity)
  }
  public async remove(email: string) {
    return await this.iPersistence.remove(email);
  }

  public async getAll() {
    return await this.iPersistence.getAll()
  }
  public async get(email: string) {
    return await this.iPersistence.get(email);
  }
}

export { CustomerRepository }
