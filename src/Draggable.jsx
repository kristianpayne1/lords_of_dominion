import { DragControls } from "@react-three/drei";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Box3, Matrix4, Vector3 } from "three";

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
    const removeObject = object =>
        setObjects(state => state.filter(obj => obj.uuid !== object?.uuid));

    return (
        <DragContext.Provider
            value={{ objects, addObject, removeObject, dragConfig }}
        >
            {children}
        </DragContext.Provider>
    );
}

function Draggable({ children, enabled = true }) {
    const ref = useRef();
    const { objects, addObject, removeObject, dragConfig } =
        useContext(DragContext);

    const localPosition = new Vector3();
    const previousMatrix = new Matrix4();

    useEffect(() => {
        if (!ref.current) return;
        addObject(ref.current);
        return () => {
            removeObject(ref.current);
        };
    }, [ref.current]);

    console.log(ref.current?.position);

    return (
        <DragControls
            ref={ref}
            axisLock="y"
            autoTransform={false}
            onDrag={localMatrix => {
                if (!enabled) return;
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
            onDragStart={() => previousMatrix.copy(ref.current.matrix)}
            onDragEnd={() => {
                // check if any objects are colliding
                const thisBox = new Box3().setFromObject(ref.current);
                const otherBox = new Box3();
                const collides = objects.some(
                    object =>
                        object.uuid !== ref.current.uuid &&
                        thisBox.intersectsBox(otherBox.setFromObject(object)),
                );
                if (collides) ref.current.matrix.copy(previousMatrix);
            }}
            {...dragConfig}
        >
            {children}
        </DragControls>
    );
}

export default Draggable;
