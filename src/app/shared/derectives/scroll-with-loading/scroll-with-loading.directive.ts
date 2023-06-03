import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, filter, fromEvent, map, Subject, Subscription } from 'rxjs';

export enum LOADING_DIRECTION {
	UP = 'up',
	DOWN = 'down',
}

@Directive({
	selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective implements OnInit, OnDestroy {
	@Output() crossBorderEvent = new EventEmitter<LOADING_DIRECTION | null>();
	scrollSubject = new Subject<MouseEvent>();
	scrollSubscription!: Subscription;
	loadingBoundary = 100;
	ngOnInit(): void {
		this.scrollSubscription = this.scrollSubject
			.pipe(
				debounceTime(150),
				map((event) => {
					return this.modifierDirection(event);
				}),
				filter((event) => {
					return !event;
				}),
			)
			.subscribe(this.crossBorderEvent);

		fromEvent<MouseEvent>(this.elementRef.nativeElement, 'scroll').subscribe(this.scrollSubject);
	}

	ngOnDestroy(): void {
		this.scrollSubscription.unsubscribe();
	}

	modifierDirection({ target }: MouseEvent): LOADING_DIRECTION | null {
		const clientHeight = (target as Element).clientHeight;
		const scrollHeight = (target as Element).scrollHeight;
		const scrollTop = (target as Element).scrollTop;

		if (scrollHeight - scrollTop - this.loadingBoundary <= clientHeight) {
			return LOADING_DIRECTION.DOWN;
		}
		return null;
	}

	constructor(private elementRef: ElementRef) {}
}
