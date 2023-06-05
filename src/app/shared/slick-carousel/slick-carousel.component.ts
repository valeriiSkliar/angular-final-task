import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-slick-carousel',
	templateUrl: './slick-carousel.component.html',
	styleUrls: ['./slick-carousel.component.css'],
})
export class SlickCarouselComponent {
	@Input() slides = [{ img: 'http://placehold.it/350x150/000000' }];
	slideConfig = {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		pauseOnHover: true,
	};

	addSlide() {
		this.slides.push({ img: 'http://placehold.it/350x150/777777' });
	}

	removeSlide() {
		this.slides.length = this.slides.length - 1;
	}

	slickInit(e: any) {
		console.log('slick initialized');
	}

	breakpoint(e: any) {
		console.log('breakpoint');
	}

	afterChange(e: any) {
		console.log('afterChange');
	}

	beforeChange(e: any) {
		console.log('beforeChange');
	}
}
