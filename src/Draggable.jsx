import { DragControls } from "@react-three/drei";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

const DragContext = createContext({
    objects: [],
    addObject: () => {},
    removeObject: () => {},
});

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

export function DragContextProvider({ children, ...dragConfig }) {
    const [objects, setObjects] = useState([]);

    const addObject = object => setObjects(state => [...state, object]);
    const removeObject = ({ uuid }) =>
        setObjects(state => state.filter(obj => obj.uuid !== uuid));

    return (
        <DragContext.Provider
            value={{ objects, addObject, removeObject, dragConfig }}
        >
            {children}
        </DragContext.Provider>
    );
}

function Draggable({ children }) {
    const ref = useRef();
    const { objects, addObject, removeObject, dragConfig } =
        useContext(DragContext);

    const localPosition = new Vector3();

    useEffect(() => {
        if (!ref.current) return;
        addObject(ref.current);
        return () => {
            removeObject(ref.current);
        };
    }, [ref.current]);

    console.log(objects);

    return (
        <DragControls
            ref={ref}
            axisLock="y"
            autoTransform={false}
            onDrag={localMatrix => {
                // clamp position to half
                localPosition.setFromMatrixPosition(localMatrix);
                localPosition.set(
                    roundHalf(localPosition.x),
                    roundHalf(localPosition.y),
                    roundHalf(localPosition.z),
                );
                return ref.current.matrix.copy(
                    localMatrix.setPosition(localPosition),
                );
            }}
            {...dragConfig}
        >
            {children}
        </DragControls>
    );
}

export default Draggable;
