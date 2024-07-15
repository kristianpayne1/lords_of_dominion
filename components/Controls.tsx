import { createContext, useRef, type PropsWithChildren } from "react";
import { KeyboardControls, MapControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export const controlMap = [
    { name: "q", keys: ["q", "Q"] },
    { name: "option1", keys: ["1"] },
    { name: "escape", keys: ["Escape"] },
];

export const ControlsContext = createContext<any>(null);

const minPan = new Vector3(-5, -5, -5);
const maxPan = new Vector3(5, 5, 5);

export default function Controls({ children }: PropsWithChildren) {
    const controlsRef = useRef<any>(null);

    useFrame(() => {
        if (!controlsRef.current && !controlsRef.current?.target) return;
        controlsRef.current.target.clamp(minPan, maxPan);
    });

    return (
        <ControlsContext.Provider value={controlsRef}>
            <KeyboardControls map={controlMap}>
                <MapControls
                    ref={controlsRef}
                    maxZoom={200}
                    minZoom={50}
                    maxAzimuthAngle={Math.PI / 4}
                    minAzimuthAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 3.29}
                    minPolarAngle={Math.PI / 3.29}
                />
                {children}
            </KeyboardControls>
        </ControlsContext.Provider>
    );
}
