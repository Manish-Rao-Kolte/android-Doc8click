import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RootScreenProps } from '../../types/navigation'
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen'
import TextInputVarient from '../../components/atoms/TextInputVarient/TextInputVarient'
import { BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3, MAIN_BG_COLOR, MAIN_FONT_COLOR, THEME_COLOR } from '../../utils/colors'
import LinerGradientVarient from '../../components/atoms/LinerGradientVarient/LinerGradientVarient'
import OtpField from '../../components/molecules/OtpField/OtpField'
import { validateIdentifier, validatePassword } from '../../utils/authValidate'


const Login = ({ navigation }: RootScreenProps<'Login'>) => {
    const [identifier, setIdentifier] = useState<number | string>('')
    const [password, setPassword] = useState<string>('')
    const [otp, setOtp] = useState<number[]>([])
    const [viewPassword, setViewPassword] = useState<boolean>(false)
    const [loginWithOtp, setLoginWithOtp] = useState<boolean>(false)
    const [otpSent, setOtpSent] = useState<boolean>(false)
    const [sendingOtp, setSendingOtp] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(90)
    const [errText, setErrText] = useState({ identifierErr: '', passwordErr: '', otpErr: '' })

    // function to request otp and mock as api call
    const requestOTP = () => {
        setSendingOtp(true)
        const identifierResult = validateIdentifier(identifier, "mobile")
        if (identifierResult === "valid") {
            setTimeout(() => {
                setOtpSent(true)
                setSendingOtp(false)
            }, 2000);
        } else {
            setSendingOtp(false)
            setErrText({ ...errText, identifierErr: identifierResult })
        }
    }

    // function to handle login with otp
    const handleOTPLogin = () => {
        if (otp.length === 6) {
            clearFields()
            navigation.navigate("BottomTabNavigator")
        } else {
            errText.otpErr = "Enter valid OTP"
        }

    }

    // function to handle login with password
    const handlePasswordLogin = () => {
        const type = loginWithOtp ? "mobile" : "email"
        const identifierResult = validateIdentifier(identifier, type)
        if (identifierResult === "valid") {
            const passwordResult = validatePassword(password)
            if (passwordResult === "valid") {
                clearFields()
                navigation.navigate("BottomTabNavigator")
            } else {
                setErrText({ ...errText, identifierErr: '', passwordErr: passwordResult })
            }
        } else {
            setErrText({ ...errText, identifierErr: identifierResult })
        }
    }

    // function to clear all the fields
    const clearFields = () => {
        setOtpSent(false)
        setOtp([])
        setLoginWithOtp(false)
        setViewPassword(false)
        setIdentifier('')
        setPassword('')
        setTimer(90)
        setErrText({ identifierErr: '', passwordErr: '', otpErr: '' })
    }

    useLayoutEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setOtpSent(false)
                    setErrText({ ...errText, otpErr: "" })
                    return 90
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [otpSent])

    return (
        <SafeScreen>
            <View style={styles.loginContainer}>
                <Image
                    style={styles.loginImg}
                    source={require('../../images/splash-logo.png')}
                />
                <View style={{ alignItems: 'center', }}>
                    <Text style={[styles.loginHeader, { letterSpacing: 1.2, fontSize: 30 }]}>Welcome back</Text>
                    <Text style={[styles.loginHeader, { marginTop: 10 }]}>to <Text style={{ color: THEME_COLOR }}> Doc8click</Text></Text>
                </View>

                {/* conditonally render the input fields based on the loginWithOtp state */}
                {loginWithOtp
                    ? <View style={styles.loginInputContainer}>
                        <TextInputVarient placeholder='Enter Mobile..' value={identifier || ''} icon={require("../../images/input-icon/mobile.png")} onChangeText={txt => setIdentifier(Number(txt))} keyboardType={'numeric'} setFocus={String(identifier).length ? false : true} errText={errText.identifierErr} />
                        {otpSent
                            ?
                            <View>
                                <OtpField setOtp={setOtp} />
                                {errText.otpErr && <Text style={{ marginLeft: "2%", marginTop: 8, color: "red", fontSize: 14 }}>{errText.otpErr}</Text>}
                                <Text style={{ marginLeft: "2%", marginTop: 8, color: "red", fontSize: 14 }}>OTP expires in: {timer}</Text>
                            </View>
                            : <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn, { width: "100%" }]} onPress={requestOTP} text={sendingOtp ? 'Sending OTP..' : 'Get OTP'} />}
                    </View>
                    : <View style={styles.loginInputContainer}>
                        <TextInputVarient placeholder='Enter Email..' value={identifier} icon={require("../../images/input-icon/email.png")} onChangeText={txt => setIdentifier(txt)} setFocus={String(identifier).length ? false : true} errText={errText.identifierErr} />
                        <TextInputVarient placeholder='Enter Password..' value={password} icon={require("../../images/input-icon/password.png")} onChangeText={txt => setPassword(txt)} viewPassword={viewPassword} setViewPassword={setViewPassword} viewIcon={require("../../images/input-icon/view.png")} hideIcon={require("../../images/input-icon/hide.png")} type='password' errText={errText.passwordErr} />
                    </View>}
                {/* .. */}

                {/* Render login button only if otp is generated || if user is logging in with password */}
                {otpSent && <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn]} onPress={handleOTPLogin} text={'Login'} />}
                {!loginWithOtp && <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn]} onPress={handlePasswordLogin} text={'Login'} />}
                {/* .. */}

                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={{ fontSize: 14, }}>OR</Text>
                    <Text onPress={() => { loginWithOtp ? clearFields() : setLoginWithOtp(true); setIdentifier('') }} style={{ fontSize: 16, marginTop: 8, color: BLUE_COLOR1 }}>{loginWithOtp ? "Login with Email and Password" : "Login with OTP"}</Text>
                </View>
            </View>
        </SafeScreen>
    )
}

export default Login

const styles = StyleSheet.create({
    // styles go here
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 25,
        backgroundColor: MAIN_BG_COLOR,
    },
    loginImg: {
        width: 100,
        height: 100,
    },
    loginHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: MAIN_FONT_COLOR,
    },
    loginInputContainer: {
        width: '100%',
        display: 'flex',
        gap: 20,
        paddingHorizontal: 15,
    },
    loginBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        width: "90%",
        borderRadius: 10,
        elevation: 5
    },
    lableText: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: '600',
    },
    loginInput: {
        width: '100%',
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderColor: MAIN_FONT_COLOR,
        borderRadius: 10,
        fontSize: 20,
    },
})