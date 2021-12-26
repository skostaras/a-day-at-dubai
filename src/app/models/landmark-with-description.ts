import { Landmark } from "./landmark";

export interface LandmarkWithDescription extends Landmark {
    description: string;
}