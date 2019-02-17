import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users-guard';

const routes: Routes = [
  // { path: '', loadChildren: './home/home.module#HomePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  // { path: 'home-page', loadChildren: './home/home.module#HomePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'movies/:category', loadChildren: './movies/movies.module#MoviesPageModule', canActivate: [OnlyLoggedInUsersGuard]},
  {
    path: 'movies/:category/:id',
    loadChildren: './add-review/add-review.module#AddReviewPageModule',
    canActivate: [OnlyLoggedInUsersGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'add-movie', loadChildren: './add-movie/add-movie.module#AddMoviePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'update-movie/:id', loadChildren: './add-movie/add-movie.module#AddMoviePageModule', canActivate: [OnlyLoggedInUsersGuard]},
  { path: 'trending-videos', loadChildren: './trending-videos/trending-videos.module#TrendingVideosPageModule' },
  {
    path: 'create-trending-videos',
    loadChildren: './trending-videos/create-trending-videos/create-trending-videos.module#CreateTrendingVideosPageModule'
  },
  {
    path: 'update-trending-videos/:id',
    loadChildren: './trending-videos/create-trending-videos/create-trending-videos.module#CreateTrendingVideosPageModule'
  },
  { path: 'photos', loadChildren: './photos/photos.module#PhotosPageModule' },
  { path: 'create-photos', loadChildren: './photos/create-photos/create-photos.module#CreatePhotosPageModule' },
  { path: 'update-photos/:id', loadChildren: './photos/create-photos/create-photos.module#CreatePhotosPageModule' },
  // { path: '**', loadChildren: './home/home.module#HomePageModule' },
  { path: '**', redirectTo: 'movies/playing', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
