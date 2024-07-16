import { Box } from "@react-three/drei/native";
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
import { DragControls } from "./DragControls";
import {
    Gesture,
    GestureDetector,
    PanGesture,
} from "react-native-gesture-handler";

type DragContextValue = {
    objects: Array<Group>;
    addObject: (object: Group | undefined) => void;
    removeObject: (object: Group | undefined) => void;
    dragConfig?: DragConfig;
    gesture: PanGesture | null;
};

const DragContext = createContext<DragContextValue>({
    objects: [],
    addObject: () => {},
    removeObject: () => {},
    gesture: null,
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

    const gesture = Gesture.Pan();

    return (
        <DragContext.Provider
            value={{ objects, addObject, removeObject, dragConfig, gesture }}
        >
            <GestureDetector gesture={gesture}>{children}</GestureDetector>
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
    const { objects, addObject, removeObject, gesture, dragConfig } =
        useContext(DragContext);
    // const controlsRef = useContext(ControlsContext);

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
            gesture={gesture}
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
                // controlsRef.current.enabled = false;
                previousMatrix.copy(ref.current.matrix);
            }}
            onDragEnd={() => {
                if (!hitBoxRef.current || !ref.current) return;
                // controlsRef.current.enabled = true;
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
                >
                    <meshBasicMaterial transparent={true} opacity={0} />
                </Box>
            </group>
            {children}
        </DragControls>
    );
}

export default Draggable;
