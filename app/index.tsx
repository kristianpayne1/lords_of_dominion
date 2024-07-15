// import Controls from "@/components/Controls";
import Game from "@/components/Game";
import HUD from "@/components/HUD";
import { store } from "@/reducers/store";
import { Canvas } from "@react-three/fiber/native";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";

export default function Index() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Canvas
                    style={styles.canvas}
                    orthographic
                    camera={{ zoom: 100, position: [10, 10, 10] }}
                    shadows
                >
                    <Game />
                    <ambientLight intensity={1} />
                    <directionalLight
                        intensity={1.5}
                        castShadow={true}
                        position={[4, 4, -3]}
                    />
                    <hemisphereLight groundColor="#99ac49" intensity={0.5} />
                </Canvas>
                <HUD />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    canvas: {
        width: "100%",
        height: "100%",
    },
});
