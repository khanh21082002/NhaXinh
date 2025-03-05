import React from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//Text
import CustomText from "../../../components/UI/CustomText";
import Messages from "../../../messages/user";
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

const NotificationBody = ({
    navigation,
    notificationSection,
    user,
    loadNotification,
    isRefreshing,
}) => {
    return (
        <>
            {Object.keys(user).length === 0 ? (
                <View style={styles.center}>
                    <CustomText>{Messages["user.login.require"]}</CustomText>
                    <View
                        style={{
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            backgroundColor: AppColors.primary,
                            borderRadius: 5,
                            borderColor: AppColors.primary,
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <CustomText style={{ color: "#fff" }}>Tiếp tục</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : notificationSection.length === 0 ? (
                <View style={styles.center}>
                    <CustomText style={{ fontSize: 16 }}>
                        Bạn không nhận được thông báo nào !
                    </CustomText>
                </View>
            ) : (
                <FlatList
                    data={notificationSection}
                    onRefresh={loadNotification}
                    refreshing={isRefreshing}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return <FavoriteItem navigation={navigation} item={item} />;
                    }}
                />
            )}
        </>
    )
}

NotificationBody.propTypes = {
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    FavoriteProducts: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default NotificationBody