import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedScreen from "@/pages/GetStartedScreen";
import HomePageScreen from "@/pages/HomePageScreen";
import CategoryScreen from "@/pages/CategoryScreen";
import ComicDetailScreen from "@/pages/ComicDetailScreen";
import ComicReadScreen from "@/pages/ComicReadScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="GetStartedScreen">
        <Stack.Screen
          name="GetStartedScreen"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePageScreen"
          component={HomePageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComicDetailScreen"
          component={ComicDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComicReadScreen"
          component={ComicReadScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
