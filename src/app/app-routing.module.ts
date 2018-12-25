import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home-page', loadChildren: './home/home.module#HomePageModule' },
  { path: 'movies', loadChildren: './movies/movies.module#MoviesPageModule' },
  { path: 'add-review', loadChildren: './add-review/add-review.module#AddReviewPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '**', loadChildren: './home/home.module#HomePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
