import { Exercice } from "./Exercice";

export interface Training {
	name: string;
	id?: string;
	exercices: Exercice[];
}