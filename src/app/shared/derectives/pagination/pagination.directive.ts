import {
	Directive,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { IPaginationContext } from './IPaginationContext';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { getChunkArray } from './utils/getChunkArray';
@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
	@Input() appPaginationOf: T[] | null | undefined;
	@Input() appPaginationChunkSize = 3;

	private chunkArray: T[][] = [];
	private readonly currentIndex = new BehaviorSubject<number>(0);
	private readonly destroy = new Subject<void>();

	constructor(
		private readonly viewContainer: ViewContainerRef,
		private readonly template: TemplateRef<IPaginationContext<T>>,
	) {
		console.log(this.appPaginationOf);
	}

	back() {
		const previousIndex = this.currentIndex.value - 1;
		const index = previousIndex >= 0 ? previousIndex : this.chunkArray.length - 1;
		this.currentIndex.next(index);
	}

	next() {
		const nextIndex = this.currentIndex.value + 1;
		const index = nextIndex < this.chunkArray.length ? nextIndex : 0;
		this.currentIndex.next(index);
	}

	ngOnChanges({ appPaginationOf, appPaginationChunkSize }: SimpleChanges): void {
		if (appPaginationChunkSize || appPaginationOf) {
			this.updateView();
		}
	}

	ngOnDestroy(): void {
		this.destroy.next();
		this.destroy.complete();
	}

	ngOnInit(): void {
		this.chunkArray = getChunkArray(this.appPaginationOf as T[], this.appPaginationChunkSize);
		console.log(this.chunkArray);
		this.listenCurrentIndex();
	}

	private updateView() {
		const isViewContainerNeedClear = !this.appPaginationOf?.length;

		if (isViewContainerNeedClear) {
			this.viewContainer.clear();

			return;
		}

		this.chunkArray = getChunkArray(this.appPaginationOf as T[], this.appPaginationChunkSize);
		console.log(this.chunkArray);

		this.currentIndex.next(0);
	}

	private listenCurrentIndex() {
		this.currentIndex
			.pipe(
				map((currentIndex) => this.getCurrentContext(currentIndex)),
				takeUntil(this.destroy),
			)
			.subscribe((context: IPaginationContext<T>) => {
				this.viewContainer.clear();
				this.viewContainer.createEmbeddedView(this.template, context);
			});
	}

	private getCurrentContext(currentIndex: number): IPaginationContext<T> {
		return {
			$implicit: this.chunkArray[currentIndex],
			index: currentIndex,
			appPaginationOf: this.appPaginationOf as T[],
			pageIndexes: this.chunkArray.map((_, index) => index),
			next: () => {
				this.next();
			},
			back: () => {
				this.back();
			},
			selectedIndex: (index: number) => {
				return this.selectedIndex(index);
			},
		};
	}

	private selectedIndex(index: number) {
		this.currentIndex.next(index);
	}
}
