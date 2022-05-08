import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['../login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) {
		this.loginForm = this.fb.group({
			email: new FormControl('', Validators.required),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		});
	}

	ngOnInit(): void {}

	onSubmit(){
		if(this.loginForm.valid){
			const {email, password} = this.loginForm.value;
			this.auth.signInWithEmailAndPassword(email, password)
			.then(response => {
				console.log("successfully logged in: "+response.user);
				this.router.navigate(['']);
			})
			.catch(err => console.error("error loggin => "+err));
		}
	}
}
