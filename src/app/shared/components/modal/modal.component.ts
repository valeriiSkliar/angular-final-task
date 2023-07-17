import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
	constructor(public themeServise: ThemeService) {}

	@Input() showPopup = false;
	@Output() closeModal = new EventEmitter<boolean>();

	@Input() set insertTemplateView(template: TemplateRef<Element> | null) {
		this.insertPopupContent(template);
	}

	@ViewChild('viewport', { read: ViewContainerRef, static: true })
	private readonly viewPortContainer!: ViewContainerRef;

	private insertPopupContent(template: TemplateRef<unknown> | null) {
		this.viewPortContainer.clear();
		if (template) {
			this.showPopup = true;
			this.viewPortContainer.createEmbeddedView(template);
		} else {
			this.showPopup = false;
			this.closeModal.emit(this.showPopup);
		}
	}

	close() {
		this.insertPopupContent(null);
	}
}
