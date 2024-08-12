import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerGeral: {
        width: 330,
        height: 410,
        backgroundColor: '#B3B3B3',
        borderRadius: 20,
        zIndex:2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom:20
      },
      imagem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        height: 190,
        backgroundColor: 'white',
        marginBottom: -10,
      },
      titulo: {
        marginTop: 20,
      },
      tituloText: {
        color: '#343A40',
        fontWeight: '700',
        fontSize: 40,
      },
      descricao: {
        marginTop: 10,
        maxWidth: '70%',
      },
      descricaoText: {
        textAlign: 'justify',
        fontSize: 13,
      },
      level: {
        fontSize: 20,
        fontWeight: '700',
        color: '#343A40',
        marginTop: 12,
        marginBottom: 12,
      },
      levelBolinha: {
        flexDirection: 'row',
        gap: 5,
      },
      bolinha: {
        width: 25,
        height: 25,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }
})