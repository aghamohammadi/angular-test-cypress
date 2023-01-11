Feature: Create Read Edit Delete Customer
  Scenario: Enter to Create Page
    Given Start to customer page
    When click create button
    Then Visit create page. Url should contain "/create"
  Scenario: Invalid email,Phone Number ,Bank Account Number, validation
    Given create page
    When User enter Email "ahmad.aghamohammadi".user will recieve a message "Please enter valid email!."
    And User enter Phone Number "66666". user will recieve a message "Please enter valid phoneNumber!."
    And User enter Bank Account Number "3453456547354". user will recieve a message "Please enter valid Iranian sheba bank Account Number."
    And User enter First Name "Ahmad" & User enter Last Name "Aghamohammadi" & User Date Of Birth "2023-01-11"
    And User click on submit button
    Then user will stay on create page "/create"

  Scenario: User Creates, Read, Edit, Delete a Customer
    Given user enter to create page
    When user creates a customer with following data
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | John      | Doe      | john@doe.com | +989121234567 | 2023-01-11  | IR225000000123456789123456 |
    Then user can get all customers and filter with below data and get "1" record
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | John      | Doe      | john@doe.com | +989121234567 | 2023-01-11  | IR225000000123456789123456 |
    When user creates a customer with following data to test duplicate FirstName,LastName,DateOfBirth error
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | john      | doe      | jane@doe.com | +989121234567 | 2023-01-11  | IR225000000123456789123456 |
    Then user must see error code "409"
    When user creates a customer with following data  to test duplicate email error
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | john2     | doe2     | john@doe.com | +989121234567 | 2023-01-10  | IR225000000123456789123456 |
    Then user must see error code "410"
    When user edit customer with new data by email of "john@doe.com"
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | Jane      | William  | john@doe.com | +442071838750 | 2022-01-11  | IR225000000123456789000456 |
    Then user can get all customers and filter with below data and get "0" record
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | John      | Doe      | john@doe.com | +989121234567 | 2023-01-11  | IR225000000123456789123456 |
    When user can get all customers and filter with below data and get "1" record
      | FirstName | LastName | Email        | PhoneNumber   | DateOfBirth | BankAccountNumber          |
      | Jane      | William  | john@doe.com | +442071838750 | 2022-01-11  | IR225000000123456789000456 |
    And user delete customer with email of "john@doe.com"
    Then user must see "0" records in customer list
