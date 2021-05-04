import { Injectable } from "@angular/core";
import { firebase } from "@nativescript/firebase";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { Album } from "../model/album";
import { ImageService } from "./image.service";

/**
 * Default API to fetch albums.
 */
@Injectable({
    providedIn: "root"
})
export class AlbumService {

    private path = '/albums';

    constructor(private imageService: ImageService) {}

    /**
     * Gets the available albums.
     * @returns the albums
     */
    getAlbums(): Observable<Album[]> {
        return from(firebase.getValue(this.path))
            .pipe(
                map(res => {
                    const arr = Object.entries<any>(res.value);
                    return arr.map(item => {
                        return { id: item[0], ...item[1] };
                    })
                }),
            );
    }

    /**
     * Get the album with parameter id.
     * @param {string} id 
     * @returns the album with specified id, if available.
     */
    getAlbum(id: string): Observable<Album> {
        let album: Album;
        return from(firebase.getValue(this.path + `/${id}`))
            .pipe(
                switchMap(res => {
                    album = res.value;
                    return this.imageService.queryAlbumPictures(id);
                }),
                map(pictures => {
                    album.images = pictures;
                    return album;
                })
            );
    }

    /**
     * Add the album to the collection.
     * @param album 
     * @returns the added album
     */
    addAlbum(album: Album): Observable<firebase.PushResult> {
        return from(firebase.push(this.path, album));
    }
}
