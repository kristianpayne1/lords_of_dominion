import {
    Vector2,
    Vector3,
    Group,
    Object3D,
    Camera,
    PerspectiveCamera,
    OrthographicCamera,
    Raycaster,
} from "three";
import { RootState } from "@react-three/fiber/native";
import {
    PropsWithChildren,
    useLayoutEffect,
    useRef,
    MutableRefObject,
} from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

const v1 = /* @__PURE__ */ new Vector3();
const v2 = /* @__PURE__ */ new Vector3();
const v3 = /* @__PURE__ */ new Vector3();
const v4 = /* @__PURE__ */ new Vector2();

function defaultCalculatePosition(
    el: Object3D,
    camera: Camera,
    size: { width: number; height: number },
) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    objectPos.project(camera);
    const widthHalf = size.width / 2;
    const heightHalf = size.height / 2;
    return [
        objectPos.x * widthHalf + widthHalf,
        -(objectPos.y * heightHalf) + heightHalf,
    ];
}

export type CalculatePosition = typeof defaultCalculatePosition;

function isObjectBehindCamera(el: Object3D, camera: Camera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const deltaCamObj = objectPos.sub(cameraPos);
    const camDir = camera.getWorldDirection(v3);
    return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}

function isObjectVisible(
    el: Object3D,
    camera: Camera,
    raycaster: Raycaster,
    occlude: Object3D[],
) {
    const elPos = v1.setFromMatrixPosition(el.matrixWorld);
    const screenPos = elPos.clone();
    screenPos.project(camera);
    v4.set(screenPos.x, screenPos.y);
    raycaster.setFromCamera(v4, camera);
    const intersects = raycaster.intersectObjects(occlude, true);
    if (intersects.length) {
        const intersectionDistance = intersects[0].distance;
        const pointDistance = elPos.distanceTo(raycaster.ray.origin);
        return pointDistance < intersectionDistance;
    }
    return true;
}

function objectScale(el: Object3D, camera: Camera) {
    if (camera instanceof OrthographicCamera) {
        return camera.zoom;
    } else if (camera instanceof PerspectiveCamera) {
        const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
        const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
        const vFOV = (camera.fov * Math.PI) / 180;
        const dist = objectPos.distanceTo(cameraPos);
        const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
        return 1 / scaleFOV;
    } else {
        return 1;
    }
}

function objectZIndex(
    el: Object3D,
    camera: Camera,
    zIndexRange: Array<number>,
) {
    if (
        camera instanceof PerspectiveCamera ||
        camera instanceof OrthographicCamera
    ) {
        const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
        const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
        const dist = objectPos.distanceTo(cameraPos);
        const A =
            (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
        const B = zIndexRange[1] - A * camera.far;
        return Math.round(A * dist + B);
    }
    return 0;
}

export interface CanvasViewProps {
    center?: boolean;
    eps?: number;
    distanceFactor?: number;
    zIndexRange?: Array<number>;
    calculatePosition?: CalculatePosition;
    // Occlusion based off work by Jerome Etienne and James Baicoianu
    // https://www.youtube.com/watch?v=ScZcUEDGjJI
    // as well as Joe Pea in CodePen: https://codepen.io/trusktr/pen/RjzKJx
    group: Group | null;
    three: RootState;
    updateCallback: MutableRefObject<(props: updateCallbackProps) => void>;
}

export type updateCallbackProps = {
    group: Group;
    three: Pick<RootState, "camera" | "size" | "raycaster">;
};

export const CanvasView = ({
    children,
    eps = 0.001,
    center,
    distanceFactor,
    zIndexRange = [16777271, 0],
    calculatePosition = defaultCalculatePosition,
    group,
    three: { scene, camera, size, raycaster },
    updateCallback,
    ...props
}: PropsWithChildren & CanvasViewProps) => {
    const oldZoom = useRef(0);
    const oldPosition = useRef([0, 0]);

    const offset = useSharedValue({ x: 0, y: 0 });
    const scale = useSharedValue(1);
    const visible = useSharedValue(true);
    const zIndex = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: scale.value },
            ],
            visible: !visible.value && "none",
            zIndex: zIndex.value,
        };
    });

    useLayoutEffect(() => {
        scene.updateMatrixWorld();
        updateCallback.current = ({
            group,
            three: { camera, size, raycaster },
        }: updateCallbackProps) => {
            if (group) {
                camera.updateMatrixWorld();
                group.updateWorldMatrix(true, false);
                const vec = calculatePosition(group, camera, size);

                if (
                    Math.abs(oldZoom.current - camera.zoom) > eps ||
                    Math.abs(oldPosition.current[0] - vec[0]) > eps ||
                    Math.abs(oldPosition.current[1] - vec[1]) > eps
                ) {
                    const isBehindCamera = isObjectBehindCamera(group, camera);
                    let raytraceTarget:
                        | null
                        | undefined
                        | boolean
                        | Object3D[] = false;

                    if (raytraceTarget) {
                        const isvisible = isObjectVisible(
                            group,
                            camera,
                            raycaster,
                            raytraceTarget,
                        );
                        visible.value = isvisible && !isBehindCamera;
                    } else {
                        visible.value = !isBehindCamera;
                    }

                    zIndex.value = objectZIndex(group, camera, zIndexRange);
                    scale.value =
                        distanceFactor === undefined
                            ? 1
                            : objectScale(group, camera) * distanceFactor;
                    oldPosition.current = vec;
                    offset.value = { x: vec[0], y: vec[1] };
                    oldZoom.current = camera.zoom;
                }
            }
        };
        if (group)
            updateCallback.current({
                group,
                three: { camera, size, raycaster },
            });
    }, []);

    return (
        <Animated.View style={[styles.view, animatedStyles]} {...props}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        top: 0,
        left: 0,
        transformOrigin: "0 0",
        height: 100,
        width: 100,
    },
});
