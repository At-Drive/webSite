import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingLayoutComponent } from './landing-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: '', component: LandingLayoutComponent }];

@NgModule({
  declarations: [LandingLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LandingLayoutModule {}
