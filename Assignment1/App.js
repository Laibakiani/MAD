import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer ,useNavigation } from '@react-navigation/native';
// Create Stack Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 //Create Bottom Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./frontend/HomeScreen";
import ProfileScreen from "./frontend/ProfileScreen";
import ContactScreen from "./frontend/ContactScreen";
import SettingsScreen from "./frontend/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function Tabs() {
  const navigation = useNavigation();
// Navigation functions passed to HomeScreen as props
  const gotoProfileScreen = () => {
   navigation.navigate("MainTabs", { screen: "Profile" });
  };

  const gotoContactScreen = () => {
   navigation.navigate("Contact");
  };

  const gotoSettingsScreen = () => {
   navigation.navigate("MainTabs", { screen: "Settings" });
  }; 
return (
   <Tab.Navigator>

      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            gotoProfileScreen={gotoProfileScreen}
            gotoContactScreen={gotoContactScreen}
            gotoSettingsScreen={gotoSettingsScreen}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile" component={ProfileScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
 );
}
  
export default function App() {
  const [fontsLoaded] = useFonts({
  MyFont: require("./assets/Poppins-Regular.ttf"),
});
if (!fontsLoaded) {
  return null;
}
  
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="MainTabs" component={Tabs} />
 
<Stack.Screen name="Contact" component={ContactScreen} />
 
</Stack.Navigator>
</NavigationContainer>
);
}
 