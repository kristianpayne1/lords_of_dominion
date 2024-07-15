import { View } from "react-native";
import { addBuilding } from "../reducers/buildingsSlice";
import { useDispatch } from "react-redux";
import Button from "./Button";

function HUD() {
    const dispatch = useDispatch();

    return (
        <View>
            <Button onPress={() => dispatch(addBuilding({}))}>
                Build Building
            </Button>
        </View>
    );
}

export default HUD;
