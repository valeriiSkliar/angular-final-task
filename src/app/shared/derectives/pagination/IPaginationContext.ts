export interface IPaginationContext<T> {
	$implicit: T[];
	index: number;
	appPaginationOf: T[];
	pageIndexes: number[];
	next: () => void;
	back: () => void;
	selectedIndex: (index: number) => void;
	saveIndex: (index: number) => number;
}
