import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateTrendingVideosPage } from './create-trending-videos.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTrendingVideosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateTrendingVideosPage]
})
export class CreateTrendingVideosPageModule {}
