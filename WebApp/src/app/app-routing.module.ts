import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './admin/components/restaurant-list/restaurant-list.component';
import { RestaurantEditComponent } from './admin/components/restaurant-edit/restaurant-edit.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'restaurants',
        component: RestaurantListComponent
      },
      {
        path: 'restaurants/:id',
        component: RestaurantEditComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin/restaurants',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
