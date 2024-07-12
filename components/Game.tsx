import { Bounds, Plane } from "@react-three/drei";
import Buildings from "./Buildings";

function Game({}) {
    return (
        <Bounds fit clip observe margin={1}>
            <Plane
                args={[10, 10]}
                rotation={[-Math.PI * 0.5, 0, 0]}
                receiveShadow
            >
                <meshStandardMaterial color="#99ac49" />
            </Plane>
            <Buildings />
        </Bounds>
    );
}

export default Game;
