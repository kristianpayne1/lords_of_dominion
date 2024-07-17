import { Pressable, View, StyleSheet, Text } from "react-native";
import { PropsWithChildren } from "react";

export default function Button({
    children,
    theme = "primary",
    onPress,
}: PropsWithChildren & { theme?: string; onPress: () => void }) {
    const isPrimaryTheme = theme === "primary";

    return (
        <View style={[styles.buttonContainer, isPrimaryTheme ? {} : {}]}>
            <Pressable
                style={[
                    styles.button,
                    isPrimaryTheme ? { backgroundColor: "#125e8a" } : {},
                ]}
                onPress={onPress}
            >
                <Text
                    style={[
                        styles.buttonLabel,
                        isPrimaryTheme ? { color: "#fff" } : {},
                    ]}
                >
                    {children}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 200,
        height: 50,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#000",
        fontSize: 16,
    },
});
