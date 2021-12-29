import { LandmarkWithPhotos } from './landmark-with-photos';

export interface LandmarkWithPhotosAndDescription extends LandmarkWithPhotos {
    description: string;
}