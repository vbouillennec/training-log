import { Injectable } from '@angular/core';
import { Exercice } from '../Exercice';
import { Training } from '../Training';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, of } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ExerciceService {
	private dbPath = '/exercices';
	exercicesRef: AngularFireList<Exercice>;

	constructor(private db: AngularFireDatabase, public firestore: AngularFirestore) {
		this.exercicesRef = db.list(this.dbPath);
	}

	getRealtimeExerciceRef(): AngularFireList<Exercice> {
		return this.exercicesRef;
	}

	getExercicesFromTraining(trainingKey: string): Observable<SnapshotAction<any>[]> {
		return this.db.list('trainings/'+trainingKey+'/exercices').snapshotChanges();
	}

	addNewExerciceToDB(exercice: Exercice, trainingKey: string): void {
		this.db.list('trainings/'+trainingKey+'/exercices').push(exercice)
		.then(_ => console.log("successfully created"))
		.catch(err => "error creating => "+err);
	}

	removeExerciceFromDB(exerciceKey: string, trainingKey: string): void {
		this.db.list('trainings/'+trainingKey+'/exercices').remove(exerciceKey)
		.then(_ => console.log("successfully removed"))
		.catch(err => "error removing => "+err);
	}

	updateExerciceFromDB(exerciceKey: string, trainingKey: string, newValues: Exercice): void {
		this.db.list('trainings/'+trainingKey+'/exercices').update(exerciceKey, newValues)
		.then(_ => console.log("successfully updated"))
		.catch(err => console.error("error updating => "+err));
	}
}

