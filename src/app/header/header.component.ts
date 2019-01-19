import { AuthService } from './../auth/auth.servoce';
import { Shared } from 'src/app/shared/sharedcode.module';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private shared: Shared = new Shared();

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Recipe[]) => {
        this.shared.alert("Success", "Recipe Saved To DB", "success");
      }
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes(); //subscribe in service
    this.shared.alert("Success", "Recipe Fetched From DB", "success");
  }

  onLogout() {
    this.authService.logout();
  }


}
