import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView , ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EditInfo as EditInfoAction } from '../../../reducers';
import { FormInput } from './FormInput';
import { AppColors } from '../../../styles';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';


export const PersonalInfoBody = ({ user }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        firstname: user.name.firstname,
        lastname: user.name.lastname,
        phone: user.phone,
        birthdate: "12/04/2002",
        gender: "Nam",
        city: user.address.city,
        street: user.address.street
    });

    const handleChange = (key, value) => {
        setFormData(prevState => ({ ...prevState, [key]: value }));
    };

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            await dispatch(EditInfoAction(formData.email, formData.password));           
        }catch (err){
            setIsEditing(false);
            alert(err);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/images/icons/arrow_back.png')}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
                    <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                        <Icon name={isEditing ? "save" : "edit"} size={24} color={AppColors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <FormInput label="Email" value={formData.email} editable={false} />

                    <View style={styles.rowContainer}>
                        <View style={styles.flex1}>
                            <FormInput label="Họ" value={formData.firstname} editable={isEditing} onChangeValue={(text) => handleChange("firstname", text)} />
                        </View>
                        <View style={styles.flex1}>
                            <FormInput label="Tên" value={formData.lastname} editable={isEditing} onChangeValue={(text) => handleChange("lastname", text)} />
                        </View>
                    </View>

                    <FormInput label="Số điện thoại" value={formData.phone} editable={isEditing} onChangeValue={(text) => handleChange("phone", text)} />
                    <FormInput label="Ngày tháng năm sinh" value={formData.birthdate} iconName="calendar-today" isDate editable={isEditing} onChangeValue={(value) => handleChange("birthdate", value)} />
                    <FormInput label="Giới tính" value={formData.gender} iconName="arrow-drop-down" isGender editable={isEditing} onChangeValue={(value) => handleChange("gender", value)} />
                    <FormInput label="Tỉnh/Thành phố" value={formData.city} iconName="arrow-drop-down" isCity editable={isEditing} onChangeValue={(value) => handleChange("city", value)} />
                    <FormInput label="Thường trú" value={formData.street} editable={isEditing} onChangeText={(text) => handleChange("street", text)} />
                </View>
                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Lưu</Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    backIcon: {
        width: 35,
        height: 35,
        borderRadius: 8,
        backgroundColor: AppColors.primaryLight,
    },
    form: {
        gap: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: AppColors.primary,
        borderRadius: 25,
        padding: 14,
        alignItems: 'center',
        marginTop: 'auto',
    },
    saveButtonText: {
        color: AppColors.white,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default PersonalInfoBody;