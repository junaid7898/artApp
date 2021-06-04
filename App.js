import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signin from './src/Screens/shared/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Signup from './src/Screens/shared/Signup';
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as ProductProvider } from './src/context/productContext';
import { Provider as OrderProvider } from './src/context/orderContext';
import { navigationRef } from './src/rootNavigation';
import * as rootNavigation from './src/rootNavigation';
import ProductScreen from './src/Screens/buyer/ProductScreen';
import UploadScreen from './src/Screens/artist/UploadScreen';
import UploadForm from './src/Screens/artist/UploadForm';
import OrderScreen from './src/Screens/artist/OrderScreen';
import OrderDetailScreen from './src/Screens/buyer/OrderDetailScreen';
import CartScreen from './src/Screens/buyer/CartScreen';
import PaintingScreen from './src/Screens/buyer/PaintingScreen';
import { TabBarIOS } from 'react-native';
import PaintingScreenA from './src/Screens/artist/PaintingScreenA';
import ExhibitionScreen from './src/Screens/buyer/ExhibitionScreen';
import {
  FontAwesome5,
  Entypo,
  FontAwesome,
  AntDesign,
} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';

//tab bar for buyer
function Home() {
  const Tab = createBottomTabNavigator();
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Product') {
            iconName = focused ? 'images' : 'images';
          } else if (route.name === 'PaintingScreenB') {
            iconName = focused ? 'color-palette' : 'color-palette';
          } else if (route.name === 'OrderDetail') {
            iconName = focused ? 'reorder' : 'reorder';
          } else if (route.name === 'ExhibitionScreen') {
            iconName = focused ? 'grid' : 'grid';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: 'Pictures' }}
      />
      <Tab.Screen
        name="PaintingScreenB"
        component={PaintingScreen}
        options={{ title: 'Painting' }}
      />
      <Tab.Screen
        name="ExhibitionScreen"
        component={ExhibitionScreen}
        options={{ title: 'Exhibition' }}
      />
      <Tab.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: 'Orders' }}
      />
    </Tab.Navigator>
  );
}

//tab bar for artist
function ArtistHome() {
  const Tab = createBottomTabNavigator();
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Upload') {
            iconName = focused ? 'camera' : 'camera';
          } else if (route.name === 'PaintingScreenA') {
            iconName = focused ? 'color-palette' : 'color-palette';
          } else if (route.name === 'Order') {
            iconName = focused ? 'help' : 'help';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{ title: 'images' }}
      />
      <Tab.Screen
        name="PaintingScreenA"
        component={PaintingScreenA}
        options={{ title: 'paintings' }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{ title: 'Orders' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    switch (routeName) {
      case 'Product':
        return 'Pictures';
      case 'PaintingScreenB':
        return 'Paintings';
      case 'OrderDetail':
        return 'Orders';
      case 'UploadForm':
        return 'Upload';
      case 'Order':
        return 'Orders';
      case 'Upload':
        return 'Gallery';
      case 'ExhibitionScreen':
        return 'Exhibition';
    }
  }

  return (
    <OrderProvider>
      <ProductProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Home"
                component={Home}
                options={({ route }) => ({
                  headerTitle: getHeaderTitle(route),
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerLeft: () => (
                    <Button
                      icon={
                        <AntDesign name="profile" size={30} color="white" />
                      }
                      type="clear"
                    />
                  ),
                  headerRight: () => (
                    <Button
                      icon={
                        <FontAwesome5
                          name="sign-out-alt"
                          size={30}
                          color="white"
                        />
                      }
                      onPress={() => rootNavigation.navigate('Login')}
                      type="clear"
                    />
                  ),
                })}
              />
              <Stack.Screen name="Login" component={Signin} />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ title: 'Sign Up' }}
              />
              {/* <Stack.Screen name="Product" component={ProductScreen} /> */}
              <Stack.Screen
                name="ArtistHome"
                component={ArtistHome}
                options={({ route }) => ({
                  headerTitle: getHeaderTitle(route),
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerLeft: () => (
                    <Button
                      icon={<AntDesign name="plus" size={30} color="white" />}
                      type="clear"
                      onPress={() => rootNavigation.navigate('UploadForm')}
                    />
                  ),
                  headerRight: () => (
                    <Button
                      icon={
                        <FontAwesome5
                          name="sign-out-alt"
                          size={30}
                          color="white"
                        />
                      }
                      onPress={() => rootNavigation.navigate('Login')}
                      type="clear"
                    />
                  ),
                })}
              />
              <Stack.Screen name="UploadForm" component={UploadForm} />
              {/* <Stack.Screen name="Order" component={OrderScreen} /> */}
              {/* <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
              <Stack.Screen name="Cart" component={CartScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ProductProvider>
    </OrderProvider>
  );
}
