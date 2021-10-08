import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";


const FloatingButton = ({ handlePress, icon, position = 0 }: { handlePress: () => void, icon: string, position?: number }) => {
    const postionButton = !position ? {} : position === 2 ? { marginBottom: 80 } : {};
    return (
        <FAB
            style={{...styles.fab, ...postionButton}}
            icon={icon}
            onPress={handlePress}
        />
    )
};

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        marginBottom: 16,
        marginRight: 16,
        right: 0,
        bottom: 0,
    },
});

export default FloatingButton;
