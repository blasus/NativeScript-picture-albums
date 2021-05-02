import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { ObservableArray } from "@nativescript/core";
import { finalize, take } from "rxjs/operators";
import { Album, Picture } from "~/app/model/album";
import { ImageService } from "../../services/image.service";

/**
 * Displays the search page for images.
 * Here a list of tiles displaying the images returned from the search query is rendered.
 * A user can select an image by tapping to the respective tile.
 */
@Component({
    selector: "ns-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit { 

    /** the search term */
    private term: string;
    /** available albums. This will be used to let the user choose the album to add the image to */
    albums: Album[] = [];
    /** busy flag for loading spinner */
    isBusy = true;
    /** data items for the ListView */
    dataItems: ObservableArray<Picture>;

    constructor(
        private router: RouterExtensions,
        private imageService: ImageService
    ) {
        this.dataItems = new ObservableArray<Picture>();
        const state = this.router.router.getCurrentNavigation().extras.state;
        if (state) {
            this.term = state.term;
            this.albums = state.albums;
        }
    }

    ngOnInit(): void {
        // fetch images from server
        this.imageService.search(this.term)
            .pipe(
                take(1),
                finalize(() => {
                    this.isBusy = false;
                })
            )
            .subscribe(pictures => {
                // then render them to the list of tiles.
                this.dataItems.push(pictures);
            });
    }

    /**
     * Go back to the home page.
     */
    goBack(): void {
        this.router.back();
    }

}