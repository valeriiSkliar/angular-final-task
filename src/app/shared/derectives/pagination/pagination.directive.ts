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
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { IPaginationContext } from './IPaginationContext';
import { getChunkArray } from './utils/getChunkArray';

@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
	@Input() appPaginationOf: T[] | null | undefined;
	@Input() appPaginationChunkSize = 4;

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroy$ = new Subject<void>();
	private chunkArray: T[][] = [];

	constructor(
		private readonly viewContainer: ViewContainerRef,
		private readonly template: TemplateRef<IPaginationContext<T>>,
	) {
		console.log('constructor');
	}

	ngOnChanges({ appPaginationOf }: SimpleChanges) {
		console.log('ngOnChanges');
		console.log(appPaginationOf);
		if (appPaginationOf) {
			this.updateView();
		}
	}

	ngOnInit() {
		console.log('ngOnInit');
		this.listenCurrentIndexChange();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private updateView() {
		console.log('updateView');
		const isViewContainerNeedClear = !this.appPaginationOf?.length;

		if (isViewContainerNeedClear) {
			this.viewContainer.clear();

			return;
		}

		this.chunkArray = getChunkArray(this.appPaginationOf as T[], this.appPaginationChunkSize);
		this.currentIndex$.next(0);
	}

	private listenCurrentIndexChange() {
		console.log('listenCurrentIndexChange');
		this.currentIndex$
			.pipe(
				map((currentIndex) => this.getCurrentContext(currentIndex)),
				takeUntil(this.destroy$),
			)
			.subscribe((context: IPaginationContext<T>) => {
				this.viewContainer.clear();
				this.viewContainer.createEmbeddedView(this.template, context);
			});
	}

	private getCurrentContext(currentIndex: number): IPaginationContext<T> {
		console.log('getCurrentContext');
		return {
			$implicit: this.chunkArray![currentIndex],
			index: currentIndex,
			appPaginationOf: this.appPaginationOf as T[],
			pageIndexes: this.chunkArray?.map((item, index) => index),
			next: () => {
				this.next();
			},
			back: () => {
				this.back();
			},
			selectedIndex: (index: number) => {
				this.selectedIndex(index);
			},
		};
	}

	private next() {
		console.log('next');
		const nextIndex = this.currentIndex$.value + 1;
		const newIndex = nextIndex < this.chunkArray!.length ? nextIndex : 0;

		this.currentIndex$.next(newIndex);
	}

	private back() {
		console.log('back');
		const previousIndex = this.currentIndex$.value - 1;
		const newIndex = previousIndex >= 0 ? previousIndex : this.chunkArray!.length - 1;

		this.currentIndex$.next(newIndex);
	}

	private selectedIndex(index: number) {
		console.log('selectedIndex');
		this.currentIndex$.next(index);
	}
}
