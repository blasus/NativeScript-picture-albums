import { Injectable } from "@angular/core";

import { Album } from "../model/album";

@Injectable({
    providedIn: "root"
})
export class AlbumService {
    private albums = new Array<Album>(
        { id: 1, name: "Example1", description: "This is the first album" },
        { id: 2, name: "Example2", description: "This is another album" },
    );

    getItems(): Array<Album> {
        return this.albums;
    }

    getItem(id: number): Album {
        return this.albums.filter((item) => item.id === id)[0];
    }
}
