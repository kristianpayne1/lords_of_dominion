import { useGLTF } from "@react-three/drei";

const url = "Houses_FirstAge_1_Level1.gltf";

function FirstAge_1_Level1({ ...props }) {
    const { nodes, materials } = useGLTF(url);
    return (
        <group {...props}>
            <mesh geometry={nodes.Cube030.geometry} material={materials.Wood} />
            <mesh
                geometry={nodes.Cube030_1.geometry}
                material={materials.Stone}
            />
        </group>
    );
}

useGLTF.preload(url);

export default FirstAge_1_Level1;
