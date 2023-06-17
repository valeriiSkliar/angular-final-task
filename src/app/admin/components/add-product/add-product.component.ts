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
	@Output() editProductSubmit = new EventEmitter<IProduct>();

	// constructor() {
	// }
	// private clientId = '328367f28cc8127';
	private clientId = '13f15558db8e43f';
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
		let id: string | undefined = this.product.id;
		if (!id) {
			id = String(Math.random() * 10);
		}
		// console.log(this.product.id)
		const { name, price, description } = addForm.value;
		this.addProductSubmit.emit({
			description: description as string,
			url: transliterate(name as string),
			id: id,
			imageUrls: this.images,
			name: name as string,
			price: price as number,
		});
		// console.log(this.product.id)
		this.images = [];
		addForm.resetForm();
	}
	editProduct(addForm: NgForm) {
		const { name, price, description } = addForm.value;
		this.addProductSubmit.emit({
			description: description as string,
			url: transliterate(name as string),
			id: this.product!.id!,
			imageUrls: this.images,
			name: name as string,
			price: price as number,
		});
		this.images = [];
		addForm.resetForm();
	}

	async imgurTest(fileList: FileList | null) {
		// const files: FileList | null = image.files;
		const url = 'https://api.imgur.com/3/image';

		if (fileList) {
			const formData = new FormData();
			const header = new Headers();
			// header.append('Authorization', 'Bearer 4345ea87cbf3733814709e2d0b7b0be4aa7c2d58');
			header.append('Authorization', ` Client-ID ${this.clientId}`);
			const requestOptions = {
				method: 'POST',
				headers: header,
				body: formData,
				referrer: '',
			};

			for (const file of Array.from(fileList)) {
				formData.append('image', file);
			}

			const result = await fetch(url, requestOptions).then((res) => res.json());
			this.images.push(result.data.link);
			console.log(result);
		}
	}
}
