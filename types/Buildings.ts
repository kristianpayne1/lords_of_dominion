export enum BuildingTypes {
    House = "HOUSE",
}

export interface Building {
    variant: number;
    level: number;
    type: BuildingTypes;
}
