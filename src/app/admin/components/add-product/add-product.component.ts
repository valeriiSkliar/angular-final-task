import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IProduct } from '../../../core/interfaces/iproduct';
import { LettersAndSpacesOnlyValidator } from '../../utils/LettersAndSpacesOnlyValidator';
import { LettersSpacesNumbersOnlyValidator } from '../../utils/LettersSpacesNumbersOnlyValidator';
import { checkImageValidation } from '../../utils/checkImageValidation';
import { LocalStorageService } from '../../../services/local-storage.service';
import { transliterate } from '../../utils/transliterate';

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
	product: Partial<IProduct> = {};
	images = [];
	imageCheck!: boolean;

	constructor(private fb: FormBuilder, private localStorage: LocalStorageService) {
		this.productForm = this.fb.group({
			name: ['', [Validators.required, LettersAndSpacesOnlyValidator()]],
			description: ['', [Validators.required, LettersSpacesNumbersOnlyValidator()]],
			price: ['', [Validators.required, Validators.min(0)]],
			imageUrls: this.fb.array([]),
		});
	}

	onSubmit() {
		console.log(this.productForm.value);
		this.localStorage.setListProducts({
			id: transliterate(this.productForm.value.name),
			img: this.productForm.value.name,
			name: this.productForm.value.name,
			price: this.productForm.value.price,
			description: this.productForm.value.description,
		});
		// this.productService.
	}

	async addImage(value: string) {
		await checkImageValidation(value)
			.then((data) => (this.imageCheck = data))
			.catch((data) => (this.imageCheck = data));

		if (this.imageCheck) {
			this.productForm.value.imageUrls.push(value);
			this.images = this.productForm.value.imageUrls;
		}
	}
}
