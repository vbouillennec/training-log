import { Injectable } from '@angular/core';
import { EXERCICES_DATA } from '../mock-exercices';
import { Exercices } from '../Exercices';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ExerciceService {
	// exercicesCollection: AngularFirestoreCollection<Exercices>;
	exercices: Observable<any[]>;

	constructor(public afs: AngularFirestore) {
		this.exercices = this.afs.collection('exercices').valueChanges();
	}

	getExercices (): Observable<Exercices[]> {
		return this.exercices;
	}
}
