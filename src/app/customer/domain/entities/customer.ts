import { ICustomer } from './interfaces/icustomer';
class Customer {
  private _firstname: string;
  private _lastname: string;
  private _dateOfBirth: Date;
  private _phoneNumber: string;
  private _email: string;
  private _bankAccountNumber: string;

  constructor(customer: ICustomer) {
    this._firstname = customer.firstname;
    this._lastname = customer.lastname;
    this._dateOfBirth = customer.dateOfBirth;
    this._phoneNumber = customer.phoneNumber;
    this._email = customer.email;
    this._bankAccountNumber = customer.bankAccountNumber;
  }
}


export default Customer;
