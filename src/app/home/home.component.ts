import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent {
	constructor(private listProducts: LocalStorageService) {}

	collectionBooks = this.listProducts.getListProducts();
}
