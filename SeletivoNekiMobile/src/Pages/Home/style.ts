import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
  },
  titulo: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    marginTop: 125,
    marginBottom: 20,
  },
  bemVindo1: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
  },
  bemVindo2: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    marginTop: -10,
  },
  descricao: {
    color: '#B3B3B3',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  divisor: {
    width: '90%',
    height: 1,
    backgroundColor: '#B3B3B3',
    marginVertical: 20,
  },
  tituloSkills: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cardsContainer: {
    alignContent:"center",
    paddingHorizontal: 16,
    marginBottom:100

  },
});