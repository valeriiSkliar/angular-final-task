import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartIconComponent } from './components/cartIcon/cart-icon.component';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [CartComponent, CartIconComponent, CartItemComponent],
	imports: [CommonModule, RouterLink, FormsModule, SharedModule],
	exports: [CartIconComponent],
})
export class CartModule {}
