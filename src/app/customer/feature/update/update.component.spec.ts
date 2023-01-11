import { ToastrModule } from 'ngx-toastr';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'src/app/core/services/message.service';
import { ICustomer } from '../../domain/entities/interfaces/icustomer';
import { CustomerRepository } from '../../domain/repository/customer-repository';
import CustomerService from '../../domain/usecase/customer.service';
import CustomerDB from '../../infrastructure/customer-db';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let persistence = new CustomerDB();
  let repository = new CustomerRepository(persistence);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],
      imports: [RouterTestingModule, ToastrModule.forRoot(),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load Customer', async () => {

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

    customerService = new CustomerService({} as any, repository);
    const result = await customerService.get('ahmad.aghamohammadi@gmail.com');
    expect(result.status).toBe(200);
  })


  it('Should update an Customer', async () => {
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


    const updateCustomer: ICustomer = {
      firstname: "Ahmad2",
      lastname: "Aghamohammadi2",
      email: 'ahmad.aghamohammadi@gmail.com',
      dateOfBirth: new Date('2022-12-08'),
      phoneNumber: '+442071838750',
      bankAccountNumber: '3344444444444444'
    }

    customerService = new CustomerService(updateCustomer, repository);
    const result = await customerService.update();
    expect(result.status).toBe(200);
  })
});
