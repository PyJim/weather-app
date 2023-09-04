import { Link } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';


const Starting = ({navigation}) =>{
    return (
        
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/suncloud.png')} style={styles.image} />
            <Text style={styles.weatherText}>Weather</Text>
            <Text style={styles.forecastText}>Forecasts</Text>
            <Text style={styles.desc}>Your Pocket Meteorologist...</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('home')}>
                <Text style={styles.getStarted}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
}

export default Starting;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 50,
    },
    weatherText: {
        color: '#00001C',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    forecastText: {
        color: '#00001C',
        fontSize: 50,
        marginBottom: 20
    },
    desc: {
        fontSize: 16,
        textAlign: 'center',
        color: '#00001C',
        width: 250,
        opacity: 0.7,
        marginBottom: 50
    },
    button: {
        width: 250,
        height: 50,
        borderRadius: 45,
        backgroundColor: '#00001C',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
    },
    getStarted: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
})