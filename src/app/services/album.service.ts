import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Album, Picture } from "../model/album";

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
            addedAlbum = { ...album, id: this.candidateId, images: [] };
            this.albums.push(addedAlbum);
            this.candidateId++;
        }

        return of(addedAlbum);
    }

    /**
     * Add the passed image to the album with id albumId.
     * @param image 
     * @param albumId 
     * @returns the updated album
     */
    addImagetoAlbum(image: Picture, albumId: number): Observable<Album> {
        let album: Album;
        const albumIndex = this.albums.findIndex((album => album.id === albumId));
        if (albumIndex > -1) {
            this.albums[albumIndex].images.push(image);
            album = this.albums[albumIndex];
        }

        return of(album);
    }
}
