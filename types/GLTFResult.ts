import { type Mesh, type Material } from "three";

export type GLTFResult = {
    nodes: {
        [key: string]: Mesh;
    };
    materials: {
        [key: string]: Material;
    };
};
