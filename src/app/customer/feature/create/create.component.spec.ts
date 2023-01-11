import { ToastrModule } from 'ngx-toastr';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICustomer } from '../../domain/entities/interfaces/icustomer';
import { CustomerRepository } from '../../domain/repository/customer-repository';
import CustomerService from '../../domain/usecase/customer.service';
import CustomerDB from '../../infrastructure/customer-db';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'src/app/core/services/message.service';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let persistence = new CustomerDB();
  let repository = new CustomerRepository(persistence);

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [RouterTestingModule, ToastrModule.forRoot(),],
      declarations: [CreateComponent],
      providers: [{
        provide: MessageService,

      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create an Customer', async () => {
    const customer: ICustomer = {
      firstname: "Ahmad",
      lastname: "Aghamohammadi",
      email: 'ahmad.aghamohammadi@gmail.com',
      dateOfBirth: new Date('2022-12-08'),
      phoneNumber: '+442071838750',
      bankAccountNumber: '4444444444444444'
    }

    const customerService = new CustomerService(customer, repository);
    const item = await customerService.get(customer.email);
    if(item)
      await customerService.remove(customer.email);
    const result = await customerService.create();
    expect(result.status).toBe(200);
  })
});
