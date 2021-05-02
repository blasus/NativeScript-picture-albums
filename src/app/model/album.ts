export interface Album {
    id: number;
    name: string;
    description: string;
    images: Array<Picture>;
}

export interface Picture {
    id: number;
    name: string;
    source: string;
}
