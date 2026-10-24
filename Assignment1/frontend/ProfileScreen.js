// assignment 1
import React,{useState} from "react";
import styles from "../style";
import {View , Text , Image, TextInput} from "react-native";

export default function ProfileScreen()  {
    // State for storing the user's name and age
    const [profileName, setProfileName] = useState("");
    const [profileAge, setProfileAge] = useState("");
return(
    <View style={styles.container}>
        <Text style={styles.profileTitle}>Profile</Text>
       
<Image style={styles.profileImage} source={{uri: 'https://media.wired.com/photos/5fdb8cf40d43f1e1eafb6eeb/3:2/w_2560%2Cc_limit/Science_nightsky_462555821.jpg'}}/>




<TextInput style={styles.input} placeholder="Enter your name" value={profileName} onChangeText={text => setProfileName(text)} />
     
    <Text style={styles.text}>Name: {profileName}</Text>
  
<TextInput style={styles.input} placeholder="Enter your age"  value={profileAge}  onChangeText={text => setProfileAge(text)} />
    <Text style={styles.text}>Age: {profileAge}</Text>
     
 
    </View>
);
    }