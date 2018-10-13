import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from '../rentals/list/list.component';
import { NotfoundPageComponent } from '../shell/pages/404/notfound-page.component';
import { DetailsComponent } from '../rentals/details/details.component';
import { LoginPageComponent } from '../auth/login-page/login-page.component';
import { AuthGuard } from '../auth/auth.guard';
import { DetailsGuard } from '../rentals/details/details.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/rentals', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'rentals', component: ListComponent },
  {
    path: 'rentals/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard, DetailsGuard],
  },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
