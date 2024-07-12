import { Mesh, Material } from "three";

export type GLTFResult = {
    nodes: {
        [key: string]: Mesh;
    };
    materials: {
        [key: string]: Material;
    };
};
