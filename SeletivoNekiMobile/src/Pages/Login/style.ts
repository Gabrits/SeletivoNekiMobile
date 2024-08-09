import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#0F0F0F",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    card: {
      width: 350,
      height: 430,
      backgroundColor: "#181818",
      borderRadius: 15,
      alignItems: "center",
      padding: 20,
    },
    titulo: {
      fontSize: 50,
      color: "#FFFFFF",
      fontFamily: 'montserrat-regular',
      fontWeight: "500",
      marginTop: 10,
      marginBottom: 20,
    },
    caixaEntrada: {
    },
    checkboxContainer: {
        justifyContent:"center",
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
      width: '100%',
    },
    checkbox: {
      marginRight: 10,
    },
    checkboxLabel: {
      fontSize: 16,
      color: '#7D7D7D',
    },
    backButton: {
      position: 'absolute',
      top: 70,
      left: 35,
    },
    textoCadastro: {
        flexDirection:"row",
        gap:5,
        color:"white",
        marginTop:6,
    },
    texto:{
        color:"#7D7D7D",
        fontSize:16
    },
    cadastro:{
        color:"#19536E",
        fontSize:16,
        fontWeight:"bold"
    }
  });
