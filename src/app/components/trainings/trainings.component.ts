import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercice } from 'src/app/Exercice';
import { ExerciceService } from 'src/app/services/exercice.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import "moment/locale/fr";
import { FormControl } from '@angular/forms';
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

@Component({
	selector: 'app-trainings',
	templateUrl: './trainings.component.html',
	styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
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

	constructor(private exerciceService: ExerciceService, private trainingService: TrainingService, public dialog: MatDialog) {
		this.dataSource = new MatTableDataSource<Exercice>();
		this.pullExercices = new MatTableDataSource<Exercice>();
	}

	ngOnInit(): void {
		// this.subs.add(this.getAllExerciceFromDB());
		// this.subs.add(this.getExercicesFromTraining('-N0_mAWRfTUB2ZqUm-b5'));
		this.subs.add(this.getAllTrainings());
		
	}

	ngOnDestroy(): void {
		if(this.subs) {
			this.subs.unsubscribe();
		}
	}

	getAllTrainings(): void {
		this.trainingService.getAllTrainingsRef().snapshotChanges()
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

	onCancel() {
		this.inEditMode = false;
		this.emptyTheFields();
	}

	onReset() {}

	onSave() {
		if (this.newExercice.name.length > 0 && this.newExercice.weight > 0 && this.newExercice.nbSeries > 0) {
			this.exerciceService.updateExerciceFromDB(this.newExercice.id!, this.trainingSelected, {
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
		this.exerciceService.addNewExerciceToDB(this.newExercice, trainingKey);
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
		console.log(this.newTraining);
		this.trainingService.addNewTrainingToDB(this.newTraining);
	}

	deleteTraining(trainingKey: string | undefined) {
		console.log('delete ',trainingKey);
		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {response: this.response}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('dialog closed: ', result);
			if(result && trainingKey){
				this.trainingService.removeTrainingFromDB(trainingKey);
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
}
