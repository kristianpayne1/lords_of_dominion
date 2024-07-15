import { Box, DragControls, useCursor } from "@react-three/drei";
import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Box3, type Group, Matrix4, type Mesh, Vector3 } from "three";
import { ControlsContext } from "./Controls";
import { DragConfig } from "@/types";

type DragContextValue = {
    objects: Array<Group>;
    addObject: (object: Group | undefined) => void;
    removeObject: (object: Group | undefined) => void;
    dragConfig?: DragConfig;
};

const DragContext = createContext<DragContextValue>({
    objects: [],
    addObject: () => {},
    removeObject: () => {},
});

function roundHalf(num: number) {
    return Math.round(num * 2) / 2;
}

export function DragContextProvider({
    children,
    ...dragConfig
}: PropsWithChildren) {
    const [objects, setObjects] = useState<Array<Group>>([]);

    const addObject = (object: Group | undefined) => {
        if (!object) return;
        setObjects((state: Array<Group>) => [...state, object]);
    };
    const removeObject = (object: Group | undefined) =>
        setObjects(state =>
            state.filter((obj: Group) => obj.uuid !== object?.uuid),
        );

    return (
        <DragContext.Provider
            value={{ objects, addObject, removeObject, dragConfig }}
        >
            {children}
        </DragContext.Provider>
    );
}

function Draggable({
    children,
    enabled = true,
    position,
    ...props
}: PropsWithChildren & {
    enabled?: boolean;
    position?: [x: number, y: number, z: number] | Vector3;
}) {
    const ref = useRef<typeof DragControls & Group>(null!);
    const hitBoxRef = useRef<Mesh>(null!);
    const { objects, addObject, removeObject, dragConfig } =
        useContext(DragContext);
    const controlsRef = useContext(ControlsContext);
    const [hovered, setHovered] = useState(false);
    const [dragging, setDragging] = useState(false);

    useCursor(hovered, "grab", "auto");
    useCursor(dragging, "grabbing", hovered ? "grab" : "auto");

    const localPosition = new Vector3();
    const previousMatrix = new Matrix4();

    useEffect(() => {
        if (!ref.current) return;
        addObject(ref.current);
        return () => {
            removeObject(ref.current);
        };
    }, [ref.current]);

    return (
        <DragControls
            ref={ref}
            axisLock="y"
            autoTransform={false}
            onDrag={localMatrix => {
                if (!enabled || !ref.current) return;
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
            onDragStart={() => {
                if (!enabled || !ref.current) return;
                setDragging(true);
                controlsRef.current.enabled = false;
                previousMatrix.copy(ref.current.matrix);
            }}
            onDragEnd={() => {
                if (!hitBoxRef.current || !ref.current) return;
                controlsRef.current.enabled = true;
                setDragging(false);
                // check if any objects are colliding
                const thisBox = new Box3().setFromObject(hitBoxRef.current);
                const otherBox = new Box3();
                const collides = objects.some(
                    object =>
                        object.uuid !== ref.current?.uuid &&
                        thisBox.intersectsBox(otherBox.setFromObject(object)),
                );
                if (collides) ref.current.matrix.copy(previousMatrix);
            }}
            {...dragConfig}
        >
            <group {...{ position, ...props }}>
                <Box
                    ref={hitBoxRef}
                    args={[1, 1, 1]}
                    userData={{ hitBox: true }}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <meshBasicMaterial transparent={true} opacity={0} />
                </Box>
            </group>
            {children}
        </DragControls>
    );
}

export default Draggable;
