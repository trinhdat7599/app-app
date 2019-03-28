import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './user/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './user/register/register.module#RegisterPageModule' },
  { path: 'main', canActivate: [AuthGuard], loadChildren: './chat/main/main.module#MainPageModule' },
  { path: 'yourinfo', loadChildren: './yourinfo/yourinfo.module#YourinfoPageModule' },
  { path: 'total', loadChildren: './total/total.module#TotalPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
