import { ICustomer } from './../../domain/entities/interfaces/icustomer';
import { PhoneNumberValidator } from './../../../shared/utils/validator/phone-number-validator';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerRepository, ICustomerPersistence } from '../../domain/repository/customer-repository';
import CustomerDB from '../../infrastructure/customer-db';
import CustomerService from '../../domain/usecase/customer.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { BankAccountNumberValidator } from 'src/app/shared/utils/validator/bank-account-number-validator';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public customerForm!: FormGroup;
  public submitted: boolean=false;
  public status: number=0;
  private persistence: ICustomerPersistence;

  constructor(private router: Router, private messageService: MessageService,
) {
    this.persistence = new CustomerDB();

  }

  ngOnInit(): void {
    this.initForm();

  }


  private initForm() {

    this.customerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, PhoneNumberValidator('US')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl(null, [Validators.required, BankAccountNumberValidator()]),
    });
  }


  public async onSubmit() {
    this.submitted = true;
    if (this.customerForm.valid) {

      const customer:ICustomer= {...this.customerForm.value};

      const repository = new CustomerRepository(this.persistence)
      const customerService = new CustomerService(customer, repository);
      const result = await customerService.create();

      if (result.status == 200) {
        this.messageService.add(result.message);
        this.router.navigateByUrl('/customer');
      }
      else{
          this.status = result.status;
          this.messageService.addError(result.message);

      }
    }
  }

}
