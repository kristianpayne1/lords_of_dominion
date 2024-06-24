import { Box, Outlines, useKeyboardControls } from "@react-three/drei";
import Draggable, { DragContextProvider } from "./Draggable";
import { useEffect, useState } from "react";

function Buildings({ isEditMode = true }) {
    const [isAddMode, setIsAddMode] = useState(false);
    const [buildings, setBuildings] = useState([]);
    const [sub] = useKeyboardControls();

    useEffect(() => {
        return sub(
            state => state.addMode,
            pressed => {
                if (pressed) setIsAddMode(true);
            },
        );
    }, []);

    useEffect(() => {
        return sub(
            state => state.escape,
            pressed => {
                if (pressed) setIsAddMode(false);
            },
        );
    });

    useEffect(() => {
        return sub(
            state => state.option1,
            pressed => {
                if (pressed && isAddMode)
                    setBuildings(state => [...state, "house"]);
            },
        );
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
