import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoScreen from '../../TodoScreen';
import ProfileScreen from '/profileScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
