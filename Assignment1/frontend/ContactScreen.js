import React ,{useState}from "react";
import styles from "../style";
import { FontAwesome } from "@expo/vector-icons";

import {View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
export default function ContactScreen(){
    // State for storing email entered by the user
    const [email,setEmail] =useState("");
    return(
        <View style={styles.container}>
            <FontAwesome name="envelope" size={24} color="blue" />
            <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={text => setEmail(text)} />
                <TouchableOpacity
         style={styles.button}
  onPress={() => Alert.alert("Email submitted:", email)}

      >
        <Text>Submit</Text>
      </TouchableOpacity>
          
        </View>
);
}