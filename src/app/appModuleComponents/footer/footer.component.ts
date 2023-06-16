import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

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
