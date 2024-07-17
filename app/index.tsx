// import Controls from "@/components/Controls";
import { DragContextProvider } from "@/components/Draggable";
import Game from "@/components/Game";
import HUD from "@/components/HUD";
import { store } from "@/reducers/store";
import { Canvas } from "@react-three/fiber/native";
import { OrientationLock, lockAsync } from "expo-screen-orientation";
import { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function Index() {
    useEffect(() => {
        if (Platform.OS !== "web") lockAsync(OrientationLock.LANDSCAPE);
    }, []);

    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <DragContextProvider
                    {...{ dragLimits: [[-4.5, 4.5], undefined, [-4.5, 4.5]] }}
                >
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
                            <hemisphereLight
                                groundColor="#99ac49"
                                intensity={0.5}
                            />
                        </Canvas>
                        <HUD />
                    </View>
                </DragContextProvider>
            </GestureHandlerRootView>
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
        flex: 1,
    },
});
