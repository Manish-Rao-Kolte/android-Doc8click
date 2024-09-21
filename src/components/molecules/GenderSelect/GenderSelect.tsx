import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FEMALE_TINT_COLOR, MAIN_BG_COLOR, MAIN_FONT_COLOR, MAIN_TINT_COLOR, MALE_TINT_COLOR } from '../../../utils/colors'

type GenderSelect = {
    selectedGender: string,
    onGenderSelect: (val: string) => void
}

const GenderSelect = ({ selectedGender, onGenderSelect }: GenderSelect) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onGenderSelect("male")}>
                <View style={[styles.genderView, { borderColor: selectedGender === "male" ? MALE_TINT_COLOR : MAIN_TINT_COLOR }]}>
                    <Image style={[styles.genderImg, { tintColor: selectedGender === "male" ? MALE_TINT_COLOR : MAIN_TINT_COLOR }]} source={require("../../../images/input-icon/male.png")} />
                </View>
                <Text style={[styles.genderTxt, { color: selectedGender === "male" ? MALE_TINT_COLOR : MAIN_FONT_COLOR }]} >Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onGenderSelect("female")}>
                <View style={[styles.genderView, { borderColor: selectedGender === "female" ? FEMALE_TINT_COLOR : MAIN_TINT_COLOR }]}>
                    <Image style={[styles.genderImg, { tintColor: selectedGender === "female" ? FEMALE_TINT_COLOR : MAIN_TINT_COLOR }]} source={require("../../../images/input-icon/female.png")} />
                </View>
                <Text style={[styles.genderTxt, { color: selectedGender === "female" ? FEMALE_TINT_COLOR : MAIN_FONT_COLOR }]} >Female</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GenderSelect

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 25,
    },
    genderView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: MAIN_BG_COLOR,
    },
    genderImg: {
        width: 50,
        height: 50,
        tintColor: MAIN_TINT_COLOR,
    },
    genderTxt: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: "500",
        letterSpacing: 0.6,
    }
})