import { UpdateComponent } from './feature/update/update.component';
import { CustomerComponent } from './feature/customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './feature/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent

  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'update/:email',
    component: UpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
