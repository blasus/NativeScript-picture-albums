export interface Album {
    id: string;
    name: string;
    description: string;
    images: Array<Picture>;
}

export interface Picture {
    id: string;
    name: string;
    source: string;
    albumId: string;
}
