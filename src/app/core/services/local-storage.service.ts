import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { MongoService } from './mongo.service';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	// private listProducts: IProduct[] = [
	// 	{
	// 		id: '1',
	// 		name: '1984',
	// 		url: '1',
	// 		price: 650,
	// 		description: 'Dystopian novel by George Orwell, written in 1948',
	// 		imageUrls: [
	// 			'https://anylang.net/sites/default/files/covers/1984.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '2',
	// 		name: 'Ulysses',
	// 		url: '2',
	// 		price: 800,
	// 		description: 'A novel by James Joyce considered one of the greatest works of the 20th century',
	// 		imageUrls: [
	// 			'https://s1.livelib.ru/boocover/1001174789/o/b504/Dzhejms_Dzhojs__Uliss.jpeg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '3',
	// 		name: 'Master and Margarita',
	// 		price: 750,
	// 		url: '3',
	// 		description: 'A novel by Mikhail Bulgakov, one of the greatest works of the 20th century',
	// 		imageUrls: [
	// 			'https://bizlit.com.ua/image/cache/data/images10/kniga-master-i-margarita-8-600x800.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '4',
	// 		name: 'Count of Monte Cristo',
	// 		price: 700,
	// 		url: '4',
	// 		description: 'A novel by Alexandre Dumas about love, betrayal and revenge of the protagonist',
	// 		imageUrls: [
	// 			'https://s1.livelib.ru/boocover/1002217446/o/518c/Aleksandr_Dyuma__Graf_MonteKristo.jpeg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '5',
	// 		name: "Harry Potter and the Philosopher's Stone",
	// 		price: 550,
	// 		url: '5',
	// 		description: 'The first book in the J.K. Rowling series about the young wizard Harry Potter',
	// 		imageUrls: [
	// 			'https://staticlb.rmr.rocks/uploads/pics/02/08/358.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '6',
	// 		name: 'Pride and Prejudice',
	// 		price: 250,
	// 		url: '6',
	// 		description:
	// 			'Through the prism of the stories of the main characters, Jane Austen shows how important it is to choose love over financial well-being',
	// 		imageUrls: [
	// 			'https://bookzip.ru/uploads/posts/2019-11/1572596318_978-5-389-01460-2.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '7',
	// 		name: 'The Great Gatsby',
	// 		price: 380,
	// 		url: '7',
	// 		description: 'In the center of the plot is a love story with a detective and tragic ending',
	// 		imageUrls: [
	// 			'https://images.booksense.com/images/250/839/9781954839250.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '8',
	// 		name: 'Gone With the Wind',
	// 		price: 630,
	// 		url: '8',
	// 		description:
	// 			'The novel covers events over 12 years (from 1861 to 1873), developing against the backdrop of a civil war between the northern industrial and southern agricultural states of America',
	// 		imageUrls: [
	// 			'https://content1.rozetka.com.ua/goods/images/original/122942591.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '9',
	// 		name: 'Churchill factor',
	// 		price: 630,
	// 		url: '9',
	// 		description:
	// 			'The book by Boris Johnson is a story about those, like the eccentric genius of Churchill, Prime Minister of Great Britain, one of the most important leaders of the 20th century, who shaped the politics of the world',
	// 		imageUrls: [
	// 			'https://laboratoria.pro/files/products/cherchil.1800x1200.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '10',
	// 		name: 'Green light',
	// 		price: 630,
	// 		url: '10',
	// 		description:
	// 			'The book of the movie theater and the Oscar-winning actor Matthew McConaughey blew the books away before his departure from the world. I teach readers to learn the lessons, which gave them life, and to change, which is on the right - not in overcoming success, but in the fact that you take these lessons',
	// 		imageUrls: [
	// 			'https://i.ebayimg.com/images/g/rxUAAOSw-KdhLfWO/s-l1200.webp',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '11',
	// 		name: 'Three comrades',
	// 		price: 487,
	// 		url: '11',
	// 		description:
	// 			'Three friends - Robbie, a desperate racing driver Kester and "the last romantic" Lenz went through the First World War. After returning to civilian life, they founded a small car repair shop',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/338/33800/33800/w240h400-0cdb782c.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '12',
	// 		name: 'The Picture of Dorian Grey',
	// 		price: 324,
	// 		url: '12',
	// 		description:
	// 			'"The Picture of Dorian Gray" is one of the greatest works of the last century and a half, a novel that was tried to be banned, and the author was condemned for "indecent behavior"',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/298/29818/29818/w240h400-375f12c7.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '13',
	// 		name: 'A little prince',
	// 		price: 255,
	// 		url: '13',
	// 		description:
	// 			'The Little Prince is an allegorical story, the most famous work of Antoine de Saint-Exupery. The drawings in the book are made by the author himself and are no less famous than the book itself',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/293/29327/29327/w240h400-7e9028bd.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '14',
	// 		name: 'Dandelion wine',
	// 		price: 155,
	// 		url: '14',
	// 		description:
	// 			'Enter the bright world of a twelve-year-old boy and live one summer with him, filled with joyful and sad, mysterious and disturbing events; summer, when amazing discoveries are made every day, the main of which is that you are alive, you breathe, you feel! Dandelion Wine by Ray Bradbury is a classic work that has entered the golden fund of world literature',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/336/33689/33689/w240h400-362ce3c1.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '15',
	// 		name: 'Anna Karenina',
	// 		price: 399,
	// 		url: '15',
	// 		description:
	// 			'A brilliant novel by Leo Tolstoy, which does not leave indifferent anyone who has read it. The drama of life, female self-destructive love, the search for oneself and the formation of personality - all in the traditions of Russian classics',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/292/29215/29215/w240h400-a332a7a0.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '16',
	// 		name: 'To Kill a Mockingbird',
	// 		price: 422,
	// 		url: '16',
	// 		description:
	// 			'About To Kill a Mockingbird (1960) is the poignant story of a family living in a fictional small town in the American South, in the state of Alabama. The time of action is the 30s of the XX century, the period of the Great Depression',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/296/29607/29607/w240h400-6ff8c566.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '17',
	// 		name: 'One hundred years of solitude',
	// 		price: 575,
	// 		url: '17',
	// 		description:
	// 			'A strange, poetic, bizarre story of the city of Macondo, lost somewhere in the jungle - from creation to decline. The story of the Buendia family - a family in which miracles are so everyday that they do not even pay attention to them',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/292/29264/29264/w240h400-e67f1263.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '18',
	// 		name: 'The twelve Chairs',
	// 		price: 335,
	// 		url: '18',
	// 		description:
	// 			"The famous feuilleton novel by I. Ilf and E. Petrov “The Twelve Chairs” was first published in 1928, and today it is called among the cult works of Russian literature of the 20th century. The story of two swindlers who set off in search of Madame Petukhova's diamonds is always a hit with readers",
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/291/29197/29197/w240h400-e33d061b.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '19',
	// 		name: 'Fight club',
	// 		price: 499,
	// 		url: '19',
	// 		description:
	// 			'This is the most amazing and most scandalous book of the 1990s. A book in which, through the mouth of Chuck Palahniuk, not just "Generation X" spoke, but - "Generation X" is already embittered, has already lost its last illusions. Have you seen the movie "Fight Club"? Then read the book it was based on',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/339/33934/33934/w240h400-6a64b44c.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '20',
	// 		name: 'Martian',
	// 		price: 199,
	// 		url: '20',
	// 		description:
	// 			'Andy Weir has been working as a software engineer since the age of fifteen. He is fond of studying relativistic physics, orbital mechanics, and the history of manned astronautics. The Martian is his first novel',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/296/29660/29660/w240h400-052973e8.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '21',
	// 		name: 'Harry Potter and the Order of the Phoenix',
	// 		price: 170,
	// 		url: '21',
	// 		description:
	// 			'“You perceive the thoughts and emotions of the Black Lord. The director thinks this should be stopped. He wanted me to teach you how to block your mind." Dark times have come at Hogwarts. After the Dementors attacked his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/303/30396/30396/w240h400-2543ffa6.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '22',
	// 		name: 'Harry Potter And The Chamber of secrets',
	// 		price: 250,
	// 		url: '22',
	// 		description:
	// 			'"Conspiracy, Harry Potter. Conspiracy - this year at Hogwarts, the school of witchcraft and witchcraft, terrible things will happen. Harry Potter summer consisted of the worst birthday of his life, grim warnings from a house elf named Dobby, and being rescued from the Dursleys when his friend Ron Weasley arrived to fetch him in a magical flying machine',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/303/30393/30393/w240h400-e3396e7d.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '23',
	// 		name: 'Alchemist',
	// 		price: 550,
	// 		url: '23',
	// 		description:
	// 			'This amazing book by Paulo Coelho inspires readers all over the world. Combining the simplicity of strength with the inspiration of wisdom, this story tells of a young Andalusian shepherd named Santiago',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/341/34165/34165/w240h400-c381a916.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '24',
	// 		name: 'Harry Potter and the prisoner of Azkaban',
	// 		price: 339,
	// 		url: '24',
	// 		description:
	// 			'When the Grand Olet rumbles out of the darkness and screeches to a halt in front of Harry Potter, the boy begins another school year at Hogwarts that is by no means ordinary. Sirius Black, a mass murderer and supporter of Lord Voldemort, has escaped from prison and is said to be hunting Harry',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/303/30394/30394/w240h400-32df7652.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '25',
	// 		name: 'Game of Thrones',
	// 		price: 310,
	// 		url: '25',
	// 		description:
	// 			'Epic, chased saga about the world of the Seven Kingdoms. About the world of harsh lands of eternal cold and joyful lands of eternal summer. A world of lords and heroes, warriors and mages, warlocks and assassins - all who have been brought together by Fate in fulfillment of an ancient prophecy',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/293/29392/29392/w240h400-270cad6a.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '26',
	// 		name: 'Harry Potter and the Goblet of Fire',
	// 		price: 131,
	// 		url: '26',
	// 		description:
	// 			'The Triwizard Tournament is being held at Hogwarts. Only wizards who have reached the age of seventeen are allowed to participate, but this does not prevent Harry from dreaming of victory',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/303/30395/30395/w240h400-5e6c5100.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '27',
	// 		name: 'The Old Man and the Sea',
	// 		price: 466,
	// 		url: '27',
	// 		description:
	// 			'The story is dedicated to "tragic stoicism": in the face of the cruelty of the world, a person, even losing, must maintain courage and dignity. The image of a fierce fight with a monstrous fish, and then with sharks devouring it, successfully contrasts with reflections on the past, about the world around',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/336/33645/33645/w240h400-25990964.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '28',
	// 		name: 'Lord of the Rings',
	// 		price: 368,
	// 		url: '28',
	// 		description:
	// 			'The Lord of the Rings is an epic novel by the English writer J. R. R. Tolkien, the most famous work of the fantasy genre. Tales of Middle-earth is a chronicle of the Great War for the Ring, a war that lasted for more than one thousand years. The one who owned the Ring received power over all living creatures, but was obliged to serve evil',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/292/29295/29295/w240h400-0cce0aa2.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '29',
	// 		name: 'Harry Potter and Half Blood Prince',
	// 		price: 743,
	// 		url: '29',
	// 		description:
	// 			"When Dumbledore arrives at Privet Street one summer night to pick up Harry, the boy sees that the Headmaster's right hand has turned black and dry, but the reasons for this remain a mystery. Secrets and suspicions are spreading throughout the wizarding world, and even Hogwarts is no longer safe",
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/303/30397/30397/w240h400-f84f24bf.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// 	{
	// 		id: '30',
	// 		name: 'Perfumer',
	// 		price: 415,
	// 		url: '30',
	// 		description:
	// 			'The brilliant and enigmatic "Perfumer" by Patrick Suskind was first printed in Switzerland in 1985. Today it is recognized as the most famous novel written in German since Remarques "All Quiet on the Western Front", published in more than 12 million copies, including Latin, and finally filmed',
	// 		imageUrls: [
	// 			'https://readrate.com/img/pictures/book/324/32403/32403/w240h400-18bfba0f.jpg',
	// 			'https://etoretro.ru/data/media/1963/151127876481d.jpg',
	// 			'https://img.freepik.com/premium-vector/book-cover-template-realistic-mockup-of-blank-white-hardcover-isolated-on-white-background_533410-1038.jpg',
	// 		],
	// 	},
	// ];

	private listProducts: IProduct[] = [];
	listCart!: object;

	constructor(private http: HttpClient, private mongoService: MongoService) {
		this.listProducts = this.mongoService.listProducts!;
		// if (!localStorage.getItem('ListBooks')) {
		// 	localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
		// 	this.listProducts = JSON.parse(localStorage.getItem('ListBooks')!);
		// }
		if (String(localStorage.getItem('ListCart')) === 'null') {
			localStorage.setItem('ListCart', JSON.stringify({}));
			this.listCart = JSON.parse(localStorage.getItem('ListCart')!);
		}
	}

	// ngOnInit() {
	// 	// Fetch data asynchronously
	// 	this.mongoService.fetchData().then((data) => {
	//   // Handle the data response
	//   console.log('Data:', data);
	// }).catch((error) => {
	//   // Handle any errors
	//   console.error('Error:', error);
	// });

	// // Continue executing other tasks while waiting for the response
	// console.log('Other tasks...');
	// }

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
		this.listProducts = this.mongoService.listProducts!;
		// this.mongoService.fetchData().then((data) => {
		// 	//console.log('Data:', data);
		// 	this.listProducts = data;
		// 	return this.listProducts;
		// }).catch((error) => {
		// 	console.error('Error:', error);
		// })
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
