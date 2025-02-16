import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Import SheetManager từ react-native-actions-sheet
import { SheetProvider } from "react-native-actions-sheet";
// Loader
import Loader from "../../components/Loaders/Loader";
import { SettingBody } from "./components";


const { width, height } = Dimensions.get("window");

export const SettingScreen = (props) => {
    const loading = useSelector((state) => state.auth.isLoading);
    const dispatch = useDispatch();

    return (
        <SheetProvider context="global">
            <View style={styles.container}>
                {loading && <Loader />}
                <View style={styles.settingContainer}>
                    <SettingBody/>
                </View>
            </View>
        </SheetProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingContainer: {
        width,
        justifyContent: "center",
        alignItems: "center",
    },
});

