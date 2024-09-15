import { StyleSheet, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MAIN_BG_COLOR } from '../../../utils/colors'
import { Wave } from 'react-native-animated-spinkit'

interface LinerGradientVarientProps {
    gradientStyle: any[],
    gradientColors: string[],
    onPress: () => void,
    text: string,
    isLoading?: boolean
}

const LinerGradientVarient = ({ gradientStyle, gradientColors, onPress, text, isLoading }: LinerGradientVarientProps) => {
    return (
        <LinearGradient style={[...gradientStyle]} colors={gradientColors} >
            <TouchableOpacity onPress={onPress} style={{ minWidth: "100%", display: "flex", justifyContent: 'center', alignItems: "center" }} >
                {isLoading ? <Wave size={26} color={MAIN_BG_COLOR} /> : <Text style={{ color: MAIN_BG_COLOR, fontWeight: "700", fontSize: 20 }} >{text}</Text>}
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default LinerGradientVarient

const styles = StyleSheet.create({})