import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";

export const controlMap = [
    { name: "q", keys: ["q", "Q"] },
    { name: "option1", keys: ["1"] },
    { name: "escape", keys: ["Escape"] },
];

export function simulateKeyStroke(strokes) {
    if (!Array.isArray(strokes) || !strokes.length) return;
    strokes.forEach((keyName, index) => {
        const control = controlMap.find(({ name }) => name === keyName);
        setTimeout(() => {
            requestAnimationFrame(() => {
                window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: control.keys[0] }),
                );
                window.dispatchEvent(
                    new KeyboardEvent("keyup", { key: control.keys[0] }),
                );
            });
        }, index * 100);
    });
}

function useGameControls({ keyCallbacks = {} }) {
    const [sub] = useKeyboardControls();

    const {
        q = () => {},
        escape = () => {},
        option1 = () => {},
    } = keyCallbacks;

    useEffect(() => {
        return sub(
            state => state.q,
            pressed => pressed && q(),
        );
    }, []);

    useEffect(() => {
        return sub(
            state => state.escape,
            pressed => pressed && escape(),
        );
    });

    useEffect(() => {
        return sub(
            state => state.option1,
            pressed => pressed && option1(),
        );
    });
}

export default useGameControls;
