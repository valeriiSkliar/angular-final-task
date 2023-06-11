export interface IProduct {
	// [key: string]: string | string[] | number;
	[key: string]: any;
	id: string;
	url: string;
	name: string;
	description: string;
	price: number;
	imageUrls: string[];
}
