import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { firebase } from "@nativescript/firebase";
import { from, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Picture } from "../model/album";

/**
 * Default API to fetch images from server.
 */
@Injectable({
    providedIn: "root"
})
export class ImageService { 

    // These should be moved into a constants class, e.g. environment.ts
    private apiUrl: string = "https://pixabay.com/api/";
    private apiKey: string = "2729537-abca4e971d72bb7ed6b63b429";
    private path = "/pictures";

    constructor(
        private http: HttpClient,
        private zone: NgZone
    ) {}

    /**
     * Search for the images based on search term
     * @param {string} term 
     * @returns the images returned from server
     */
    search(term: string): Observable<Picture[]> {
        const params = new HttpParams()
            .set('key', this.apiKey)
            .set('image_type', 'photo');

        if (term) {
            params.set('q',term);
        }

        return this.http.get(this.apiUrl, { params: params }).pipe(
            map((res: any) => {
                let pictures: Picture[] = [];
                if (res.hits) {
                    pictures = res.hits.map((hit: any) => {
                        return {
                            id: hit.id,
                            name: hit.tags,
                            source: hit.webformatURL
                        } as Picture;
                    });
                }

                return pictures;
            })
        )
    }

    /**
     * Query all the pictures in an album.
     * @param {string} albumId 
     * @returns the pictures
     */
    queryAlbumPictures(albumId: string): Observable<Picture[]> {        
        
        return new Observable<Picture[]>(observer => {
            const onQueryEvent = (snapshot: any) => {
                this.zone.run(() => {
                    // from v.8.0.0 children property returns all
                    // the query results as array.
                    observer.next(snapshot.children as Picture[]);
                });
            };

            firebase.query(
                onQueryEvent,
                this.path,
                {
                    singleEvent: true, // this is extremely important if you don't want to stream for data
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'albumId'
                    },
                    range: {
                        type: firebase.QueryRangeType.EQUAL_TO,
                        value: albumId
                    }
                }
            );
        });
    }

    /**
     * Add the passed image to the album with id albumId.
     * @param image 
     * @param albumId 
     * @returns the updated album
     */
    addImagetoAlbum(image: Picture, albumId: string): Observable<Picture> {
        image.albumId = albumId;
        return from(firebase.push(this.path, image))
            .pipe(map(res => image));
    }

    /**
     * Delete the passed image from the album with id albumId.
     * It firstly query for images added to the album, 
     * then delete the one with firebase update operation.
     * @param image 
     * @param albumId
     * @returns the updated album 
     */
    deleteImage(image: Picture): Observable<void> {

        return new Observable<any[]>(observer => {
            const onQueryEvent = (snapshot: any) => {
                this.zone.run(() => {
                    // get the objects with generated id
                    const arr = Object.entries<any>(snapshot.value);
                    observer.next(arr.map(item => {
                        // temporarily assign the id from db to trigger deletion
                        return { dbId: item[0], ...item[1] };
                    }))
                });
            };

            // query for images with albumId = image.albumId,
            // then they will be processed to select the one to be deleted 
            firebase.query(
                onQueryEvent,
                this.path,
                {
                    singleEvent: true,
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'albumId'
                    },
                    range: {
                        type: firebase.QueryRangeType.EQUAL_TO,
                        value: image.albumId
                    }
                }
            );

        }).pipe(
            map(pictures => {
                // filter the one with identical image id
                return pictures.filter(pic => pic.id === image.id)[0];
            }),
            switchMap(picture => {
                if (picture) {
                    const data = {};
                    data[picture.dbId] = null;
                    return from(firebase.update(this.path, data));
                }

                return of(null);
            })
        );
    }
}