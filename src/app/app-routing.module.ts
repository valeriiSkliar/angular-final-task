import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { Page404Component } from './appModuleComponents/page404/page404.component';
import { CheckoutComponent } from './cart/components/checkout/checkout.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'product-page/:id', component: ProductComponent },
	{
		path: 'cart',
		component: CartComponent,
		children: [
			{
				path: 'checkout',
				component: CheckoutComponent,
			},
		],
	},

	{
		path: 'admin',
		component: AdminComponent,
	},
	{
		path: '**',
		component: Page404Component,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
