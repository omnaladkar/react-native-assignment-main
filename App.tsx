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
import SplashScreen from 'react-native-splash-screen'
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTodoItem, getTodoItems} from './helper';
import MyTabs from './src/Navigation/navigation'
 

import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
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
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <NavigationContainer>
    <MyTabs/>
    </NavigationContainer>
    </SafeAreaView>
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
