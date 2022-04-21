import { Component, OnInit } from '@angular/core';
import { ExerciceService } from '../../services/exercice.service';
import { Exercices } from '../../Exercices';

@Component({
	selector: 'app-trainings',
	templateUrl: './trainings.component.html',
	styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
	fakeExercices: Exercices[] = [];
	isLoading: boolean = true;

	constructor(private exerciceService: ExerciceService) { }

	ngOnInit(): void {
		this.exerciceService.getExercices().subscribe((exercices) => {
			console.log(exercices);
			this.fakeExercices = exercices;
			if(this.fakeExercices?.length > 0)
				this.isLoading = false;
		});
	}

	onClick() {
		console.log('Add');
	}

}
