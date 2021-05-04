import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { ExtendedNavigationExtras } from "@nativescript/angular/router/router-extensions";
import { EventData, Page, TextField } from "@nativescript/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take } from "rxjs/operators";

import { Album } from "../../model/album";
import { AlbumService } from "../../services/album.service";
import { AddModalComponent } from "../add-modal/add-modal.component";

/**
 * Displays the home page.
 * It will be available to the user a header with search bar to allow searching for new images,
 * as well as a toolbar for action buttons.
 * A list of the available albums is the layout for the body.
 */
// use of ngneat/until-destroy to automatically finalise the active subscriptions
@UntilDestroy()
@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    /** the list of albums. This is fetched from the server.  */
    albums: Array<Album>;
    /** flag to toggle clear text for search bar.  */
    showClear: boolean;

    constructor(
        private albumService: AlbumService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: RouterExtensions,
        private page: Page
    ) { 
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        this.refresh();
    }

    /**
     * Method to refresh the view with new data.
     */
    private refresh(): void {
        this.albumService.getAlbums()
            .pipe(untilDestroyed(this))
            .subscribe(albums => {
                this.albums = albums;
            });
    }

    /**
     * Event handler for clear search text.
     * @param search 
     */
    onClearSearch(search: TextField): void {
        search.text = "";
    }

    /**
     * Event handler for text changing.
     * @param e 
     */
    onTextChange(e: any) {
        this.showClear = !!e.value;
    }

    /**
     * Event handler for add button clicked.
     * @param e 
     */
    onAddTap(e: EventData): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {},
            fullscreen: false
        };

        // load the modal view to add a new album
        this.modalService.showModal(AddModalComponent, options)
            .then((res: Album) => {
                if (res) {
                    this.albumService.addAlbum(res)
                    .pipe(take(1))
                    .subscribe(res => {
                        // do stuff with added album
                        this.refresh();
                    });
                }
            });
    }

    /**
     * Tap event handler on search button.
     * @param e 
     */
    onSearchTap(search: TextField): void {
        const opts: ExtendedNavigationExtras = {
            state: {
                term: search.text,
                albums: this.albums
            }
        };
        // navigate to search page passing data
        this.router.navigate(['search'], opts);
    }
}
