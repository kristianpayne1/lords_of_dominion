import { createContext, useRef } from "react";
import { KeyboardControls, MapControls } from "@react-three/drei";

export const controlMap = [
    { name: "q", keys: ["q", "Q"] },
    { name: "option1", keys: ["1"] },
    { name: "escape", keys: ["Escape"] },
];

export const ControlsContext = createContext(null);

export default function Controls({ children }) {
    const controlsRef = useRef();

    return (
        <ControlsContext.Provider value={controlsRef}>
            <KeyboardControls map={controlMap}>
                <MapControls enableRotate={false} ref={controlsRef} />
                {children}
            </KeyboardControls>
        </ControlsContext.Provider>
    );
}
