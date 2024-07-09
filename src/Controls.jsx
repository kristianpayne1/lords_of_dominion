import { createContext, useRef } from "react";
import { controlMap } from "./useGameControls";
import { KeyboardControls, MapControls } from "@react-three/drei";

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
