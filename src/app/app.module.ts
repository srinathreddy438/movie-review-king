import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// app rate plugin
import { AppRate } from '@ionic-native/app-rate/ngx';

import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesService } from './services/movies-service';
import { SafePipePipeModule } from './pipes/safe-pipe/safe-pipe.module';

import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users-guard';
import { AccountsService } from './services/account-service';
import { ReviewsService } from './services/review-service';
// shared module
import { SharedModule } from './shared/shared.module';

// These are all imports required for Pro Client with Monitoring & Deploy,
// feel free to merge into existing imports above.
// import { Pro } from '@ionic/pro';

// Pro.init('YOUR_APP_ID', {
//   appVersion: 'APP_VERSION'
// });

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    MomentModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    SafePipePipeModule,
    SharedModule
  ],
  exports: [],
  providers: [
    AppRate,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MoviesService,
    AccountsService,
    ReviewsService,
    OnlyLoggedInUsersGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
