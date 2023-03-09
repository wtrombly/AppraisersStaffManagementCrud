import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisersViewComponent } from './appraisers-view/appraisers-view.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';


const routes: Routes = [
  { path: 'orders', component: OrdersViewComponent },
  { path: 'appraisers', component: AppraisersViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
