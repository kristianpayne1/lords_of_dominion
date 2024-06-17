import {
    Box,
    Grid,
    Outlines,
    Plane,
    useKeyboardControls,
} from "@react-three/drei";
import Draggable, { DragContextProvider } from "./Draggable";
import { useEffect, useState } from "react";

function Game({}) {
    const [buildings, setBuildings] = useState([]);
    const [sub] = useKeyboardControls();

    useEffect(() => {
        return sub(
            state => state.add,
            pressed => {
                if (pressed) setBuildings(state => [...state, "house"]);
            },
        );
    }, []);

    return (
        <>
            <Plane
                args={[10, 10]}
                material-color="green"
                rotation={[-Math.PI * 0.5, 0, 0]}
            />
            <Grid args={[10, 10]} cellColor={"white"} sectionColor={"grey"} />
            <DragContextProvider
                dragLimits={[[-4.5, 4.5], undefined, [-4.5, 4.5]]}
            >
                {buildings.map((type, index) => (
                    <Draggable key={index}>
                        <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
                            <meshBasicMaterial color="red" transparent={true} />
                            <Outlines />
                        </Box>
                    </Draggable>
                ))}
            </DragContextProvider>
        </>
    );
}

export default Game;
