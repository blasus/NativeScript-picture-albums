import { Component, OnInit } from "@angular/core";

import { Item } from "../../model/item";
import { ItemService } from "../../services/item.service";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<Item>;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}
