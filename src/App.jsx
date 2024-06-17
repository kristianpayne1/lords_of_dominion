import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";

function App() {
    return (
        <KeyboardControls map={[{ name: "add", keys: ["a", "A"] }]}>
            <Canvas orthographic camera={{ zoom: 100, position: [10, 10, 10] }}>
                <Game />
            </Canvas>
        </KeyboardControls>
    );
}

export default App;
