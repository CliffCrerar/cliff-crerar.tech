import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgMaterialModule} from "./ng-material/ng-material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgHomeComponent } from './ng-home/ng-home.component';
import { NgNavbarComponent } from './ng-home/ng-navbar/ng-navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
	  AppComponent,
	  NgHomeComponent,
   NgNavbarComponent
  ],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		NgMaterialModule,
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
