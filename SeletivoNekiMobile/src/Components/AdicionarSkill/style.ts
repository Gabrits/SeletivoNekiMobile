import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
      },
      cardModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.637)',
        padding: 20,
      },
      conteudoModal: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#181818',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',
      },
      closeButtonContainer: {
        alignSelf: 'flex-start',
        paddingBottom: 15,
        color:"white"
      },
      title: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily:"montserrat-regular",
        paddingBottom:20
      },
      error: {
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 10,
      },
      caixaEntrada: {
        width: '100%',
        marginBottom: 20,
      },
      picker: {
        width: '100%',
        backgroundColor: '#272727',
        color: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        alignItems:"center",
      },
      containerBotao:{
        alignItems:"center"
      }
    });