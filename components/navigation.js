import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "../screens/people/peopleScreen";
import DecisionScreenNavigation from "../screens/decision/decisionScreenNavigation";
import RestaurantsScreen from "../screens/restaurants/restaurantsScreen";
import { Image, Platform } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const platformOS = Platform.OS.toLowerCase();

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Decision"
        tabBarPosition={"top"}
        screenOptions={{
          animationEnabled: true,
          swipeEnabled: true,
          lazy: true,
          tabBarActiveTintColor: "#ff0000",
          tabBarStyle: {
            paddingTop: Constants.statusBarHeight,
          },
        }}
      >
        <Tab.Screen
          name="People"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/urfu/icon-people.png")}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
          component={PeopleScreen}
        />
        <Tab.Screen
          name="Decision"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/urfu/icon-decision.png")}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
          component={DecisionScreenNavigation}
        />
        <Tab.Screen
          name="Restaurants"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/urfu/icon-restaurants.png")}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            ),
          }}
          component={RestaurantsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
