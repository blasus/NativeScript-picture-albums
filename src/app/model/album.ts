export interface Album {
    id?: number; // temporarily optional as need to provide it from valid db
    name: string;
    description: string;
    images: Array<Image>;
}

export interface Image {
    name: string;
    source: string;
}
