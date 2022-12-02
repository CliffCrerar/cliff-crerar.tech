import { Component, ElementRef, OnInit } from '@angular/core';

// import {NgNavbarComponent} from "./components/ng-navbar/ng-navbar.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	ngNavbarComponent!: ElementRef;
	mainStyles: NgMainTagStyles;

	constructor() {
		this.mainStyles = this.assignStyles();
	}

	ngOnInit() {
		console.log(this.constructor.name, ' On Init');

		this.ngNavbarComponent = new ElementRef(
			document.getElementsByTagName('mat-toolbar')[ 0 ]
		);
		console.log(this.ngNavbarComponent);
	}

	assignStyles(): NgMainTagStyles {
		return {
			height: '100vh',
			width: '100vw',
			minHeight: '100vh'
		};
	}
}
