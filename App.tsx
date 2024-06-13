/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * @format
 */

import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  Platform
} from 'react-native';


import { Provider } from 'react-redux';
import store from './redux';
import SplashScreen from 'react-native-splash-screen'
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTodoItem, getTodoItems} from './helper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/Navigation/navigation'
import Profile from './src/Screens/Profile'
 import Todo from  './src/Screens/TodoScreen'

import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// const Tab = createBottomTabNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(()=>{ 
    
    SplashScreen.hide();
  },[])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [todoItems, setTodoItems] = React.useState([]);
  const [newTodoItem, setNewTodoItem] = React.useState('');
  useEffect(() => {
    getTodoItems(0, 10).then(items => setTodoItems(items));
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <NavigationContainer>
    {/* <MyTabs/> */}
    <Stack.Navigator initialRouteName="Home">
   
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Todo" component={Todo} options={({ route }) => ({ title: route.params.item.text })} />

    
    </NavigationContainer>
    </Stack.Navigator>
    {/* <TodoScreen/> */}
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
  },
});

export default App;
