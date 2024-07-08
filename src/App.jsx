import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { controlMap } from "./useGameControls";

function App() {
    return (
        <KeyboardControls map={controlMap}>
            <Canvas
                orthographic
                camera={{ zoom: 100, position: [10, 10, 10] }}
                shadows
            >
                <Game />
                <ambientLight intensity={1} />
                <directionalLight
                    intensity={2}
                    castShadow={true}
                    position={[4, 4, -3]}
                />
                <hemisphereLight
                    skyColor="blue"
                    groundColor="#c99ac49"
                    intensity={0.5}
                />
            </Canvas>
        </KeyboardControls>
    );
}

export default App;
