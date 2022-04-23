import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercice } from 'src/app/Exercice';
import { ExerciceService } from 'src/app/services/exercice.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'app-trainings-table',
	templateUrl: './trainings-table.component.html',
	styleUrls: ['./trainings-table.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TrainingsTableComponent implements OnInit, OnDestroy {
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort!: MatSort;
	// @ViewChild(MatTable) table!: MatTable<Exercice>;
	public dataSource: MatTableDataSource<Exercice>;
	private subs = new Subscription();
	exo: any;
	exercices: Exercice[] = [];
	expandedElement: any;

	@Output() editExerciceEvent = new EventEmitter<string>();

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['name', 'weight', 'nbSeries', 'actions'];

	constructor(private exerciceService: ExerciceService) {
		this.dataSource = new MatTableDataSource<Exercice>();
		console.log('const');
	}

	ngOnInit(): void {
		this.subs.add(this.getAllExerciceFromDB());
		console.log('onInit');
		// this.dataSource.retrieveExercice();
	}

	ngOnDestroy(): void {
		if(this.subs) {
			this.subs.unsubscribe();
		}
	}

	// ngAfterViewInit(): void {
	// 	this.dataSource.sort = this.sort;
	// 	this.dataSource.paginator = this.paginator;
	// 	this.table.dataSource = this.dataSource;
	// }

	getAllExerciceFromDB(): void {
		this.exerciceService.getRealtimeExerciceRef().snapshotChanges().subscribe(exercicesDB => {
			this.exercices = [];
			exercicesDB.forEach(exercice => {
				this.exo = {};
				this.exo.id = exercice.key;
				this.exo.name = exercice.payload.val()?.name;
				this.exo.weight = exercice.payload.val()?.weight;
				this.exo.nbSeries = exercice.payload.val()?.nbSeries;
				this.exercices.push(this.exo);
			});
			this.dataSource = new MatTableDataSource<Exercice>(this.exercices);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		}, 
		(err: HttpErrorResponse) => {
			console.error(err);
		});
	}

	onClickEdit(key: string) {
		console.log('Edit '+key);
		const exerciceToEdit = this.exercices.find(exercice => (exercice.id === key));
		
		this.editExerciceEvent.emit(JSON.stringify(exerciceToEdit!));
	}

	onClickDelete(key: string) {
		console.log('Delete '+key);
		this.removeExercice(key);
	}

	removeExercice(key: string) {
		this.exerciceService.removeExerciceFromDB(key);
	}
}
