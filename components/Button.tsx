import { Pressable, View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PropsWithChildren } from "react";

export default function Button({
    children,
    theme,
    onPress,
}: PropsWithChildren & { theme?: string; onPress: () => void }) {
    const isPrimaryTheme = theme === "primary";

    return (
        <View
            style={[
                styles.buttonContainer,
                isPrimaryTheme
                    ? {
                          borderWidth: 4,
                          borderColor: "#ffd33d",
                          borderRadius: 18,
                      }
                    : {},
            ]}
        >
            <Pressable
                style={[
                    styles.button,
                    isPrimaryTheme ? { backgroundColor: "#fff" } : {},
                ]}
                onPress={onPress}
            >
                {isPrimaryTheme && (
                    <FontAwesome
                        name="picture-o"
                        size={18}
                        color="#25292e"
                        style={styles.buttonIcon}
                    />
                )}
                <Text
                    style={[
                        styles.buttonLabel,
                        isPrimaryTheme ? { color: "#25292e" } : {},
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
        width: 320,
        height: 68,
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
