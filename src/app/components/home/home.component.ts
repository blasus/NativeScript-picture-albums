import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { EventData, TextField } from "@nativescript/core";

import { Album } from "../../model/album";
import { AlbumService } from "../../services/album.service";
import { AddModalComponent } from "../add-modal/add-modal.component";

/**
 * Displays the home page.
 * It will be available to the user a header with search bar to allow searching for new images,
 * as well as a toolbar for action buttons.
 * A list of the available albums is the layout for the body.
 */
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
        private vcRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        this.albums = this.albumService.getAlbums();
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
            .then((result: Album) => {
                console.log(result);
            });
    }
}
