import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TrainingsTableComponent } from './components/trainings-table/trainings-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    TrainingsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatFormFieldModule,
	MatInputModule,
	MatSidenavModule,
	MatDividerModule,
	MatIconModule,
	MatProgressSpinnerModule,
	AngularFireModule.initializeApp(environment.firebase),
	AngularFirestoreModule,
  ],
  providers: [
	{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
