import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgHomeComponent } from './components/ng-home/ng-home.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: NgHomeComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
