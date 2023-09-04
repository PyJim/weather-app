import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Starting from './screens/Starting';
import Home from './screens/Home';

const Stack = createNativeStackNavigator()

export default function App() {
  return (


    <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="start" component={Starting} options={{ headerShown: false }}/>
          <Stack.Screen name="home" component={Home} options={{ headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
