import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, ScrollView } from "react-native";
import { FontAwesome, Entypo, Feather, EvilIcons, MaterialIcons } from '@expo/vector-icons';


// OpenWeatherMap API Key
API_KEY =''

function getCurrentDateTime() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = monthsOfYear[currentDate.getMonth()];
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
  
    const hours12 = hours % 12 || 12;
  
    const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${amOrPm}`;
  
    return `${dayOfWeek}, ${dayOfMonth} ${month} ${formattedTime}`;
  }


  
const Home = () =>{
    let [isLoading, setLoading] = useState(true)
    let [data, setData] = useState()
    let [error, setError] = useState()
    let [cityName, setCityName] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`

    useEffect(() => {
        fetch(url)
          .then((resp) => resp.json())
          .then((json) => setData(json))
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
    }, [cityName]);

    const getContent = () =>{
        if (cityName === ''){
            
        }
        else if (isLoading){
            return <ActivityIndicator size={"large"} style={{marginVertical: 30}}/>;
        }
        
        else if (error){
            return <Text>Error</Text>
        }

        else if (data){
            try {
                return (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    
                    <View style={styles.locDate}>
                        <Text style={styles.location}>
                        <MaterialIcons name="my-location" size={25} color="#00001C" /> {data.name}</Text>
                        <Text style={styles.date}>{getCurrentDateTime()}</Text>
                    </View>
                    <View style={styles.tempDesc}>
                        <Text style={styles.temp}>{String(Math.round(data.main.temp - 273))+"°"}</Text>
                        <View style={styles.imageDesc}>
                            <Image source={require('../assets/suncloud.png')} style={styles.image}/>
                            <Text style={styles.imgDescText}>{data.weather[0].description}</Text>
                        </View>
                    </View>
                    <View style={styles.stats}>
                        <View style={styles.statItem}>
                            <FontAwesome name="cloud" size={24} color="#00001C" style={styles.statIcon}/>
                            <Text style={styles.figure}>{String(data.clouds.all)+ '%'}</Text>
                            <Text style={styles.statText}>Clouds</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Entypo name="drop" size={24} color="#00001C" style={styles.statIcon} />
                            <Text style={styles.figure}>{String(data.main.humidity)+ '%'}</Text>
                            <Text style={styles.statText}>Humidity</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Feather name="wind" size={24} color="#00001C" style={styles.statIcon}/>
                            <Text style={styles.figure}>{String(data.wind.speed)+ 'm/s'}</Text>
                            <Text style={styles.statText}>Wind Speed</Text>
                        </View>
                    </View>
                </View>
                    
                )
            } catch(error){
                return (
                    <View style={styles.container}>
                        <Text style={{marginTop: -80}}>{cityName} not found</Text>
                    </View>
                )
            }
            
        }
    }
    return(
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-200} style={{flex: 1, paddingTop: 40}}>
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchBar} placeholder="Ghana" 
                    onChangeText={(city)=>{
                        setCityName(city)
                    }}></TextInput>
                    <TouchableOpacity style={styles.searchBtn} onPress={getContent()}>
                        <EvilIcons name="search" size={24} color="#00000080" />
                    </TouchableOpacity>
            </View>
            {getContent()}
        </SafeAreaView>
        </KeyboardAvoidingView>
    )
    
}


export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginTop: 30
    },
    locDate: {
        height: 50,
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        marginTop: 20,
        marginBottom: 35,
        textAlign: 'center'
    },
    location: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00001C',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    date: {
        color: '#00001C',
        fontSize: 18,
        opacity: 0.5,
        textAlign: 'center'
    },
    tempDesc: {
        width: 300,
        height: 280,
        backgroundColor: 'white',
        borderRadius: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        margin: 'auto'
    },
    temp: {
        color: '#00001C',
        fontSize: 120,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 0
    },
    imageDesc:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 20
    },
    imgDescText: {
        fontSize: 20,
        color: '#00001C',
        opacity: 0.8,
        width: 90,
        marginLeft: 20,
        textTransform: 'capitalize'
    },
    stats: {
        width: 300,
        height: 180,
        borderRadius: 50,
        backgroundColor: 'white',
        marginTop: 30,
        paddingHorizontal: 30,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    figure: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00001C',
    },
    statText: {
        color: '#00001C',
        opacity: 0.8,
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 280,
        height: 50,
        borderRadius: 15,
        zIndex: 99,
    },
    searchBar: {
        width: 230,
        height: 50,
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'white',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        borderRightWidth: 0,
    },
    searchBtn: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        borderLeftWidth: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    statIcon: {
        marginBottom: 10,
    }

})