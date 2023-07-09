import { Injectable, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { extractProducts, MongoService } from './mongo/mongo.service';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private listProducts: IProduct[] = [
		{
			id: '1',
			name: '1984',
			url: '1',
			price: 650,
			description: 'Dystopian novel by George Orwell, written in 1948',
			imageUrls: [
				'https://anylang.net/sites/default/files/covers/1984.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '2',
			name: 'Ulysses',
			url: '2',
			price: 800,
			description: 'A novel by James Joyce considered one of the greatest works of the 20th century',
			imageUrls: [
				'https://s1.livelib.ru/boocover/1001174789/o/b504/Dzhejms_Dzhojs__Uliss.jpeg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '3',
			name: 'Master and Margarita',
			price: 750,
			url: '3',
			description: 'A novel by Mikhail Bulgakov, one of the greatest works of the 20th century',
			imageUrls: [
				'https://bizlit.com.ua/image/cache/data/images10/kniga-master-i-margarita-8-600x800.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '4',
			name: 'Count of Monte Cristo',
			price: 700,
			url: '4',
			description: 'A novel by Alexandre Dumas about love, betrayal and revenge of the protagonist',
			imageUrls: [
				'https://s1.livelib.ru/boocover/1002217446/o/518c/Aleksandr_Dyuma__Graf_MonteKristo.jpeg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '5',
			name: "Harry Potter and the Philosopher's Stone",
			price: 550,
			url: '5',
			description: 'The first book in the J.K. Rowling series about the young wizard Harry Potter',
			imageUrls: [
				'https://staticlb.rmr.rocks/uploads/pics/02/08/358.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '6',
			name: 'Pride and Prejudice',
			price: 250,
			url: '6',
			description:
				'Through the prism of the stories of the main characters, Jane Austen shows how important it is to choose love over financial well-being',
			imageUrls: [
				'https://bookzip.ru/uploads/posts/2019-11/1572596318_978-5-389-01460-2.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '7',
			name: 'The Great Gatsby',
			price: 380,
			url: '7',
			description: 'In the center of the plot is a love story with a detective and tragic ending',
			imageUrls: [
				'https://images.booksense.com/images/250/839/9781954839250.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '8',
			name: 'Gone With the Wind',
			price: 630,
			url: '8',
			description:
				'The novel covers events over 12 years (from 1861 to 1873), developing against the backdrop of a civil war between the northern industrial and southern agricultural states of America',
			imageUrls: [
				'https://content1.rozetka.com.ua/goods/images/original/122942591.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '9',
			name: 'Churchill factor',
			price: 630,
			url: '9',
			description:
				'The book by Boris Johnson is a story about those, like the eccentric genius of Churchill, Prime Minister of Great Britain, one of the most important leaders of the 20th century, who shaped the politics of the world',
			imageUrls: [
				'https://laboratoria.pro/files/products/cherchil.1800x1200.jpg',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
		{
			id: '10',
			name: 'Green light',
			price: 630,
			url: '10',
			description:
				'The book of the movie theater and the Oscar-winning actor Matthew McConaughey blew the books away before his departure from the world. I teach readers to learn the lessons, which gave them life, and to change, which is on the right - not in overcoming success, but in the fact that you take these lessons',
			imageUrls: [
				'https://i.ebayimg.com/images/g/rxUAAOSw-KdhLfWO/s-l1200.webp',
				'https://etoretro.ru/data/media/1963/151127876481d.jpg',
				'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
			],
		},
	];
	// private listProducts: IProduct[] | null = null;

	listCart!: object;

	constructor(private mongoService: MongoService) {
		this.mongoService.productsCollection
			.pipe(
				tap((value) => {
					this.listProducts = extractProducts(value);
				}),
			)
			.subscribe();
		// if (!localStorage.getItem('ListBooks')) {
		// 	localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
		// 	this.listProducts = JSON.parse(localStorage.getItem('ListBooks')!);
		// }
		if (String(localStorage.getItem('ListCart')) === 'null') {
			localStorage.setItem('ListCart', JSON.stringify({}));
			this.listCart = JSON.parse(localStorage.getItem('ListCart')!);
		}
	}

	setBooksInLocalStorage(product: IProduct) {
		const checkProductID = this.listProducts.find((item) => {
			return item.id === product.id;
		});
		if (!checkProductID) {
			this.listProducts.push(product);
		}
		localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
	}

	getBooksInLocalStorage() {
		// const localStorageItem = localStorage.getItem('ListBooks');
		// if (localStorageItem) {
		// 	this.listProducts = JSON.parse(localStorageItem);
		// }
		this.listProducts.forEach((book) => {
			if (book.imageUrls.length === 0) {
				book.imageUrls.push('./assets/no-photo.png');
			}
		});
		return this.listProducts;
	}

	saveAfterRemove() {
		localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
	}

	removeBook(id: string) {
		this.listProducts.forEach((element) => {
			if (element.id === id) {
				const index = this.listProducts.indexOf(element);
				this.listProducts.splice(index, 1);
				this.saveAfterRemove();
			}
		});
	}

	setCartToLocalStorage(cartItems: { [productId: string]: { product: IProduct; quantity: number } }) {
		localStorage.setItem('ListCart', JSON.stringify(cartItems));
	}

	getCartInLocalStorage() {
		return (this.listCart = JSON.parse(localStorage.getItem('ListCart')!));
	}

	getTotalBooksCount() {
		return this.listProducts.length;
	}

	getBooksByIds(ids: string[]): IProduct[] {
		if (ids.length) {
			return this.listProducts.filter((book) => ids.includes(book.id));
		} else {
			const randomIndex = Math.floor(Math.random() * this.listProducts.length);
			return [this.listProducts[randomIndex]];
		}
	}
}
