import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddReviewPage } from './add-review.page';

import { SafePipePipeModule } from '../pipes/safe-pipe/safe-pipe.module';

const routes: Routes = [
  {
    path: '',
    component: AddReviewPage
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
  declarations: [AddReviewPage]
})
export class AddReviewPageModule {}
