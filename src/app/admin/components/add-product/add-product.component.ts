import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IProduct } from '../../../core/interfaces/iproduct';
import { LettersAndSpacesOnlyValidator } from '../../utils/LettersAndSpacesOnlyValidator';
import { LettersSpacesNumbersOnlyValidator } from '../../utils/LettersSpacesNumbersOnlyValidator';
import { checkImageValidation } from '../../utils/checkImageValidation';
import { transliterate } from '../../utils/transliterate';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
	productForm!: FormGroup;
	imageForm!: FormGroup;
	product: Partial<IProduct> = {};
	images: string[] = [];
	imageCheck = false;
	isImageSubmitted = false;

	constructor(private fb: FormBuilder, private localStorage: LocalStorageService) {
		this.setDefaultForm();
	}

	setDefaultForm() {
		this.imageForm = this.fb.group({
			imageUrls: ['', Validators.required],
		});
		this.productForm = this.fb.group({
			name: ['', [Validators.required, LettersAndSpacesOnlyValidator()]],
			description: ['', [Validators.required, LettersSpacesNumbersOnlyValidator()]],
			price: ['', [Validators.required, Validators.min(0)]],
		});
		this.images = [];
	}

	onSubmit() {
		console.log(this.productForm.value);
		this.localStorage.setBooksInLocalStorage({
			id: transliterate(this.productForm.value.name),
			imageUrls: this.images,
			name: this.productForm.value.name,
			price: this.productForm.value.price,
			description: this.productForm.value.description,
		});
		this.setDefaultForm();
	}

	async addImage(value: string) {
		await checkImageValidation(value)
			.then((data: boolean) => {
				this.imageCheck = data;
				this.isImageSubmitted = true;
			})
			.catch((data: boolean) => {
				this.imageCheck = data;
				this.isImageSubmitted = true;
			});

		if (this.imageCheck) {
			this.images.push(value);
		}
	}

	async imageAddSubmit() {
		await this.addImage(this.imageForm.value.imageUrls);
	}

	inputsCheck(inputName: string) {
		return (
			(this.productForm.get(inputName)?.hasError('required') && this.productForm.get(inputName)?.touched) ||
			this.productForm.get(inputName)?.invalid
		);
	}
	imageInputsCheck(inputName: string) {
		return (
			(this.imageForm.get(inputName)?.hasError('required') && this.imageForm.get(inputName)?.touched) ||
			this.imageForm.get(inputName)?.invalid
		);
	}
}
