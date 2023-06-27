import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartIconComponent } from './components/cartIcon/cart-icon.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [CartComponent, CartIconComponent, CartItemComponent, CheckoutComponent],
	imports: [CommonModule, RouterLink, FormsModule, SharedModule, RouterOutlet, HttpClientModule],
	exports: [CartIconComponent, CheckoutComponent],
})
export class CartModule {}
