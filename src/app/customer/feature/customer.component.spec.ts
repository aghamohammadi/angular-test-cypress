import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ICustomer } from './../domain/entities/interfaces/icustomer';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import CustomerDB from '../infrastructure/customer-db';
import { CustomerRepository } from '../domain/repository/customer-repository';
import CustomerService from '../domain/usecase/customer.service';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let persistence = new CustomerDB();
  let repository = new CustomerRepository(persistence);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot(),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  it('Should load all Customers', async () => {
    const customerService = new CustomerService({} as any, repository);
    const result = await customerService.getAll();
    expect(result.status).toBe(200);
  })


  it('Should remove customer', async () => {
    const newCustomer: ICustomer = {
      firstname: "Ahmad",
      lastname: "Aghamohammadi",
      email: 'ahmad.aghamohammadi@gmail.com',
      dateOfBirth: new Date('2022-12-08'),
      phoneNumber: '+442071838750',
      bankAccountNumber: '3344444444444444'
    }

    let customerService = new CustomerService(newCustomer, repository);
    await customerService.create();

    const email ='ahmad.aghamohammadi@gmail.com';
    customerService = new CustomerService({} as any, repository);
    const result = await customerService.remove(email)
    expect(result.status).toBe(200);
  })



});
