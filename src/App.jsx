import { Box, DragControls, Grid, Outlines, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

function Draggable({ children }) {
    const ref = useRef();

    return (
        <DragControls
            ref={ref}
            axisLock="y"
            autoTransform={false}
            onDrag={localMatrix => ref.current.matrix.copy(localMatrix)}
        >
            {children}
        </DragControls>
    );
}

function App() {
    return (
        <Canvas orthographic camera={{ zoom: 100, position: [10, 10, 10] }}>
            <Plane
                args={[10, 10]}
                material-color="green"
                rotation={[-Math.PI * 0.5, 0, 0]}
            />
            <Grid args={[10, 10]} cellColor={"white"} sectionColor={"grey"} />
            <Draggable>
                <Box
                    args={[1, 1, 1]}
                    material-color="red"
                    position={[0, 0.5, 0]}
                >
                    <Outlines thickness={0.01} color="black" />
                </Box>
            </Draggable>
        </Canvas>
    );
}

export default App;
