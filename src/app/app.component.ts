import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-app';
  loadedFeature = "recipe";
  config = {
    apiKey: "AIzaSyDgDHrcuYjNrVdgfQesR7BjJpWaSaYXK1M",
    authDomain: "recipeapp-25e0c.firebaseapp.com"
  };
  
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp(this.config);
  }
}
