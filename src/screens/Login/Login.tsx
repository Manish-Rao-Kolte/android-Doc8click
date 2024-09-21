import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RootScreenProps } from '../../types/navigation'
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen'
import TextInputVarient from '../../components/atoms/TextInputVarient/TextInputVarient'
import { BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3, MAIN_BG_COLOR, MAIN_FONT_COLOR, THEME_COLOR } from '../../utils/colors'
import LinerGradientVarient from '../../components/atoms/LinerGradientVarient/LinerGradientVarient'
import OtpField from '../../components/molecules/OtpField/OtpField'
import { validateEmail, validatePassword, validatePhone } from '../../utils/authValidate'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, login, resetError, sendOTP } from '../../redux/reducers/authSlice/authSlice'


const loginFormData = {
    email: '',
    phoneNumber: '',
    password: '',
    otp: ''
}

const error = {
    emailErr: '',
    phoneNumberErr: '',
    passwordErr: '',
    otpErr: ''
}

const Login = ({ navigation }: RootScreenProps<'Login'>) => {
    const dispatch = useDispatch()
    const { userData, isLoading, sendingOtp, isError } = useSelector(authSelector)
    const [loginForm, setLoginForm] = useState(loginFormData)
    const [viewPassword, setViewPassword] = useState<boolean>(false)
    const [loginWithOtp, setLoginWithOtp] = useState<boolean>(false)
    const [otpSent, setOtpSent] = useState<boolean>(false)
    const [errText, setErrText] = useState(error)
    const [timer, setTimer] = useState<number>(90)


    // function to request otp and mock as api call
    const requestOTP = () => {
        if (errText.phoneNumberErr) return
        dispatch<any>(sendOTP({ phoneNumber: loginForm.phoneNumber })).then((res: { payload: any }) => {
            if (res.payload) {
                setOtpSent(true)
            }
        })
    }

    // function to handle login with otp or password
    const handleLogin = () => {
        dispatch(resetError());
        if (otpSent) {
            const phoneNumberResult = validatePhone(loginForm.phoneNumber)
            if (phoneNumberResult !== "valid") {
                setErrText({ ...errText, phoneNumberErr: phoneNumberResult })
                return
            }
            if (loginForm.otp.length !== 6) {
                setErrText({ ...errText, otpErr: "Please enter valid OTP" })
                return
            }

            dispatch<any>(login({ phoneNumber: loginForm.phoneNumber, otp: loginForm.otp })).then((res: any) => {
                if (res.payload) {
                    if (!res.error) {
                        clearFields()
                    }
                }
            })
        } else {
            const emailResult = validateEmail(loginForm.email)
            if (emailResult !== "valid") {
                setErrText({ ...errText, emailErr: emailResult })
                return
            }
            const passwordResult = validatePassword(loginForm.password)
            if (passwordResult !== "valid") {
                setErrText({ ...errText, passwordErr: passwordResult })
                return
            }
            dispatch<any>(login({ email: loginForm.email, password: loginForm.password })).then((res: any) => {
                if (res.payload) {
                    if (!res.error) {
                        clearFields()
                    }
                }
            })
        }
    }

    // function to clear all the fields
    const clearFields = () => {
        setLoginForm(loginFormData)
        setOtpSent(false)
        setLoginWithOtp(false)
        setViewPassword(false)
        setErrText(error)
    }

    // function to go on password login screen
    const handleLoginWithPasswordClick = () => {
        setLoginWithOtp(false)
        setOtpSent(false)
        setErrText(error)
        setLoginForm(loginFormData)
        dispatch(resetError())
    }

    // function to go on otp login screen
    const handleLoginWithOtpClick = () => {
        setLoginWithOtp(true)
        setOtpSent(false)
        setErrText(error)
        setLoginForm(loginFormData)
        dispatch(resetError())
    }

    // function to navigate to signup screen
    const handleSignupNavigation = () => {
        navigation.navigate("Signup");
        clearFields();
        dispatch(resetError())
    }

    // function to handle the toggle between otp and password login
    const handleOtpPasswordToggle = () => {
        if (loginWithOtp) handleLoginWithPasswordClick()
        else handleLoginWithOtpClick()
    }

    // function to handle the timer for otp
    useLayoutEffect(() => {
        dispatch(resetError())
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
                {isError && <Text style={[styles.lableText, { color: "red" }]}>{isError}</Text>}

                {/* conditonally render the input fields based on the loginWithOtp state */}
                {loginWithOtp
                    ? <View style={styles.loginInputContainer}>
                        <TextInputVarient placeholder='Enter Mobile..' value={loginForm.phoneNumber} icon={require("../../images/input-icon/mobile.png")} onChangeText={txt => { setErrText({ ...errText, phoneNumberErr: '' }); setLoginForm({ ...loginForm, phoneNumber: txt }) }} keyboardType={'numeric'} errText={errText.phoneNumberErr} />
                        {otpSent
                            ?
                            <View>
                                <OtpField loginForm={loginForm} setLoginForm={setLoginForm} />
                                {errText.otpErr && <Text style={{ marginLeft: "2%", marginTop: 8, color: "red", fontSize: 14 }}>{errText.otpErr}</Text>}
                                <Text style={{ marginLeft: "2%", marginTop: 8, color: "red", fontSize: 14 }}>OTP expires in: {timer}</Text>
                            </View>
                            : <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn, { width: "100%" }]} onPress={() => !isLoading && requestOTP()} text={sendingOtp ? 'Sending OTP..' : 'Get OTP'} />}
                    </View>
                    : <View style={styles.loginInputContainer}>
                        <TextInputVarient placeholder='Enter Email..' value={loginForm.email} icon={require("../../images/input-icon/email.png")} onChangeText={txt => { setErrText({ ...errText, emailErr: '' }); setLoginForm({ ...loginForm, email: txt }) }} errText={errText.emailErr} />
                        <TextInputVarient placeholder='Enter Password..' value={loginForm.password} icon={require("../../images/input-icon/password.png")} onChangeText={txt => { setErrText({ ...errText, passwordErr: '' }); setLoginForm({ ...loginForm, password: txt }) }} viewPassword={viewPassword} setViewPassword={setViewPassword} viewIcon={require("../../images/input-icon/view.png")} hideIcon={require("../../images/input-icon/hide.png")} type='password' errText={errText.passwordErr} />
                    </View>}
                {/* .. */}

                {/* Render login button only if otp is generated || if user is logging in with password */}
                {otpSent && <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn]} onPress={() => !isLoading && handleLogin()} text={'Login'} isLoading={isLoading} />}
                {!loginWithOtp && <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn]} onPress={() => !isLoading && handleLogin()} text={'Login'} isLoading={isLoading} />}
                {/* .. */}

                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={{ fontSize: 14, }}>OR</Text>
                    <Text onPress={() => !isLoading && handleOtpPasswordToggle()} style={{ fontSize: 16, marginTop: 8, color: BLUE_COLOR1 }}>{loginWithOtp ? "Login with Email and Password" : "Login with OTP"}</Text>
                </View>
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={{ fontSize: 16, marginTop: 0, color: MAIN_FONT_COLOR }}>Don't have an account? <Text style={{ color: BLUE_COLOR1, fontWeight: '700', letterSpacing: 0.5, fontSize: 17 }} onPress={() => !isLoading && handleSignupNavigation()}>Signup</Text></Text>
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