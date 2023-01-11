import { ICustomer } from "../entities/interfaces/icustomer";
import { CustomerRepository } from "../repository/customer-repository";


class CustomerService {
  private _customer: ICustomer;

  constructor(customer: ICustomer, private repository: CustomerRepository) {
    // if (!this.isValidIsbn(customer.isbn)) throw new Error('Invalid Key!');
     this._customer = customer;
  }

  public isValidIsbn(key: number): boolean {
    return key.toString().length > 5
  }

  public create() {
    const model: ICustomer = {
      firstname: this._customer.firstname.trim(),
      lastname: this._customer.lastname.trim(),
      dateOfBirth: this._customer.dateOfBirth,
      phoneNumber: this._customer.phoneNumber.trim(),
      email: this._customer.email.toLocaleLowerCase(),
      bankAccountNumber: this._customer.bankAccountNumber.trim(),
    }
    return this.repository.create(model)
  }
  public update() {
    const model: ICustomer = {
      firstname: this._customer.firstname.trim(),
      lastname: this._customer.lastname.trim(),
      dateOfBirth: this._customer.dateOfBirth,
      phoneNumber: this._customer.phoneNumber.trim(),
      email: this._customer.email.toLocaleLowerCase().trim(),
      bankAccountNumber: this._customer.bankAccountNumber.trim(),
    }

    return this.repository.update(model)
  }

  public getAll() {
    return this.repository.getAll();
  }
  public get(email: string) {
    return this.repository.get(email);
  }
  public remove(email:string) {
    return this.repository.remove(email);
  }
}

export default CustomerService;
