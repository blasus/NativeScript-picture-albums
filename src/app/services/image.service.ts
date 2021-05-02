import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

    constructor(private http: HttpClient) {}

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
}