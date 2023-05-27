import { Injectable } from '@angular/core';

export interface Product {
	id: string;
	img: string;
	name: string;
	price: number;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private listProducts: Product[] = [
		{
			id: '1',
			name: 'Книга "1984"',
			price: 650,
			description: 'Роман-антиутопия Джорджа Оруэлла, написанный в 1948 году.',
			img: 'https://anylang.net/sites/default/files/covers/1984.jpg',
		},
		{
			id: '2',
			name: 'Книга "Улисс"',
			price: 800,
			description: 'Роман Джеймса Джойса, считающийся одним из величайших произведений XX века.',
			img: 'https://s1.livelib.ru/boocover/1001174789/o/b504/Dzhejms_Dzhojs__Uliss.jpeg',
		},
		{
			id: '3',
			name: 'Книга "Мастер и Маргарита"',
			price: 750,
			description: 'Роман Михаила Булгакова, одно из величайших произведений XX века.',
			img: 'https://bizlit.com.ua/image/cache/data/images10/kniga-master-i-margarita-8-600x800.jpg',
		},
		{
			id: '4',
			name: 'Книга "Граф Монте-Кристо"',
			price: 700,
			description: 'Роман Александра Дюма о любви, предательстве и мести главного героя.',
			img: 'https://s1.livelib.ru/boocover/1002217446/o/518c/Aleksandr_Dyuma__Graf_MonteKristo.jpeg',
		},
		{
			id: '5',
			name: 'Книга "Гарри Поттер и философский камень"',
			price: 550,
			description: 'Первая книга серии Дж. К. Роулинг о юном волшебнике Гарри Поттере.',
			img: 'https://staticlb.rmr.rocks/uploads/pics/02/08/358.jpg',
		},
		{
			id: '6',
			name: 'Книга "Гордость и предубеждение"',
			price: 250,
			description:
				'Через призму историй главных героев, Джейн Остин показывает, насколько важно выбирать любовь, а не финансовое благополучие.',
			img: 'https://bookzip.ru/uploads/posts/2019-11/1572596318_978-5-389-01460-2.jpg',
		},
		{
			id: '7',
			name: 'Книга "Великий Гэтсби"',
			price: 380,
			description: 'В центре сюжета — любовная история с детективной и трагической развязкой.',
			img: 'https://cdn.eksmo.ru/v2/ITD000000000907401/COVER/cover1__w600.jpg',
		},
		{
			id: '8',
			name: 'Книга "Унесённые ветром"',
			price: 630,
			description:
				'Роман охватывает события на протяжении 12 лет (с 1861 по 1873 годы), развивающиеся на фоне гражданской войны между северными промышленными и южными земледельческими штатами Америки.',
			img: 'https://content1.rozetka.com.ua/goods/images/original/122942591.jpg',
		},
	];

	listReverse = this.listProducts.reverse();

	getListProducts() {
		return this.listReverse;
	}

	setListProducts(product: Product) {
		this.listProducts.push(product);
	}
}
