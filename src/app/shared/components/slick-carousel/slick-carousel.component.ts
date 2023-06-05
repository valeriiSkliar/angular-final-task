import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-slick-carousel',
	templateUrl: './slick-carousel.component.html',
	styleUrls: ['./slick-carousel.component.css'],
})
export class SlickCarouselComponent implements OnInit {
	@Input() slides = [{ img: '/assets/no-photo.png' }];
	slideConfig = {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		pauseOnHover: true,
	};

	ngOnInit(): void {
		if (!this.slides.length) {
			this.slides.push({ img: '/assets/no-photo.png' });
		}
	}
}
