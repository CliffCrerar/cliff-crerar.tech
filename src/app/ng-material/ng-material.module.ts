import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";

const MatModules = [
	MatSlideToggleModule,
	MatToolbarModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	  ...MatModules
  ],
	exports: MatModules
})
export class NgMaterialModule { }
