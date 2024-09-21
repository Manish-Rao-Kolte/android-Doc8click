import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RootScreenProps } from '../../types/navigation'
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen'
import TextInputVarient from '../../components/atoms/TextInputVarient/TextInputVarient'
import { BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3, MAIN_BG_COLOR, MAIN_FONT_COLOR, THEME_COLOR } from '../../utils/colors'
import LinerGradientVarient from '../../components/atoms/LinerGradientVarient/LinerGradientVarient'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { validateEmail, validatePassword, validatePhone } from '../../utils/authValidate'
import { authSelector, resetError, signup } from '../../redux/reducers/authSlice/authSlice'
import GenderSelect from '../../components/molecules/GenderSelect/GenderSelect'


const signupData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: 'male',
    confirmPassword: ''
}

const error = {
    fullNameErr: '',
    usernameErr: '',
    emailErr: '',
    phoneNumberErr: '',
    passwordErr: '',
    confirmPasswordErr: ''
}

const Signup = ({ navigation }: RootScreenProps<'Signup'>) => {
    const dispatch = useDispatch()
    const { isLoading, isError } = useSelector(authSelector)
    const [viewPassword, setViewPassword] = useState<boolean>(false)
    const [errText, setErrText] = useState(error)
    const [fullName, setFullName] = useState<string>('')
    const [signupForm, setSignupForm] = useState(signupData)

    // function to clear all the fields
    const clearFields = () => {
        setFullName('')
        setSignupForm(signupData)
        setErrText(error)
    }

    // function to handle signup
    const handleSignup = () => {
        dispatch(resetError());
        if (!fullName) {
            setErrText({ ...errText, fullNameErr: "Please enter fullname" })
            return
        }
        if (!signupForm.username) {
            setErrText({ ...errText, usernameErr: "Please enter username" })
            return
        }
        const emailResult = validateEmail(signupForm.email);
        if (emailResult !== "valid") {
            setErrText({ ...errText, emailErr: emailResult })
            return
        }
        const phoneNumberResult = validatePhone(signupForm.phoneNumber);
        if (phoneNumberResult !== "valid") {
            setErrText({ ...errText, phoneNumberErr: phoneNumberResult })
            return
        }
        const passwordResult = validatePassword(signupForm.password);
        if (passwordResult !== "valid") {
            setErrText({ ...errText, passwordErr: passwordResult })
            return
        }
        if (!signupForm.confirmPassword) {
            setErrText({ ...errText, confirmPasswordErr: "Please enter confirm password" })
            return
        }
        if (signupForm.password !== signupForm.confirmPassword) {
            setErrText({ ...errText, confirmPasswordErr: "Password does not match" })
            return
        }

        dispatch<any>(signup(signupForm)).then((res: any) => {
            if (res.payload) {
                if (!res.error) {
                    clearFields();
                }
            }
        });
    }

    // function to handle fullname input and split the fullname into first name and last name
    const handleNameInput = (txt: string) => {
        const txtArray = txt.split(' ');
        const firstName = txtArray[0] || '';
        const lastName = txtArray[txtArray.length - 1] || '';
        setErrText({ ...errText, fullNameErr: '' })
        setFullName(txt)
        setSignupForm({ ...signupForm, firstName, lastName })
    }

    return (
        <SafeScreen>
            <ScrollView>
                <View style={styles.loginContainer}>
                    <Image
                        style={styles.loginImg}
                        source={require('../../images/splash-logo.png')}
                    />
                    <View style={{ alignItems: 'center', }}>
                        <Text style={[styles.loginHeader, { letterSpacing: 1.2, fontSize: 30 }]}>Welcome to</Text>
                        <Text style={[styles.loginHeader, { color: THEME_COLOR }]}> Doc8click</Text>
                    </View>

                    {isError && <Text style={[styles.lableText, { color: "red" }]}>{isError}</Text>}

                    <View style={styles.loginInputContainer}>
                        {/* FullName */}
                        <TextInputVarient placeholder='Enter Fullname..' value={fullName} icon={require("../../images/input-icon/name.png")} onChangeText={handleNameInput} errText={errText.fullNameErr} />
                        {/* Username */}
                        <TextInputVarient placeholder='Enter Username..' value={signupForm.username} icon={require("../../images/input-icon/username.png")} onChangeText={txt => { setErrText({ ...errText, usernameErr: "" }); setSignupForm({ ...signupForm, username: txt }) }} errText={errText.usernameErr} />
                        {/* Email */}
                        <TextInputVarient placeholder='Enter Email..' value={signupForm.email} icon={require("../../images/input-icon/email.png")} onChangeText={txt => { setErrText({ ...errText, emailErr: "" }); setSignupForm({ ...signupForm, email: txt }) }} errText={errText.emailErr} />
                        {/* Phone number */}
                        <TextInputVarient placeholder='Enter Phone Number..' value={signupForm.phoneNumber} keyboardType={'numeric'} icon={require("../../images/input-icon/mobile.png")} onChangeText={txt => { setErrText({ ...errText, phoneNumberErr: "" }); setSignupForm({ ...signupForm, phoneNumber: txt }) }} errText={errText.phoneNumberErr} />
                        {/* Gender */}
                        <GenderSelect selectedGender={signupForm.gender} onGenderSelect={(val: string) => setSignupForm({ ...signupForm, gender: val })} />
                        {/* Password */}
                        <TextInputVarient placeholder='Enter Password..' value={signupForm.password} icon={require("../../images/input-icon/password.png")} onChangeText={txt => { setErrText({ ...errText, passwordErr: "" }); setSignupForm({ ...signupForm, password: txt }) }} viewPassword={viewPassword} setViewPassword={setViewPassword} viewIcon={require("../../images/input-icon/view.png")} hideIcon={require("../../images/input-icon/hide.png")} type='password' errText={errText.passwordErr} />
                        {/* Confirm Password */}
                        <TextInputVarient placeholder='Confirm Password..' value={signupForm.confirmPassword} icon={require("../../images/input-icon/cnf-password.png")} onChangeText={txt => { setErrText({ ...errText, confirmPasswordErr: "" }); setSignupForm({ ...signupForm, confirmPassword: txt }) }} errText={errText.confirmPasswordErr} />
                    </View>

                    <LinerGradientVarient gradientColors={[BLUE_COLOR1, BLUE_COLOR2, BLUE_COLOR3]} gradientStyle={[styles.loginBtn]} onPress={handleSignup} text={'Signup'} isLoading={isLoading} />

                    <View style={{ display: "flex", alignItems: "center" }}>
                        <Text onPress={() => { }} style={{ fontSize: 16, marginTop: 8, color: MAIN_FONT_COLOR }}>Already have an account? <Text style={{ color: BLUE_COLOR1, fontWeight: '700', letterSpacing: 0.5, fontSize: 17 }} onPress={() => { navigation.navigate("Login"); clearFields(); dispatch(resetError()) }}>Login</Text></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default Signup

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