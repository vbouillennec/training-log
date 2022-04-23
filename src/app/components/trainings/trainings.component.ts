import { Component, OnInit } from '@angular/core';
import { Exercice } from 'src/app/Exercice';
import { ExerciceService } from 'src/app/services/exercice.service';

@Component({
	selector: 'app-trainings',
	templateUrl: './trainings.component.html',
	styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
	newExercice: Exercice = {
		name: '',
		weight: 0,
		nbSeries: 0,
	}
	inEditMode: boolean = false;

	constructor(private exerciceService: ExerciceService) { }

	ngOnInit(): void {}

	onCancel() {
		console.log('cancel');
		this.inEditMode = false;
		this.emptyTheFields();
	}

	onReset() {
		console.log('reset');
	}

	onSave() {
		console.log('save');
		if (this.newExercice.name.length > 0 && this.newExercice.weight > 0 && this.newExercice.nbSeries > 0) {
			this.exerciceService.updateExerciceFromDB(this.newExercice.id!, {
				name: this.newExercice.name,
				weight: this.newExercice.weight,
				nbSeries: this.newExercice.nbSeries,
			});

			this.inEditMode = false;
			this.emptyTheFields();
		}
	}

	onSubmit() {
		console.log('submit');
		if (this.newExercice.name.length > 0 && this.newExercice.weight > 0 && this.newExercice.nbSeries > 0) {
			this.addExercice();
			this.emptyTheFields();
		}
	}

	addExercice() {
		this.exerciceService.addNewExerciceToDB(this.newExercice);
	}

	editExercice(event: string){
		this.inEditMode = true;
		console.log('editExo : ', JSON.parse(event));
		this.newExercice = JSON.parse(event);
	}

	emptyTheFields() {
		this.newExercice = {
			name: '',
			weight: 0,
			nbSeries: 0,
		}
	}
}
