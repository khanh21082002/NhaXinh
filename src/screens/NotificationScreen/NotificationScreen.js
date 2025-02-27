import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, Dimensions, ScrollView , SafeAreaView } from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action

//component
import Colors from '../../utils/Colors';
import { Header } from './components';
import NotificationSection from './components/NotificationSection';
import NotificationItem from './components/NotificationItem';
import { MessageIcon, ShippingIcon } from './components/Icons';
//Loader
import Loader from '../../components/Loaders/Loader';

const { height } = Dimensions.get('window');

export  const NotificationScreen = (props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.cart.isLoading);

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={props.navigation} />
            {loading ? <Loader /> : <></>}
            <ScrollView style={styles.content}>
                <NotificationSection title="Mới">
                    <NotificationItem
                        icon={<MessageIcon />}
                        title="Nội thất Nhà Xinh đã gửi tin nhắn cho bạn."
                        time="50 phút"
                        isUnread
                    />
                    <NotificationItem
                        icon={<MessageIcon />}
                        title="Nội thất Nhà Xinh đã gửi tin nhắn cho bạn."
                        time="50 phút"
                    />
                </NotificationSection>

                <NotificationSection title="Hôm nay">
                    <NotificationItem
                        icon={<ShippingIcon />}
                        title="Đang vận chuyển"
                        description="Đơn hàng 241202HNG1X đang được vận chuyển đến bạn"
                        time="5 giờ"
                        isUnread
                    />
                    <NotificationItem
                        icon={<ShippingIcon />}
                        title="Xác nhận đã thanh toán"
                        description="Thanh toán cho đơn hàng 241202HNG1X thành công. Vui lòng kiểm tra thời gian nhận hàng dự kiến trong phần Chi tiết đơn hàng và tin nhắn."
                        time="7 giờ"
                    />
                </NotificationSection>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    centerLoader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    },
});

export default NotificationScreen;
