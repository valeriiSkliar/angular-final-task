import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumbersOnlyValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const forbidden = !/^[0-9]*$/.test(control.value);
		return forbidden ? { forbiddenName: { value: control.value } } : null;
	};
}
