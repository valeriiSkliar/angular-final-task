import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import { transliterate } from '../../utils/transliterate';
import { checkImageValidation } from '../../utils/checkImageValidation';
import { NgForm, NgModel } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { MongoService } from '../../../core/services/mongo/mongo.service';

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

	constructor(public themeServise: ThemeService, private httpService: HttpClient, private mongoService: MongoService) {}

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

	async addProduct(addForm: NgForm) {
		let id: string | undefined = this.product.id;
		if (!id) {
			id = String(Math.random() * 10);
		}
		const { name, price, description } = addForm.value;

		const newProduct = {
			description: description as string,
			url: transliterate(name as string),
			id: id,
			imageUrls: this.images,
			name: name as string,
			price: price as number,
		};
		this.mongoService.addProduct(newProduct);
		this.addProductSubmit.emit(newProduct);

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
}
