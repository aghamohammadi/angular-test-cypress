import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { BankAccountNumberValidator } from 'src/app/shared/utils/validator/bank-account-number-validator';
import { PhoneNumberValidator } from 'src/app/shared/utils/validator/phone-number-validator';
import { ICustomer } from '../../domain/entities/interfaces/icustomer';
import { CustomerRepository, ICustomerPersistence } from '../../domain/repository/customer-repository';
import CustomerService from '../../domain/usecase/customer.service';
import CustomerDB from '../../infrastructure/customer-db';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public status: number = 0;
  private unsubscribe$ = new Subject();
  public customerForm!: FormGroup;
  public submitted: boolean = false;
  private persistence: ICustomerPersistence ;
  private customer!: ICustomer ;
  private repository;

  constructor(private router: Router,
    private route: ActivatedRoute, private messageService: MessageService) {
    this.persistence = new CustomerDB();
    this.repository = new CustomerRepository(this.persistence);
   }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(async (params) => {
        const email = this.route.snapshot.paramMap.get('email');
        if (email)
          await this.getItem(email);
      });
  }

  private async getItem(email:string) {
    const customerService = new CustomerService({} as any, this.repository);
    const result = await customerService.get(email);
    this.customer = result.data;
    this.initForm();
  }

  private initForm() {

    this.customerForm = new FormGroup({
      firstname: new FormControl(this.customer.firstname, [Validators.required]),
      lastname: new FormControl(this.customer.lastname, [Validators.required]),
      dateOfBirth: new FormControl(this.customer.dateOfBirth, [Validators.required]),
      phoneNumber: new FormControl(this.customer.phoneNumber, [Validators.required, PhoneNumberValidator('US')]),
      email: new FormControl({ value: this.customer.email, disabled: true }, []),
      bankAccountNumber: new FormControl(this.customer.bankAccountNumber, [Validators.required, BankAccountNumberValidator()]),
    });
  }

  public async onSubmit() {

    this.submitted = true;
    if (this.customerForm.valid) {
      const customer: ICustomer = { ...this.customerForm.value };
      customer.email = this.customer.email;

      const repository = new CustomerRepository(this.persistence)
      const customerService = new CustomerService(customer, repository);
      const result = await customerService.update();
      if (result.status==200) {
        this.messageService.add(result.message);
        this.router.navigateByUrl('/customer');
      }
      else {
        this.status = result.status;
        this.messageService.addError(result.message);

      }

    }
  }

}
