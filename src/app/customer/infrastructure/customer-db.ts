import { ICustomer } from '../domain/entities/interfaces/icustomer';
import { ICustomerPersistence } from './../domain/repository/customer-repository';
import { Injectable } from '@angular/core';


@Injectable()

class CustomerDB implements ICustomerPersistence {

  private _customersKey:string = 'customer';
  private _customers: ICustomer[];


  constructor() {
    this._customers = [];
  }

  public async getAll(): Promise<{ status: number, data: ICustomer[], message: string }> {
    return { status: 200, data: this.getLocalStorage(), message :'success' };
  }

  public async create(obj: ICustomer): Promise<{ status: number, message: string }> {
    return this.addItem({ ...obj });
  }
  public async update(obj: ICustomer): Promise<{ status: number, message: string }> {
    return this.updateItem({ ...obj });
  }
  public async remove(email: string): Promise<{ status: number, message: string }> {
    return this.removeItem(email);
  }
  public async get(email: string): Promise<{ status: number, data: ICustomer|undefined, message: string }> {
    return { status: 200, data: this.getByEmail(email), message: 'success' };
  }

  public removeItem(email: string) {
    const result = this.getByEmail(email);
    if (!result)
      return { status: 404, message: 'customer not found!' };
    this._customers.splice(this._customers.indexOf(result), 1);
    this.setLocalStorage();
    return { status: 200, message: 'customer removed successfully.' };
  }



  private getLocalStorage() {
    const storeData = JSON.parse(localStorage.getItem(this._customersKey) || '[]');
    if (storeData !== null) {
      this._customers = storeData;
    }
    return this._customers;
  }

  private setLocalStorage() {
    localStorage.setItem(this._customersKey, JSON.stringify(this._customers.slice()));
  }


  private addItem(item: ICustomer): { status:number,message:string} {
    const result = this.isExistCustomer(item);
    if (result)
      return { status: 409, message: `customer firstname=${item.firstname} lastname=${item.lastname} dateOfBirth=${item.dateOfBirth} is already exists` };
    const resultEmail = this.isExistEmail(item.email);
    if (resultEmail)
      return { status: 410, message: `email ${item.email} is already exists` };
    else {
      this._customers.push(item);
      this.setLocalStorage();
      return { status: 200, message: `customer firstname=${item.firstname} lastname=${item.lastname} created successfully` };
    }

  }


  private updateItem(item: ICustomer): { status: number, message: string } {
    const result = this.getByEmail(item.email);
    if (!result)
      return { status: 404, message: `customer firstname=${item.firstname} lastname=${item.lastname} dateOfBirth=${item.dateOfBirth} not found!` };
    const resultCustomer = this.isExistCustomer(item, result);
    if (resultCustomer)
      return { status: 409, message: `customer firstname=${item.firstname} lastname=${item.lastname} dateOfBirth=${item.dateOfBirth} is already exists` };

    else {
      let index = this._customers.findIndex(x => x.email === result.email);
      console.log('index');
      console.log(index);

      this._customers[index] = item;
      this.setLocalStorage();
      return { status: 200, message: `customer firstname=${item.firstname} lastname=${item.lastname} upddated successfully` };

    }
  }



  private isExistCustomer(item: ICustomer, existItem: ICustomer | null = null) {

    return this.getLocalStorage()
      .find((p) => p.firstname.toLowerCase() === item.firstname.toLowerCase() &&
      p.lastname.toLowerCase() === item.lastname.toLowerCase() &&
      p.dateOfBirth === item.dateOfBirth &&
        (!existItem || p.email !== existItem.email )) ;
  }

  private isExistEmail(email: string, existEmail: string|null=null) {
    return this.getLocalStorage()
      .find((p) => p.email === email && (!existEmail || p.email !== existEmail)
        );
  }


  private getByEmail(email: string) {
    return this.getLocalStorage().find((p) => p.email === email);
  }


}


export default CustomerDB;
