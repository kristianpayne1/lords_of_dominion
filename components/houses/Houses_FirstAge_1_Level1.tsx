import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types";

const url = "Houses_FirstAge_1_Level1.gltf";

function FirstAge_1_Level1({ ...props }) {
    const { nodes, materials } = useGLTF(url) as unknown as GLTFResult;
    return (
        <group {...props}>
            <mesh
                geometry={nodes.Cube030.geometry}
                material={materials.Wood}
                material-roughness={0}
                castShadow
            />
            <mesh
                geometry={nodes.Cube030_1.geometry}
                material={materials.Stone}
                castShadow
            />
        </group>
    );
}

useGLTF.preload(url);

export default FirstAge_1_Level1;
