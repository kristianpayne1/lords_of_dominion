import { Box, Grid, Outlines, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Draggable, { DragContextProvider } from "./Draggable";

function App() {
    return (
        <Canvas orthographic camera={{ zoom: 100, position: [10, 10, 10] }}>
            <Plane
                args={[10, 10]}
                material-color="green"
                rotation={[-Math.PI * 0.5, 0, 0]}
            />
            <Grid args={[10, 10]} cellColor={"white"} sectionColor={"grey"} />
            <DragContextProvider
                dragLimits={[[-4.5, 4.5], undefined, [-4.5, 4.5]]}
            >
                <Draggable>
                    <Box
                        args={[1, 1, 1]}
                        material-color="red"
                        position={[0, 0.5, 0]}
                    >
                        <Outlines thickness={0.03} color="black" />
                    </Box>
                </Draggable>
            </DragContextProvider>
        </Canvas>
    );
}

export default App;
