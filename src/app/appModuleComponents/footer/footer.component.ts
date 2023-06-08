import { Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
	licenseAgreement = true;
	protected readonly open = open;

	openAgreements() {
		this.licenseAgreement = !this.licenseAgreement;
	}
}
