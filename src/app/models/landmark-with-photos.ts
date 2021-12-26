import { Landmark } from "./landmark";

export class LandmarkWithPhotos extends Landmark {
    createdAt: string;
    updatedAt: string;
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
}