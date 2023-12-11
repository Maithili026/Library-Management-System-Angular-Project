// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: 'books', component: BookComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthComponent }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
