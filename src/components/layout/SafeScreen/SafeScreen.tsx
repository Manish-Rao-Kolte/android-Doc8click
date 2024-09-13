import { StatusBar, StyleSheet, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreen = ({ children }: PropsWithChildren) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            // backgroundColor: '#3f3f3f',
        }}>
            <StatusBar backgroundColor="#02386e" translucent={true} />
            {children}
        </View>
    )
}

export default SafeScreen

const styles = StyleSheet.create({})