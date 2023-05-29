import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListManagementComponent } from './product-list-management.component';

describe('ProductListManagementComponent', () => {
	let component: ProductListManagementComponent;
	let fixture: ComponentFixture<ProductListManagementComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductListManagementComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ProductListManagementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
