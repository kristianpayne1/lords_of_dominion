import Draggable, { DragContextProvider } from "./Draggable";
import { Suspense, useState } from "react";
import useGameControls from "../hooks/useGameControls";
import House from "./House";
import { useDispatch, useSelector } from "react-redux";
import { addBuilding } from "../reducers/buildingsSlice";
import { Plane } from "@react-three/drei";
import { Building, BuildingTypes, State } from "@/types";

function Building({ type, ...props }: { type: BuildingTypes }) {
    switch (type) {
        case "HOUSE":
            return <House {...props} />;
    }
}

function Buildings({ isEditMode = true, age = "FirstAge" }) {
    const dispatch = useDispatch();

    const [isAddMode, setIsAddMode] = useState(false);
    const buildings = useSelector((state: State) => state.buildings);

    useGameControls({
        keyCallbacks: {
            q: () => setIsAddMode(true),
            escape: () => setIsAddMode(false),
            option1: () => {
                if (!isAddMode) return;
                return dispatch(addBuilding({ type: "HOUSE", level: 1 }));
            },
        },
    });

    return (
        <DragContextProvider
            {...{ dragLimits: [[-4.5, 4.5], undefined, [-4.5, 4.5]] }}
        >
            <Suspense>
                {buildings.map((props: Building, index: number) => (
                    <Draggable {...{ key: index, position: [0, 0.5, 0] }}>
                        <Building {...{ age, ...props }} />
                        <Plane
                            args={[1.5, 1.5]}
                            rotation={[-Math.PI * 0.5, 0, 0]}
                            position={[0, 0.01, 0]}
                            receiveShadow
                        >
                            <meshStandardMaterial
                                transparent
                                opacity={0.3}
                                color="white"
                            />
                        </Plane>
                    </Draggable>
                ))}
            </Suspense>
        </DragContextProvider>
    );
}

export default Buildings;
