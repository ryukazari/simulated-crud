import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomMaterialModule } from "./core-angular-material/material.module";
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalConfirmationComponent } from './shared/modal-confirmation/modal-confirmation.component';
import { InitPageComponent } from './routes/init-page/init-page.component';
import { MatChipsModule } from '@angular/material/chips';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatStepperModule} from '@angular/material/stepper';
import { ModalEditarPostComponent } from './routes/init-page/modal-editar-post/modal-editar-post.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalConfirmationComponent,
    InitPageComponent,
    ModalEditarPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    RecaptchaModule,
    NgxMatSelectSearchModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: RECAPTCHA_LANGUAGE, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
