import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { controlMap } from "./useGameControls";

function App() {
    return (
        <KeyboardControls map={controlMap}>
            <Canvas orthographic camera={{ zoom: 100, position: [10, 10, 10] }}>
                <Game />
                <ambientLight intensity={1} />
            </Canvas>
        </KeyboardControls>
    );
}

export default App;
