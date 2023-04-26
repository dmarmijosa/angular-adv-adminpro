import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { InterceptService } from './intercepts/intercept.service';


@NgModule({
  declarations: [AppComponent, NopagefoundComponent],
  imports: [AppRoutingModule, AuthModule, BrowserModule, PagesModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:InterceptService, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
