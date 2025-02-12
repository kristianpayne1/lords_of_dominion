import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";

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
