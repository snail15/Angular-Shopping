
import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';


@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;
  private deleteSubscription: Subscription;
  private wasDeleted = false;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.deleteSubscription = this.slService.wasDeleted.subscribe(
      (deleted: boolean) => {
        this.wasDeleted = deleted;
      }
    );
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        if(this.slService.wasEdited) {
          swal({
            title: "Good job!",
            text: "Ingredient Edited",
            icon: "success"
          });

        } else if (this.wasDeleted){
          swal({
            title: "Good job!",
            text: "Ingredient Deleted",
            icon: "success"
          });
        } else {
          swal({
            title: "Good job!",
            text: "Ingredient Added",
            icon: "success"
          });
        }
      }
    );
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

}
