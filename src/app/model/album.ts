export interface Album {
    id: number;
    name: string;
    description: string;
    images: Array<Image>;
}

export interface Image {
    name: string;
    source: string;
}
