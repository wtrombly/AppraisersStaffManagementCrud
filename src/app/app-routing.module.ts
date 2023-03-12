import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisersViewComponent } from './views/appraisers-view/appraisers-view.component';
import { OrdersViewComponent } from './views/orders-view/orders-view.component';
import { ClientsViewComponent } from './views/clients-view/clients-view.component';


const routes: Routes = [
  { path: 'orders', component: OrdersViewComponent },
  { path: 'clients', component: ClientsViewComponent },
  { path: 'appraisers', component: AppraisersViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
