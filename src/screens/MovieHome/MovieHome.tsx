import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RootScreenProps } from '../../types/navigation'
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen'
import { MAIN_BG_COLOR } from '../../utils/colors'
import { getMovies } from '../../services/movies'
import { movie } from '../../types/schemas/movie/movie'


const carouselCard = ({ item }: { item: movie }) => {
    return (
        <View>
            <Text>{item.title}</Text>
        </View>
    )
}

const MovieHome = ({ navigation }: RootScreenProps) => {
    const [movies, setMovies] = useState<movie[]>([])

    useLayoutEffect(() => {
        getMovies().then((movies) => {
            console.log(movies)
        })
    }, [])

    return (
        <SafeScreen>
        </SafeScreen>
    )
}

export default MovieHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_BG_COLOR
    }
})