import { StyleSheet, Text } from 'react-native'
import React, { forwardRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MAIN_BG_COLOR } from '../../../utils/colors'

interface LinerGradientVarientProps {
    gradientStyle: any[],
    gradientColors: string[],
    onPress: () => void,
    text: string,
}

const LinerGradientVarient = ({ gradientStyle, gradientColors, onPress, text }: LinerGradientVarientProps) => {
    return (
        <LinearGradient style={[...gradientStyle]} colors={gradientColors} >
            <TouchableOpacity onPress={onPress} style={{ minWidth: "100%", display: "flex", justifyContent: 'center', alignItems: "center" }} >
                <Text style={{ color: MAIN_BG_COLOR, fontWeight: "700", fontSize: 20 }} >{text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default LinerGradientVarient

const styles = StyleSheet.create({})