import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import { transliterate } from '../../utils/transliterate';
import { checkImageValidation } from '../../utils/checkImageValidation';
import { NgForm, NgModel } from '@angular/forms';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
	@Input() product: Partial<IProduct> = {
		id: '',
		imageUrls: [],
		name: '',
		price: 0,
		description: '',
	};
	currentImage!: string;

	@Input() images: string[] = [];
	imageCheck = true;
	isImageSubmitted = false;
	@Output() addProductSubmit = new EventEmitter<IProduct>();

	// constructor() {
	// }
	async imageSet(imageLink: NgModel) {
		if (this.images.length >= 3) {
			console.log(imageLink.control.invalid);
			imageLink.value.image;
			return Promise.resolve();
		}
		await this.addImage(imageLink.value);
	}
	async addImage(value: string) {
		await checkImageValidation(value)
			.then((data: boolean) => {
				this.imageCheck = data;
			})
			.catch((data: boolean) => {
				this.imageCheck = data;
			});

		if (this.imageCheck) {
			this.images.push(value);
		}
	}

	removeImage(index: number) {
		this.images.splice(index, 1);
	}

	addProduct(addForm: NgForm) {
		const { name, price, description } = addForm.value;
		console.log(name);
		console.log(price);
		console.log(description);
		this.addProductSubmit.emit({
			description: description as string,
			id: transliterate(name as string),
			imageUrls: this.images,
			name: name as string,
			price: price as number,
		});
		addForm.resetForm();
	}
}
