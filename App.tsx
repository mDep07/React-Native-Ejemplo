import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import App from "./src/App";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#0d516e",
        accent: "#1965c2",
    },
};

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}
