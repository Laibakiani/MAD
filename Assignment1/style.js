import { StyleSheet } from "react-native";
// Common styles for all screens
const styles = StyleSheet.create({
 backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        width: 280,
  
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 15,
  marginBottom: 15,
    },
    text: {
       fontSize: 18,
    marginBottom: 10
    },
    profileTitle: {
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: 20,
},

   profileImage: {
    width: 120,
  height: 120,
  borderRadius: 60,
  marginBottom: 25,
},

// Dark and light mode styles

  dark: {
    backgroundColor: "black",
    flex:3
  },

  light: {
    backgroundColor: "white",
    
  }

});
export default styles;