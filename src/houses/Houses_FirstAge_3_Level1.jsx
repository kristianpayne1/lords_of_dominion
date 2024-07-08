import { useGLTF } from "@react-three/drei";

const url = "Houses_FirstAge_3_Level1.gltf";

function FirstAge_3_Level1({ ...props }) {
    const { nodes, materials } = useGLTF(url);
    return (
        <group {...props} position={[0.35, 0, -0.35]}>
            <mesh
                geometry={nodes.Cube242.geometry}
                material={materials.Wood}
                castShadow
            />
            <mesh
                geometry={nodes.Cube242_1.geometry}
                material={materials.Wood_Light}
                material-roughness={0}
                castShadow
            />
        </group>
    );
}

useGLTF.preload(url);

export default FirstAge_3_Level1;
