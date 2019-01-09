import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// interceptor
import { InterceptorModule } from './interceptor/index';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        InterceptorModule
    ],
    exports: [],
    providers: []
})

export class SharedModule { }
