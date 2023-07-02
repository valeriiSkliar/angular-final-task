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
import { ThemeService } from '../../../core/services/theme.service';

@Directive({
	selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
	@Input() appPaginationOf: T[] | null | undefined;
	@Input() appPaginationChunkSize = 4;
	@Input() appPaginationCurrentIndex = 0;

	private readonly currentIndex$ = new BehaviorSubject<number>(0);
	private readonly destroy$ = new Subject<void>();
	private chunkArray: T[][] = [];

	constructor(
		private readonly viewContainer: ViewContainerRef,
		private readonly themeService: ThemeService,
		private readonly template: TemplateRef<IPaginationContext<T>>,
	) {}

	ngOnChanges({ appPaginationOf }: SimpleChanges) {
		if (appPaginationOf) {
			this.updateView();
		}
	}

	ngOnInit() {
		this.listenCurrentIndexChange();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private updateView() {
		const isViewContainerNeedClear = !this.appPaginationOf?.length;

		if (isViewContainerNeedClear) {
			this.viewContainer.clear();

			return;
		}

		this.chunkArray = getChunkArray(this.appPaginationOf as T[], this.appPaginationChunkSize);
		this.currentIndex$.next(this.themeService.getIndex());
	}

	private listenCurrentIndexChange() {
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
		return {
			$implicit: this.chunkArray?.[currentIndex],
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
			saveIndex: (index: number) => {
				return this.saveIndex(index);
			},
		};
	}

	private next() {
		const nextIndex = this.currentIndex$.value + 1;
		const newIndex = nextIndex < this.chunkArray?.length ? nextIndex : 0;
		this.saveIndex(newIndex);
		this.currentIndex$.next(newIndex);
		this.scrollPageUp();
	}

	private back() {
		const previousIndex = this.currentIndex$.value - 1;
		const newIndex = previousIndex >= 0 ? previousIndex : this.chunkArray?.length - 1;
		this.saveIndex(newIndex);
		this.currentIndex$.next(newIndex);
		this.scrollPageUp();
	}

	private selectedIndex(index: number) {
		this.currentIndex$.next(index);
		this.saveIndex(index);
		this.scrollPageUp();
	}

	scrollPageUp() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
	saveIndex(index: number) {
		this.themeService.saveIndex(index);
		return index;
	}
}
