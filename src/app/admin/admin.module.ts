import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [AddProductComponent, AdminComponent],
	imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class AdminModule {}
