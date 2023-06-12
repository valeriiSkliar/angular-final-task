import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
	selector: 'app-scroll-button',
	templateUrl: './scroll-button.component.html',
	styleUrls: ['./scroll-button.component.css'],
})
export class ScrollButtonComponent implements OnInit {
	isScrolling = false;
	noScrolling = true;
	timerId = setTimeout(() => {
		console.log('timer');
	}, 0);
	closeTop = false;
	closeBottom = false;

	@ViewChild('windowScroll') windowScroll!: ElementRef;
	@HostListener('window:scroll', [])
	onWindowScroll() {
		if (window.scrollY > 0) {
			this.isScrolling = true;
			this.noScrolling = false;
			this.closeTop = false;
			clearTimeout(this.timerId);
		} else {
			this.isScrolling = false;
			this.noScrolling = true;
			this.closeBottom = false;
			this.resetScrollingState();
		}
	}

	resetScrollingState() {
		if (this.timerId) {
			clearTimeout(this.timerId);
			this.timerId = setTimeout(() => {
				this.closeTop = true;
			}, 3000);
		}
	}

	scrollPageUp() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		this.closeBottom = true;
	}

	scrollPageDown() {
		window.scrollTo({
			top: window.innerHeight,
		});
		clearTimeout(this.timerId);
		this.isScrolling = true;
		this.closeBottom = false;
	}

	ngOnInit() {
		this.resetScrollingState();
	}
}