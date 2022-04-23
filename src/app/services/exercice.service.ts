import { Injectable } from '@angular/core';
import { EXERCICES_DATA } from '../mock-exercices';
import { Exercice } from '../Exercice';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, of } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ExerciceService {
	// exercicesCollection: AngularFirestoreCollection<Exercice>;
	private dbPath = '/exercices';
	exercicesRef: AngularFireList<Exercice>;
	// exercices: Observable<any[]>;

	// constructor(public firestore: AngularFirestore) {
	// 	// this.exercicesRef = this.afs.collection('exercices');
	// }

	constructor(private db: AngularFireDatabase) {
		this.exercicesRef = db.list(this.dbPath);
		// this.getExerciceRef();
	}

	// getExercice (): Observable<Exercice[]> {
	// 	return this.exercices;
	// }

	getRealtimeExerciceRef(): AngularFireList<Exercice> {
		return this.exercicesRef;
	}

	addNewExerciceToDB(exercice: Exercice): void {
		this.exercicesRef.push(exercice).then(_ => console.log("successfully created"))
		.catch(err => "error creating => "+err);
	}

	removeExerciceFromDB(key: string): void {
		this.exercicesRef.remove(key)
		.then(_ => console.log("successfully removed"))
		.catch(err => "error removing => "+err);
	}

	updateExerciceFromDB(key: string, newValues: object): void {
		this.exercicesRef.update(key, newValues)
		.then(_ => console.log("successfully updated"))
		.catch(err => "error updating => "+err);
	}

	// getExerciceRef() {
	// 	return this.db.list(this.dbPath).snapshotChanges().subscribe(actions => {
	// 			console.log(actions[0].payload.val());
	// 	});
	// }
}

