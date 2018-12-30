import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SafePipePipe } from './safe-pipe.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [SafePipePipe],
  exports: [SafePipePipe],
})
export class SafePipePipeModule {}
