import { Component, OnInit } from "@angular/core";
import { EventData } from "@nativescript/core";

import { Album } from "../../model/album";
import { AlbumService } from "../../services/album.service";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    albums: Array<Album>;

    constructor(private albumService: AlbumService) { }

    ngOnInit(): void {
        this.albums = this.albumService.getItems();
    }

    onTap(e: EventData): void {

    }
}
