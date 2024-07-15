import { useGLTF } from "@react-three/drei/native";
import { GLTFResult } from "@/types";
import { Asset } from "expo-asset";

const url = "../../assets/models/Houses_FirstAge_1_Level1.gltf";
const model = Asset.fromModule(require(url));

function FirstAge_1_Level1({ ...props }) {
    const { nodes, materials } = useGLTF(model.uri) as unknown as GLTFResult;
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
