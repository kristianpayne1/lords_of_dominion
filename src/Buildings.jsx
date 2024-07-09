import Draggable, { DragContextProvider } from "./Draggable";
import { Suspense, useState } from "react";
import useGameControls from "./useGameControls";
import House from "./House";
import { useDispatch, useSelector } from "react-redux";
import { addBuilding } from "./reducers/buildingsSlice";
import { HOUSE } from "./houses/types";

function Building({ type, ...props }) {
    switch (type) {
        case HOUSE:
            return <House {...props} />;
    }
}

function Buildings({ isEditMode = true, age = "FirstAge" }) {
    const dispatch = useDispatch();

    const [isAddMode, setIsAddMode] = useState(false);
    const buildings = useSelector(state => state.buildings);

    useGameControls({
        keyCallbacks: {
            q: () => setIsAddMode(true),
            escape: () => setIsAddMode(false),
            option1: () => {
                if (!isAddMode) return;
                return dispatch(addBuilding({ type: HOUSE, level: 1 }));
            },
        },
    });

    return (
        <DragContextProvider dragLimits={[[-4.5, 4.5], undefined, [-4.5, 4.5]]}>
            <Suspense>
                {buildings.map((props, index) => (
                    <Draggable key={index} position={[0, 0.5, 0]}>
                        <Building age={age} {...props} />
                    </Draggable>
                ))}
            </Suspense>
        </DragContextProvider>
    );
}

export default Buildings;
