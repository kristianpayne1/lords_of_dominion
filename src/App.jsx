import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import "./App.css";
import HUD from "./HUD";
import { Provider } from "react-redux";
import { store } from "./store";
import Controls from "./Controls";

function App() {
    return (
        <Provider store={store}>
            <Canvas
                orthographic
                camera={{ zoom: 100, position: [10, 10, 10] }}
                shadows
            >
                <Controls>
                    <Game />
                    <ambientLight intensity={1} />
                    <directionalLight
                        intensity={1.5}
                        castShadow={true}
                        position={[4, 4, -3]}
                    />
                    <hemisphereLight
                        skyColor="blue"
                        groundColor="#99ac49"
                        intensity={0.5}
                    />
                </Controls>
            </Canvas>
            <HUD />
        </Provider>
    );
}

export default App;
