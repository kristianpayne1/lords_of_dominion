import { Building } from "./Buildings";

export type BuildingState = Array<Building>;

export type State = {
    buildings: BuildingState;
};
