import { Box, Outlines } from "@react-three/drei";
import Draggable, { DragContextProvider } from "./Draggable";
import { useState } from "react";
import useGameControls from "./useGameControls";

function Buildings({ isEditMode = true }) {
    const [isAddMode, setIsAddMode] = useState(false);
    const [buildings, setBuildings] = useState([]);

    useGameControls({
        keyCallbacks: {
            q: () => setIsAddMode(true),
            escape: () => setIsAddMode(false),
            option1: () =>
                isAddMode && setBuildings(state => [...state, "house"]),
        },
    });

    return (
        <DragContextProvider dragLimits={[[-4.5, 4.5], undefined, [-4.5, 4.5]]}>
            {buildings.map((type, index) => (
                <Draggable key={index}>
                    <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
                        <meshBasicMaterial color="red" transparent={true} />
                        <Outlines />
                    </Box>
                </Draggable>
            ))}
        </DragContextProvider>
    );
}

export default Buildings;
