import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Exercice } from 'src/app/Exercice';
import { ExerciceService } from 'src/app/services/exercice.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Training } from 'src/app/Training';
import { TrainingService } from 'src/app/services/training.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog.component';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-trainings',
	templateUrl: './trainings.component.html',
	styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
	userID: string | undefined;
	newExercice: Exercice = {
		name: '',
		weight: 0,
		nbSeries: 0,
		lastUpdate: Date.now(),
	};
	trainingSelected = '0';
	newTraining: Training = {
		name: '',
		exercices: [],
	}
	trainings: Training[] = [];
	inEditMode: boolean = false;
	response: boolean = true;
	datePicked: Moment = moment();

	public dataSource: MatTableDataSource<Exercice>;
	public pullExercices: MatTableDataSource<Exercice>;
	private subs = new Subscription();

	constructor(
		private exerciceService: ExerciceService, 
		private trainingService: TrainingService, 
		public dialog: MatDialog,
		private auth: AngularFireAuth, 
		private router: Router
	) {
		this.dataSource = new MatTableDataSource<Exercice>();
		this.pullExercices = new MatTableDataSource<Exercice>();
		this.auth.authState.subscribe(user => {
			if(user) {
				this.userID = user.uid;
				this.subs.add(this.getAllTrainings());
			}
		});
	}

	ngOnInit(): void {
		// this.subs.add(this.getAllExerciceFromDB());
		// this.subs.add(this.getExercicesFromTraining('-N0_mAWRfTUB2ZqUm-b5'));
	}

	ngOnDestroy(): void {
		if(this.subs) {
			this.subs.unsubscribe();
		}
	}

	getAllTrainings(): void {
		if (this.userID) {
			this.trainingService.getAllUserTrainings(this.userID).snapshotChanges()
			.subscribe((trainings) => {
				this.trainings = [];
				trainings.forEach(training => {
					let exos: Exercice[] = [];
					if(training.payload.val()?.exercices) {
						exos = Object.values(training.payload.val()!.exercices);
						exos.forEach((exercice, index) => {
							exercice.id = Object.keys(training.payload.val()!.exercices)[index];
						});
					}
					const train: Training = {
						id: training.key!,
						name: training.payload.val()!.name,
						exercices: exos,
					};
					this.trainings.push(train);
				});
			});
		}
	}

	onCancel() {
		this.inEditMode = false;
		this.emptyTheFields();
	}

	onReset() {}

	onSave() {
		if (this.userID && this.newExercice.name.length > 0 && this.newExercice.weight > 0 && this.newExercice.nbSeries > 0) {
			this.exerciceService.updateExerciceFromDB(this.userID, this.newExercice.id!, this.trainingSelected, {
				name: this.newExercice.name,
				weight: this.newExercice.weight,
				nbSeries: this.newExercice.nbSeries,
				lastUpdate: this.newExercice.lastUpdate
			});

			this.inEditMode = false;
			this.emptyTheFields();
		}
	}

	onSubmit() {		
		if (this.newExercice.name.length > 0 && this.newExercice.weight > 0 && this.newExercice.nbSeries > 0 && this.trainingSelected !== '0') {
			this.addExercice(this.trainingSelected);
			this.emptyTheFields();
		}
	}

	onTrainingSubmit() {
		
		if (this.newTraining.name.length > 0) {
			this.addTraining();
			// this.addExercice('-N0_mAWRfTUB2ZqUm-b5');
			// this.emptyTheFields();
		}
	}

	onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
		event.value 
		? this.newExercice.lastUpdate = event.value!.valueOf() 
		: null;
	}

	addExercice(trainingKey: string) {
		if(this.userID)
			this.exerciceService.addNewExerciceToDB(this.userID, this.newExercice, trainingKey);
	}

	editExercice(event: string){
		this.inEditMode = true;
		console.log('edit, ',event);
		const tmpExercice = JSON.parse(event);
		this.trainingSelected = tmpExercice.trainingID;
		this.newExercice = {
			id: tmpExercice.id,
			name: tmpExercice.name,
			weight: tmpExercice.weight,
			nbSeries: tmpExercice.nbSeries,
			lastUpdate: Date.now(),
		}
		this.datePicked = moment();
		
		// console.log('editExo : ', JSON.parse(event));
		// this.newExercice = JSON.parse(event);
	}

	addTraining() {
		console.log(this.userID, this.newTraining);
		if (this.userID) {
			this.trainingService.addNewTrainingToDB(this.userID, this.newTraining);
			this.newTraining.name = '';
		}
	}

	deleteTraining(trainingKey: string | undefined) {
		console.log('delete ',trainingKey);
		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {response: this.response}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('dialog closed: ', result);
			if(result && trainingKey && this.userID){
				this.trainingService.removeTrainingFromDB(this.userID, trainingKey);
			}
		});
	}

	emptyTheFields() {
		this.trainingSelected = '';
		this.datePicked = moment();
		this.newExercice = {
			name: '',
			weight: 0,
			nbSeries: 0,
			lastUpdate: Date.now(),
		}
	}

	onLogout() {
		this.auth.signOut()
		.then(() => {
			console.log("successfully logged out");
			this.userID = undefined;
			this.router.navigate(['login']);
		})
		.catch(err => console.error("error loggout => "+err));
	}
}
