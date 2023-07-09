import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface INotificationContent<T> {
	template: TemplateRef<T>;
	context: T;
}

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	private readonly notificationTemplateStore$ = new BehaviorSubject<INotificationContent<object> | null | any>(null);

	readonly notificationTemplate$ = this.notificationTemplateStore$.asObservable();

	closeNotification() {
		this.notificationTemplateStore$.next(null);
	}

	showNotification<T extends object>(notificationContent: { template: TemplateRef<T> | null; context: T }) {
		this.notificationTemplateStore$.next(notificationContent);
	}
}
