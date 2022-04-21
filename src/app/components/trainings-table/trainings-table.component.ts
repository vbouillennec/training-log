import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TrainingsTableDataSource, TrainingsTableItem } from './trainings-table-datasource';

@Component({
	selector: 'app-trainings-table',
	templateUrl: './trainings-table.component.html',
	styleUrls: ['./trainings-table.component.css']
})
export class TrainingsTableComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<TrainingsTableItem>;
	dataSource: TrainingsTableDataSource;

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['exercice', 'weight', 'nbSeries', 'actions'];

	constructor() {
		this.dataSource = new TrainingsTableDataSource();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	onClickEdit(id: number) {
		console.log('Edit '+id);
	}

	onClickDelete(id: number) {
		console.log('Delete '+id);
	}
}
