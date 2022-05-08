import { Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercice } from 'src/app/Exercice';
import { ExerciceService } from 'src/app/services/exercice.service';

@Component({
	selector: 'app-trainings-table',
	templateUrl: './trainings-table.component.html',
	styleUrls: ['./trainings-table.component.css'],
})
export class TrainingsTableComponent implements OnInit, OnDestroy {
	@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
	@ViewChild(MatSort, {static: false}) sort!: MatSort;
	// @ViewChild(MatTable) table!: MatTable<Exercice>;
	dataSource: MatTableDataSource<Exercice>;
	@Input() data: Exercice[] = [];
	@Input() trainingID: string | undefined;
	@Input() userID: string | undefined;
	exo: any;

	@Output() editExerciceEvent = new EventEmitter<string>();
	// @Input() data: Exercice[] = [];

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['name', 'weight', 'nbSeries', 'lastUpdate', 'actions'];

	constructor(private exerciceService: ExerciceService) {
		// this.data = [];
		this.dataSource = new MatTableDataSource<Exercice>(this.data);

		// this.dataSource.sort = this.sort;
		// this.dataSource.paginator = this.paginator;
	}

	ngOnInit(): void {
		this.trainingID = this.trainingID;
		this.userID = this.userID;
		this.dataSource = new MatTableDataSource<Exercice>(this.data);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
		// console.log('destroy');
	}

	ngAfterViewInit(): void {}

	onClickEdit(key: string): void {
		let exerciceToEdit: any = this.data.find(exercice => (exercice.id === key));

		if(exerciceToEdit){
			exerciceToEdit.trainingID = this.trainingID;
			this.editExerciceEvent.emit(JSON.stringify(exerciceToEdit));
		}
	}

	onClickDelete(key: string):void {
		this.removeExercice(key);
	}

	removeExercice(key: string): void {
		if(this.userID)
			this.exerciceService.removeExerciceFromDB(this.userID, key, this.trainingID!);
	}

	public getDate(timestamp: number): string {
		if(!timestamp)
			return '';
		return new Date(timestamp).toLocaleDateString();
	}
}
