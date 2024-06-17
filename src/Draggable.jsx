import { DragControls } from "@react-three/drei";
import { useRef } from "react";
import { Vector3 } from "three";

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

function Draggable({ children }) {
    const ref = useRef();
    const localPosition = new Vector3();

    return (
        <DragControls
            ref={ref}
            axisLock="y"
            autoTransform={false}
            onDrag={localMatrix => {
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
        >
            {children}
        </DragControls>
    );
}

export default Draggable;
