import React from "react";
import styles from "../style";
import { useFonts } from "expo-font";
import {View , Text , ImageBackground, TouchableOpacity} from "react-native";
// Home Screen with background image and navigation buttons

// Navigate to Profile Screen,gotoContactScreen, gotoSettingsScreen
export default function HomeScreen({gotoProfileScreen, gotoContactScreen, gotoSettingsScreen}) {


    return(
       
            
       <ImageBackground source={require('../assets/background.avif')} style={styles.backgroundImage}>
         <View style={styles.container}>
            <Text style={styles.title}>Student App!</Text>
        <TouchableOpacity style={styles.button} onPress={gotoProfileScreen}>
        <Text>Profile</Text>
        </TouchableOpacity>
       <TouchableOpacity
  style={styles.button}
  onPress={gotoContactScreen}
>
  <Text>Contact</Text>
</TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={gotoSettingsScreen}>
        <Text>Settings</Text>
        </TouchableOpacity>

</View>
       </ImageBackground>
      
    )
}
