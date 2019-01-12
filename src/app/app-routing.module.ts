import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users-guard';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'home-page', loadChildren: './home/home.module#HomePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'movies', loadChildren: './movies/movies.module#MoviesPageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'movies/:id', loadChildren: './add-review/add-review.module#AddReviewPageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'add-movie', loadChildren: './add-movie/add-movie.module#AddMoviePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'update-movie/:id', loadChildren: './add-movie/add-movie.module#AddMoviePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'trending-videos', loadChildren: './trending-videos/trending-videos.module#TrendingVideosPageModule' },
  {
    path: 'create-trending-videos',
    loadChildren: './trending-videos/create-trending-videos/create-trending-videos.module#CreateTrendingVideosPageModule'
  },
  { path: '**', loadChildren: './home/home.module#HomePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
