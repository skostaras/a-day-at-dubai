import { Landmark } from "./landmark";

export interface LandmarkWithPhotos extends Landmark {
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