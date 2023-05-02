import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './_modules/shared.module';

import { ErrorInterceptor } from './_interceptors/error.interceptor';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TextInputComponent } from './text-input/text-input.component';
import { A1storiesComponent } from './pages/a1stories/a1stories.component';
import { A1CoLubieRobicComponent } from './a1stories/a1-co-lubie-robic/a1-co-lubie-robic.component';
import { A2storiesComponent } from './pages/a2stories/a2stories.component';
import { B1storiesComponent } from './pages/b1stories/b1stories.component';
import { B2storiesComponent } from './pages/b2stories/b2stories.component';
import { TestComponent } from './test/test.component';
import { A1SpacerZPsemComponent } from './a1stories/a1-spacer-z-psem/a1-spacer-z-psem.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    A1storiesComponent,
    A1CoLubieRobicComponent,
    A2storiesComponent,
    B1storiesComponent,
    B2storiesComponent,
    TestComponent,
    A1SpacerZPsemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
