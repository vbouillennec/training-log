import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from "@angular/material/input";

@Component({
	selector: 'delete-dialog',
	templateUrl: './delete-dialog.component.html',
	// styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<DeleteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {response: boolean},
	) {
	}

	onNoClick() {
		console.log('no click');
		this.dialogRef.close();
	}
}
