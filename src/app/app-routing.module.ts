import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/landing-layout/landing-layout.module').then(
        (m) => m.LandingLayoutModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
