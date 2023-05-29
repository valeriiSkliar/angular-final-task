import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

export function checkImageValidation(value: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const validImage = new Image();

		validImage.onload = () => resolve(true);
		validImage.onerror = () => reject(false);
		validImage.src = value;
	});
}

export function checkImageAsyncValidation(isSubmitted: boolean): AsyncValidatorFn {
	return (control: AbstractControl): Promise<ValidationErrors | null> => {
		if (!isSubmitted) {
			return Promise.resolve(null);
		}

		return new Promise((resolve) => {
			const validImage = new Image();

			validImage.onload = () => resolve(null);
			validImage.onerror = () => resolve({ invalidImage: true });
			validImage.src = control.value;
		});
	};
}
