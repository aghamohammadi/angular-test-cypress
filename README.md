
# Angular CRUD with e2e cypress & cucumber and unit tests 

Create a simple CRUD application with Angular that implements the below model:
```
Customer {
	Firstname
	Lastname
	DateOfBirth
	PhoneNumber
	Email
	BankAccountNumber
}
```

## Practices and patterns:

- [TDD](https://angular.io/guide/testing)
- [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)
- [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)



### Validations

- During Create; validate the phone number to be a valid *mobile* number only (use [Google LibPhoneNumber](https://github.com/google/libphonenumber) to validate mobile number).

- A Valid email and a valid account number must be checked before submitting the form.

- Create a Browser local storage in to store list of customers.

- Customers must be unique in database: By `Firstname`, `Lastname` and `DateOfBirth`.

- Email must be unique in the local storage or memory array



## Running application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via cypress & cucmber.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
