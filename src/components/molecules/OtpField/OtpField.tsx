import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

interface OtpFieldProps {
    setOtp: (otp: number[]) => void;
}

const OtpField = ({ setOtp }: OtpFieldProps) => {
    const otpRef = useRef<TextInput[]>([])
    const [localOtp, setLocalOtp] = useState<number[]>([])

    // handle value change on otp field and make each filed to contain only one digit and if entered new digit it will override the previous one
    const handleOtpChange = (index: number, value: number) => {
        const newOtp = [...localOtp];
        if (value) {
            if (newOtp.length === 5) {
                newOtp[index] = value;
                setLocalOtp([...newOtp])
                otpRef.current[index + 1]?.focus();
                setOtp([...newOtp])
                return;
            }
            if (newOtp[index]) {
                const temp = String(value).split('');
                newOtp[index] = Number(temp[temp.length - 1]);
                setLocalOtp([...newOtp])
                otpRef.current[index + 1]?.focus();
                return;
            }
            newOtp[index] = value;
            setLocalOtp([...newOtp])
            otpRef.current[index + 1]?.focus();
        } else {
            newOtp[index] = 0;
            setLocalOtp([...newOtp])
            otpRef.current[index - 1]?.focus();
        }
    }

    // handle backspace on otp field
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            otpRef.current[index - 1]?.focus()
        }
    }

    // on initial render focus on first otp field
    useEffect(() => {
        otpRef.current[0]?.focus()
    }, [])

    return (
        <View style={styles.container}>
            {
                Array.from({ length: 6 }).map((_, index) => {
                    if (index === 3) {
                        return (
                            <View key={`view-${ index }`} style={[styles.container, { width: "auto" }]}>
                                <Image source={require("../../../images/minus.png")} style={styles.otpImg} />
                                <TextInput key={`input-${ index }`} style={styles.input} keyboardType='numeric' ref={(ref) => { if (ref) otpRef.current[index] = ref }} onChangeText={(txt) => handleOtpChange(index, Number(txt))} onKeyPress={(e) => handleKeyPress(e, index)} value={localOtp[index] ? String(localOtp[index]) : ''} />
                            </View>
                        )
                    }
                    return (
                        <TextInput key={`input-${ index }`} style={styles.input} keyboardType='numeric' ref={(ref) => { if (ref) otpRef.current[index] = ref }} onChangeText={(txt) => handleOtpChange(index, Number(txt))} onKeyPress={(e) => handleKeyPress(e, index)} value={localOtp[index] ? String(localOtp[index]) : ''} />
                    )
                })
            }
        </View>
    )
}

export default OtpField

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: 45,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    otpImg: {
        width: 10,
        height: 10,
    }
})