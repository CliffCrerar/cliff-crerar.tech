import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-ng-navbar',
  templateUrl: './ng-navbar.component.html',
  styleUrls: ['./ng-navbar.component.scss']
})
export class NgNavbarComponent implements OnInit, AfterViewInit {

	@Input() ngNavbarComponent!: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
	  console.log(this.ngNavbarComponent	)
  }

  ngAfterViewInit() {
	  console.log(this.ngNavbarComponent	)
  }

}
