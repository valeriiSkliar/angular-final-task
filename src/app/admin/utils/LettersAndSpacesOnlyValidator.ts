import { AbstractControl, ValidatorFn } from '@angular/forms';

export function LettersAndSpacesOnlyValidator(): ValidatorFn {
	// change variable type
	return (control: AbstractControl): { [key: string]: unknown } | null => {
		const forbidden = !/^[a-zA-Z\s]*$/.test(control.value);
		return forbidden ? { forbiddenName: { value: control.value } } : null;
	};
}
