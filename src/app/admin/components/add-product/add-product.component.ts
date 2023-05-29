import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IProduct } from '../../../core/interfaces/iproduct';
import { LettersAndSpacesOnlyValidator } from '../../utils/LettersAndSpacesOnlyValidator';
import { LettersSpacesNumbersOnlyValidator } from '../../utils/LettersSpacesNumbersOnlyValidator';
import { checkImageValidation } from '../../utils/checkImageValidation';
import { transliterate } from '../../utils/transliterate';
import { LocalStorageService } from '../../../core/services/local-storage.service';

export interface Product {
	id: string;
	img: string;
	name: string;
	price: number;
	description: string;
}

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
	productForm: FormGroup;
	imageForm: FormGroup;
	product: Partial<IProduct> = {};
	images: string[] = [];
	imageCheck = false;
	isImageSubmitted = false;

	constructor(private fb: FormBuilder, private localStorage: LocalStorageService) {
		this.imageForm = this.fb.group({
			imageUrls: ['', Validators.required],
		});
		this.productForm = this.fb.group({
			name: ['', LettersAndSpacesOnlyValidator()],
			description: ['', LettersSpacesNumbersOnlyValidator()],
			price: ['', Validators.min(0)],
		});
	}

	onSubmit() {
		console.log(this.productForm.value);
		this.localStorage.setListProducts({
			id: transliterate(this.productForm.value.name),
			imageUrls: this.images,
			name: this.productForm.value.name,
			price: this.productForm.value.price,
			description: this.productForm.value.description,
		});
		// this.isSubmitted = true;
		// this.productService.
	}

	async addImage(value: string) {
		await checkImageValidation(value)
			.then((data: boolean) => {
				this.imageCheck = !data;
				this.isImageSubmitted = true;
			})
			.catch((data: boolean) => {
				this.imageCheck = data;
				this.isImageSubmitted = true;
			});

		if (this.isImageSubmitted) {
			this.images.push(value);
			console.log(this.images);
			// this.images = this.imageForm.value.imageUrls;
		}
	}

	async imageAddSubmit() {
		this.isImageSubmitted = true;
		// console.log(this.imageForm.value.imageUrls)
		// console.log(this.images)
		await this.addImage(this.imageForm.value.imageUrls);
	}

	inputsCheck(inputName: string) {
		return (
			(this.productForm.get(inputName)?.hasError('required') && this.productForm.get(inputName)?.touched) ||
			this.productForm.get(inputName)?.invalid
		);
	}
}
