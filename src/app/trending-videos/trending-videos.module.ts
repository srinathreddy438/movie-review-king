import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SafePipePipeModule } from '../pipes/safe-pipe/safe-pipe.module';
import { IonicModule } from '@ionic/angular';
import { TrendingVideosPage } from './trending-videos.page';

const routes: Routes = [
  {
    path: '',
    component: TrendingVideosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafePipePipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrendingVideosPage]
})
export class TrendingVideosPageModule {}
