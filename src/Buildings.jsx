import { Box } from "@react-three/drei";
import Draggable, { DragContextProvider } from "./Draggable";
import { Suspense, useState } from "react";
import useGameControls from "./useGameControls";
import House from "./House";

function Buildings({ isEditMode = true, age = "FirstAge" }) {
    const [isAddMode, setIsAddMode] = useState(false);
    const [buildings, setBuildings] = useState([]);

    useGameControls({
        keyCallbacks: {
            q: () => setIsAddMode(true),
            escape: () => setIsAddMode(false),
            option1: () => {
                if (!isAddMode) return;
                const type = Math.floor(Math.random() * 3) + 1;
                return setBuildings(state => [
                    ...state,
                    ({ ...props }) => (
                        <House {...props} type={type} level={1} />
                    ),
                ]);
            },
        },
    });

    return (
        <DragContextProvider dragLimits={[[-4.5, 4.5], undefined, [-4.5, 4.5]]}>
            <Suspense>
                {buildings.map((Building, index) => (
                    <Draggable key={index} position={[0, 0.5, 0]}>
                        <Building age={age} />
                    </Draggable>
                ))}
            </Suspense>
        </DragContextProvider>
    );
}

export default Buildings;
