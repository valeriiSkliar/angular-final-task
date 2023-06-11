export interface ObjComments {
	text: string;
	date: string;
	name: string;
}

export interface IComments {
	id: string;
	comments: ObjComments[];
}
