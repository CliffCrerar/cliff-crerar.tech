import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";

const MatModules = [
	MatSlideToggleModule,
	MatToolbarModule,
	MatButtonModule,
	MatCardModule,

	MatSidenavModule,
	MatIconModule
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		...MatModules
	],
	exports: MatModules
})
export class NgMaterialModule {
}
