import { Image, KeyboardTypeOptions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef } from 'react'

interface TextInputVarientProps {
    icon?: any,
    value: number | string,
    placeholder: string,
    errText?: string,
    onChangeText: (text: string) => void,
    viewPassword?: boolean,
    setViewPassword?: (val: boolean) => void,
    viewIcon?: any,
    hideIcon?: any,
    type?: string,
    keyboardType?: KeyboardTypeOptions,
    setFocus?: boolean,
}

const TextInputVarient = ({ icon, value, placeholder, errText, onChangeText, viewPassword, setViewPassword, viewIcon, hideIcon, type, keyboardType, setFocus }: TextInputVarientProps) => {
    const ref = useRef<TextInput>(null)
    if (setFocus) {
        ref.current?.focus()
    }

    return (
        <View>
            <View style={[styles.container, { borderColor: errText ? "red" : '#9e9e9e', borderWidth: errText ? 1.2 : 1 }]}>
                <View style={styles.inputContainer}>
                    {icon && <Image source={icon} style={styles.txtInputIcon} />}
                    <TextInput style={styles.txtInput} placeholder={placeholder} value={String(value)} secureTextEntry={type === "password" && !viewPassword} onChangeText={onChangeText} keyboardType={keyboardType} ref={ref} />
                    {(type === 'password' && value) &&
                        (viewPassword ? <Pressable onPress={() => setViewPassword && setViewPassword(false)}>
                            <Image source={hideIcon} style={styles.txtInputIcon} />
                        </Pressable> :
                            <Pressable onPress={() => setViewPassword && setViewPassword(true)}>
                                <Image source={viewIcon} style={styles.txtInputIcon} />
                            </Pressable>)}
                </View>
            </View>
            {errText && <Text style={styles.errTxt} ellipsizeMode='tail'>{errText}</Text>}
        </View >
    )
}

export default TextInputVarient

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtInputIcon: {
        width: 24,
        height: 24,
        marginHorizontal: 10,
        tintColor: '#9e9e9e',
    },
    txtInput: {
        flex: 1,
        fontSize: 17,
    },
    errTxt: {
        maxWidth: '95%',
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
})