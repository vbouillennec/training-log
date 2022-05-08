import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { TrainingsComponent } from './components/trainings/trainings.component';

const redirectLoggedInToTrainings = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
	{ 
		path: '', 
		component: TrainingsComponent, 
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
	},
	{ 
		path: 'login', 
		component: LoginComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectLoggedInToTrainings }
	},
	{ 
		path: 'register', 
		component: RegisterComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectLoggedInToTrainings }
	},
	// { path: '', redirectTo: '/trainings', pathMatch: 'full' },
];

@NgModule({
  imports: [
	RouterModule.forRoot(routes)
  ],
  exports: [
	  RouterModule
  ]
})
export class AppRoutingModule { }
