import { Box } from "@react-three/drei/native";
import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Box3, type Group, Matrix4, type Mesh, Vector3 } from "three";
import { DragConfig } from "@/types";
import { DragControls } from "./DragControls";
import {
    Gesture,
    GestureDetector,
    PanGesture,
} from "react-native-gesture-handler";
import { CanvasView, updateCallbackProps } from "./CanvasView";
import { RootState, useThree } from "@react-three/fiber";

type DragObject = {
    group: Group;
    gesture: PanGesture;
    three: RootState;
};

type DragContextValue = {
    objects: Array<DragObject>;
    addObject: (dragObject: DragObject) => void;
    removeObject: (uuid: string) => void;
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

function DragView({ group, gesture, three }: DragObject) {
    const updateCallback = useRef((props: updateCallbackProps) => {});

    useEffect(() => {
        gesture.onChange(e => console.log(e));
    }, []);

    return (
        <GestureDetector gesture={gesture}>
            <CanvasView {...{ group, three, updateCallback }} />
        </GestureDetector>
    );
}

export function DragContextProvider({
    children,
    ...dragConfig
}: PropsWithChildren) {
    const [objects, setObjects] = useState<Array<DragObject>>([]);

    const addObject = (dragObject: DragObject) => {
        if (!dragObject) return;
        setObjects((state: Array<DragObject>) => [...state, dragObject]);
    };
    const removeObject = (uuid: string) =>
        setObjects(state =>
            state.filter(({ group: object }) => uuid !== object?.uuid),
        );

    return (
        <DragContext.Provider
            value={{ objects, addObject, removeObject, dragConfig }}
        >
            {children}
            {objects.map((props, key) => (
                <DragView {...{ key, ...props }} />
            ))}
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

    const three = useThree();

    // const controlsRef = useContext(ControlsContext);

    const localPosition = new Vector3();
    const previousMatrix = new Matrix4();

    const gesture = useMemo(() => Gesture.Pan(), []);

    useEffect(() => {
        if (!ref.current) return;
        addObject({
            group: ref.current,
            gesture,
            three,
        });
        return () => {
            removeObject(ref.current.uuid);
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
                    ({ group }) =>
                        group.uuid !== ref.current?.uuid &&
                        thisBox.intersectsBox(otherBox.setFromObject(group)),
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
