import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";

const controlMap = [
    { name: "addMode", keys: ["q", "Q"] },
    { name: "option1", keys: ["1"] },
    { name: "escape", keys: ["Escape"] },
];

function App() {
    return (
        <KeyboardControls map={controlMap}>
            <Canvas orthographic camera={{ zoom: 100, position: [10, 10, 10] }}>
                <Game />
            </Canvas>
        </KeyboardControls>
    );
}

export default App;
