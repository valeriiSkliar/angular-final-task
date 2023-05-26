import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartIconComponent } from './components/cartIcon/cart-icon.component';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [CartComponent, CartIconComponent, CartItemComponent],
	imports: [CommonModule, RouterLink, FormsModule],
	exports: [CartIconComponent],
})
export class CartModule {}
