import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { ObservableArray } from "@nativescript/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { finalize, take } from "rxjs/operators";

import { Album, Picture } from "../../model/album";
import { AlbumService } from "../../services/album.service";

/**
 * Displays the collection of the images in an album.
 * An image can be deleted 
 */
@UntilDestroy()
@Component({
    selector: "ns-details",
    templateUrl: "./album-detail.component.html",
    styleUrls: ["./album-detail.component.css"]
})
export class AlbumDetailComponent implements OnInit {
    /** the album */
    album: Album;
    /** busy flag for loading spinner */
    isBusy = true;
    /** data items for the ListView */
    dataItems: ObservableArray<Picture>;

    constructor(
        private albumService: AlbumService,
        private router: RouterExtensions,
        private route: ActivatedRoute
    ) {
        this.dataItems = new ObservableArray<Picture>();
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.albumService.getAlbum(id)
            .pipe(
                take(1),
                finalize(() => {
                    this.isBusy = false;
                })
            )
            .subscribe(album => {
                this.album = album;
                this.dataItems.push(album.images);
            });
    }

    /**
     * Go back to the home page.
     */
    goBack(): void {
        this.router.back();
    }
}
