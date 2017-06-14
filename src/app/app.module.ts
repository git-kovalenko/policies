import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { AccountFormComponent } from './account-form/account-form.component';
import {AccountService} from "./services/account.service";
import {CustomQueryEncoderHelper} from "./extends/custom-query-encoder-helper";
import {KeyValueFilterPipe} from "app/pipes/key-value-filter.pipe";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found.component";

const appRoutes: Routes = [
  {path: '', component: AccountFormComponent},
  {
    path: 'readonly',
    component: AccountFormComponent,
    data: { disableFields: 'true' }
  },
  {path: '**', component: PageNotFoundComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    PageNotFoundComponent,
    KeyValueFilterPipe

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AccountService, CustomQueryEncoderHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
