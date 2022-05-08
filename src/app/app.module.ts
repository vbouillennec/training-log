import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog.component';
import { LoginComponent } from './components/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    TrainingsTableComponent,
	DeleteDialogComponent,
 	LoginComponent,
  	RegisterComponent,
  ],
  imports: [
	MatProgressSpinnerModule,
	AngularFireModule.initializeApp(environment.firebase),
	AngularFirestoreModule,
	AngularFireDatabaseModule,

    BrowserModule,
    BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatFormFieldModule,
	MatInputModule,
	MatSidenavModule,
	MatDividerModule,
	MatSelectModule,
	MatDialogModule,
	MatIconModule,
	MatDatepickerModule,
	MatMomentDateModule,
 AppRoutingModule,
  ],
  providers: [
	{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
	{provide: MAT_DATE_LOCALE, useValue: 'fr'},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
