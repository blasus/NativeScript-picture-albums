import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Album } from "../model/album";

/**
 * Default API to fetch albums.
 */
@Injectable({
    providedIn: "root"
})
export class AlbumService {
    // temporary placeholder id for mock db storage
    private candidateId: number = 3;
    // temporary store for albums
    private albums = new Array<Album>(
        { id: 1, name: "Example1", description: "This is the first album", images: [] },
        { id: 2, name: "Example2", description: "This is another album", images: [] },
    );

    /**
     * Gets the available albums.
     * @returns the albums
     */
    getAlbums(): Observable<Album[]> {
        return of(this.albums);
    }

    /**
     * Get the album with parameter id
     * @param {number} id 
     * @returns the album with specified id, if available.
     */
    getAlbum(id: number): Observable<Album> {
        return of(this.albums.filter((item) => item.id === id)[0]);
    }

    /**
     * Add the album to the collection.
     * @param album 
     * @returns the added album
     */
    addAlbum(album: Album): Observable<Album> {
        let addedAlbum: Album;
        if (album) {
            addedAlbum = { ...album, id: this.candidateId };
            this.albums.push(album);
            this.candidateId++;
        }

        return of(addedAlbum);
    }
}
