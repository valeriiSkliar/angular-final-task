import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css'],
	animations: [
		trigger('openClose', [
			state(
				'open',
				style({
					transform: 'translateX(-50px)',
					opacity: 1,
				}),
			),
			state(
				'closed',
				style({
					transform: 'translateX(0px)',
					opacity: 0,
				}),
			),
			transition('open => closed', [animate('0.3s')]),
			transition('closed => open', [animate('0.5s')]),
		]),
	],
})
export class NotificationComponent implements OnChanges {
	@Input() message: string | null | undefined = null; // the message to display
	@Input() type!: 'success' | 'error' | 'info' | null; // the type of the notification
	// @Output() dismiss = new EventEmitter<void>(); // event emitted when notification is dismissed
	hide = true;
	timestamp: string | null = new Date().toTimeString().split('G')[0];
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		this.timestamp = null;
		console.log('ngOnChanges');
		if (changes['message'] && changes['type'].currentValue) {
			this.hide = false;
			this.timestamp = new Date().toTimeString().split('G')[0];
			setTimeout(() => {
				this.hide = true;
				this.message = null;
			}, 3000);
		}
	}

	// onDismiss() {
	// 	this.timestamp = null;
	// 	this.dismiss.emit();
	// }
}
