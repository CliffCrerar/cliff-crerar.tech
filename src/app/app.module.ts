import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHomeComponent } from './components/ng-home/ng-home.component';
import { NgNavbarComponent } from './components/ng-navbar/ng-navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ AppComponent, NgHomeComponent, NgNavbarComponent ],
	imports: [ AppRoutingModule, FormsModule, BrowserAnimationsModule, BrowserModule, NgMaterialModule ],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
