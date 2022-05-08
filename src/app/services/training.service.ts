import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Training } from '../Training';

@Injectable({
	providedIn: 'root'
})
export class TrainingService {
	private dbPath = '/trainings';
	// trainingsRef: AngularFireList<Training>;

	constructor(private db: AngularFireDatabase, public firestore: AngularFirestore) {
		// this.trainingsRef = db.list(this.dbPath);
	}

	// getRealtimeTrainingRef(): AngularFireList<Training> {
	// 	return this.trainingsRef;
	// }

	getAllUserTrainings(userID: string): AngularFireList<Training> {
		return this.db.list(`${this.dbPath}/${userID}`);
	}

	addNewTrainingToDB(userID: string, training: Training): void {
		this.db.list(`${this.dbPath}/${userID}`).push(training).then(_ => console.log("successfully created"))
		.catch(err => "error creating => "+err);
	}

	removeTrainingFromDB(userID: string, key: string): void {
		this.db.list(`${this.dbPath}/${userID}`).remove(key)
		.then(_ => console.log("successfully removed"))
		.catch(err => "error removing => "+err);
	}

	// updateTrainingFromDB(key: string, newValues: object): void {
	// 	this.trainingsRef.update(key, newValues)
	// 	.then(_ => console.log("successfully updated"))
	// 	.catch(err => "error updating => "+err);
	// }
}
