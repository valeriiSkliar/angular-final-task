import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductListManagementComponent } from './components/product-list-management/product-list-management.component';

@NgModule({
	declarations: [AdminComponent, AddProductComponent, ProductListManagementComponent],
	imports: [CommonModule, SharedModule, FormsModule],
})
export class AdminModule {}
