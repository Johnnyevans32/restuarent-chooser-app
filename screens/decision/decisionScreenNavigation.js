import { createStackNavigator } from "@react-navigation/stack";
import ChoiceScreen from "./choiceScreen";
import DecisionScreen from "./decisionScreen";
import PostChoiceScreen from "./postChoiceScreen";
import PreFiltersScreen from "./preFiltersScreen";
import WhosGoingScreen from "./whosGoingScreen";

const Stack = createStackNavigator();

const DecisionScreenNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DecisionTimeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DecisionTimeScreen" component={DecisionScreen} />
      <Stack.Screen name="WhosGoingScreen" component={WhosGoingScreen} />
      <Stack.Screen name="PreFiltersScreen" component={PreFiltersScreen} />
      <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} />
      <Stack.Screen name="PostChoiceScreen" component={PostChoiceScreen} />
    </Stack.Navigator>
  );
};

export default DecisionScreenNavigation;
