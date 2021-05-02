import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { ObservableArray, confirm } from "@nativescript/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { finalize, take } from "rxjs/operators";

import { Album, Picture } from "../../model/album";
import { AlbumService } from "../../services/album.service";

/**
 * Displays the collection of the images in an album.
 * An image can be deleted by long pressing the assigned tile,
 * as it is normally a secondary function in an image gallery.
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

    /**
     * Item selected event handler from RadListView.
     * Used to enable function on long press.
     * @param e 
     */
    onItemSelected(e: ListViewEventData): void {
        const listview = e.object as RadListView;
        const image = this.dataItems.getItem(e.index);
        // call the confirm dialog to delete the image from the album
        const options = {
            title: "Delete image " + image.name,
            message: "Are you sure you want to delete the image from the album?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }

        confirm(options).then((res: boolean) => {
            if (res) {
                // delete the image
                this.albumService.deleteImageFromAlbum(image, this.album.id)
                    .pipe(take(1))
                    .subscribe(album => {
                        // refresh the view
                        this.dataItems.splice(e.index, 1);
                    });
            } else {
                // deleselect the tile
                listview.deselectAll();
            }
        });
    }
}
