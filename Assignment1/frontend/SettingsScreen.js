import React,{useState} from "react";
import styles from "../style";
import {View , Text , Switch} from "react-native";

export default function SettingsScreen()  {
    // State for controlling Dark Mode
    const [darkMode, setDarkMode] = useState(false);
    return(
        // Change between dark and light mode
    <View style={ darkMode ? styles.dark  :   styles.light}>
<Switch value={darkMode} onValueChange={()  => setDarkMode(!darkMode)} />
    </View>
    );
}