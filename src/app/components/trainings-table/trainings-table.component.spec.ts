import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { TrainingsTableComponent } from './trainings-table.component';

describe('TrainingsTableComponent', () => {
	let component: TrainingsTableComponent;
	let fixture: ComponentFixture<TrainingsTableComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ TrainingsTableComponent ],
			imports: [
				NoopAnimationsModule,
				MatPaginatorModule,
				MatSortModule,
				MatTableModule,
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TrainingsTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should compile', () => {
		expect(component).toBeTruthy();
	});
});
