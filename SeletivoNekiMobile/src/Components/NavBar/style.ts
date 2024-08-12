import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerGeral: {
        position:"absolute",
        height: 100,
        width: "100%",
        backgroundColor: "#1E1E1E",
        flexDirection: "row",
        top:0,
        borderBottomColor:"#B3B3B3",
        borderBottomWidth: 1,
        justifyContent:"space-between"
    },
    logo: {
        width: 80,
        height: 80,
        top:20
      },
    
      logoutIcon: {
        width: 24,
        height: 24,
        top:43,
        right:20
      },

      textoCadastro:{
        position:"absolute",
        top:45,
        left:90,
        fontWeight:"bold"
      },

      texto:{
      },

      cadastro:{
        color:"white",
        fontWeight:"bold",
        fontFamily:"montserrat-regular",
        fontSize: 18
      }
    
})