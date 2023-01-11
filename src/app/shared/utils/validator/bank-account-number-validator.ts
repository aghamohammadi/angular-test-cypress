import { AbstractControl, ValidatorFn } from '@angular/forms';


export function BankAccountNumberValidator(): ValidatorFn {
  return (control: AbstractControl): any => {
    let isValid = false;
    try {
      isValid = validateIranianSheba(control.value);
    } catch (e) { }

    return isValid ? null : { 'wrongIban': { value: control.value } };
  }
}




function validateIranianSheba(iban: string): boolean {

  if (iban.length !== 26) {
    return false;
  }

  const pattern = /IR[0-9]{24}/;

  if (!pattern.test(iban)) {
    return false;
  }


  return true;
}


