import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './features/service-guard/auth.guard';
import { productGuard } from './features/service-guard/product.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'product_list',
    loadChildren: () =>
      import('./features/product-list/product-list.module').then(
        (m) => m.ProductListModule
      ),
      canActivate: [productGuard],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./features/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'order_list',
    loadChildren: () =>
      import('./features/order-list/order-list.module').then(
        (m) => m.OrderListModule
      ),
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.module').then(
        (m) => m.WeatherModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
