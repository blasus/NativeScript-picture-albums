import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Album } from "../../model/album";
import { AlbumService } from "../../services/album.service";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
    item: Album;

    constructor(
        private itemService: AlbumService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
    }
}
