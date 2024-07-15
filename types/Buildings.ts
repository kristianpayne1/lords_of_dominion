export enum BuildingTypes {
    House = "HOUSE",
}

export interface BuildingType {
    variant: number;
    level: number;
    type: BuildingTypes;
}
