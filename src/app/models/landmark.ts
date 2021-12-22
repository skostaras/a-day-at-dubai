export class Landmark {
    title: string;
    createdAt: string;
    updatedAt: string;
    location: number[];
    url: string;
    short_info: string;
    photo: {
        __type: string;
        name: string;
        url: string;
    };
    photo_thumb: {
        __type: string;
        name: string;
        url: string;
    };
    objectId: string;
}