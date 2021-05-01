import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Album } from "../../model/album";
import { AlbumService } from "../../services/album.service";

/**
 * Displays the collection of the images in an album.
 */
@Component({
    selector: "ns-details",
    templateUrl: "./album-detail.component.html",
})
export class AlbumDetailComponent implements OnInit {
    item: Album;

    constructor(
        private albumService: AlbumService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.albumService.getAlbum(id).subscribe(album => {
            this.item = album;
        });
    }
}
