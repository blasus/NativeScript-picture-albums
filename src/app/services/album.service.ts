import { Injectable } from "@angular/core";

import { Album } from "../model/album";

@Injectable({
    providedIn: "root"
})
export class AlbumService {
    private albums = new Array<Album>(
        { id: 1, name: "Example1", description: "This is the first album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
    );

    getAlbums(): Array<Album> {
        return this.albums;
    }

    getAlbum(id: number): Album {
        return this.albums.filter((item) => item.id === id)[0];
    }

    addAlbum(album: Album): void {
        this.albums.push(album);
    }
}
