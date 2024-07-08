import { useGLTF } from "@react-three/drei";

const url = "Houses_FirstAge_2_Level1.gltf";

function FirstAge_2_Level1({ ...props }) {
    const { nodes, materials } = useGLTF(url);
    return (
        <group {...props}>
            <mesh
                geometry={nodes.Cube241.geometry}
                material={materials.Stone}
                castShadow
            />
            <mesh
                geometry={nodes.Cube241_1.geometry}
                material={materials.Wood}
                castShadow
            />
        </group>
    );
}

useGLTF.preload(url);

export default FirstAge_2_Level1;
