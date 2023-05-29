import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useStorage from './Storage';

import CoffeeScreen from './screens/CoffeeScreen';
import RatingScreen from './screens/RatingScreen';
import BrewMethodScreen from './screens/BrewMethodScreen';
import { BrewingMethod, Coffee, Rating } from './Types';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {

  const [coffees, setCoffees] = useStorage<Coffee[]>("coffee");
  const [brewMethods, setBrewMethods] = useStorage<BrewingMethod[]>("brewMethod");
  const [ratings, setRatings] = useStorage<Rating[]>("rating");

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Rating'
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="star-check" color={color} size={size} />
            ),
          }}
          children={() =>
            <RatingScreen ratings={ratings} setRatings={setRatings} coffees={coffees} brewMethods={brewMethods} />
          }

        />
        <Tab.Screen
          name='Coffee'
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="seed" color={color} size={size} />
            ),
          }}
          children={() =>
            <CoffeeScreen coffees={coffees} setCoffees={setCoffees} />
          }
        />
        <Tab.Screen
          name='Brew Method'
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="coffee-maker" color={color} size={size} />
            ),
          }}
          children={() =>
            <BrewMethodScreen brewMethods={brewMethods} setBrewMethods={setBrewMethods} />
          }
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );

}
