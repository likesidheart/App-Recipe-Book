import { Ingredient } from "../models/ingredient";
import { HttpClient} from '@angular/common/http';
import { AuthService } from "./auth.service";
import { Response} from '@angular/http';
import 'rxjs/Rx'
import { Injectable } from "../../node_modules/@angular/core";


@Injectable()
export class ShoppingListService {
    private ingredients:Ingredient[] = [];

    constructor(private http: HttpClient, private authService:AuthService) {}

    addItem(name:string, amount:number) {
        this.ingredients.push(new Ingredient(name,amount))
        console.log(this.ingredients)
    }
    addItems(items:Ingredient[]) {
        this.ingredients.push(...items)
    }
    getItems() {
        return this.ingredients.slice();
    }
    removeItem(index:number) {
        this.ingredients.splice(index,1);
    }
    storeList(token:string) {
        let userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-recipebook-40225.firebaseio.com/' + userId + '/shopping-list.json?auth='+ token ,this.ingredients)
        .map((res:Response)=>{
            return res.json();
        })
    }
}