import { AbstractControl, ValidatorFn } from '@angular/forms';

export function LettersSpacesNumbersOnlyValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const forbidden = !/^[a-zA-Z0-9\s]*$/.test(control.value);
		return forbidden ? { forbiddenName: { value: control.value } } : null;
	};
}
