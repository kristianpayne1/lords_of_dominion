import { Bounds, Grid, Plane } from "@react-three/drei";
import Buildings from "./Buildings";

function Game({}) {
    return (
        <Bounds fit clip observe margin={1}>
            <Plane
                args={[10, 10]}
                material-color="green"
                rotation={[-Math.PI * 0.5, 0, 0]}
            />
            <Grid args={[10, 10]} cellColor={"white"} sectionColor={"grey"} />
            <Buildings />
        </Bounds>
    );
}

export default Game;
