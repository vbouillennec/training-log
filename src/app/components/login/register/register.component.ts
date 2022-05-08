import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;

	constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) {
		this.registerForm = this.fb.group({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl('', [
				Validators.required, 
				Validators.minLength(6)
			]),
		});
	}

	ngOnInit(): void {}

	onSubmit(){
		if(this.registerForm.valid){
			console.log(this.registerForm.value);
			const {email, password} = this.registerForm.value;
			this.auth.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log("successfully registered : "+user);
				this.router.navigate(['']);
			})
			.catch(err => console.error("error loggin => "+err));;
		}
	}
}
