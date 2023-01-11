import { MessageService } from 'src/app/core/services/message.service';
import { CustomerRepository, ICustomerPersistence } from './../domain/repository/customer-repository';
import { Component, OnInit } from '@angular/core';
import CustomerDB from '../infrastructure/customer-db';
import CustomerService from '../domain/usecase/customer.service';
import { ICustomer } from '../domain/entities/interfaces/icustomer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  private persistence;
  private repository;
  public customers: ICustomer[] = [];

  constructor(private messageService: MessageService) {
      this.persistence= new CustomerDB();
      this.repository = new CustomerRepository(this.persistence);
   }

  ngOnInit(): void {
    this.getAll();
  }


  private async getAll() {
    const customerService = new CustomerService({} as any, this.repository);
    const result = await customerService.getAll();
    this.customers = result.data;
  }

  async onRemove(email:string) {
    const customerService = new CustomerService({} as any, this.repository);
    const result = await customerService.remove(email)
    if (result.status===200) {
      this.messageService.add(`Customer ${email}  remomved successfully.`);
      await this.getAll();
    }
    else{
      this.messageService.addError(`Error to remove Customer ${email}`);

    }
  }

}
