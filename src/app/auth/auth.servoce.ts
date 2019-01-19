import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Shared } from '../shared/sharedcode.module';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
    shared = new Shared();
    token: string;

    constructor(private router: Router){

    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            (error) => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(
            (error) => {
                console.log(error);
                this.shared.alert("Hmm...", "Invalid Credential", "warning");
            }
        )
        .then(
            (response) => {
                try{
                    firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);                
                    if(response['user'] != undefined){
                        this.shared.alert("Yay!", "Succesfully Authenticated", "success");
                        console.log(response);
                        this.router.navigate(['/']);
                    }
                } catch {

                    
                }
                
            }
        );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}