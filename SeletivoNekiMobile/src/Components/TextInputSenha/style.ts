import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  estiloTextInput: {
    backgroundColor: "#272727",
    marginTop: 15,
    width: 330,
    height: 55,
    borderRadius: 15,
    paddingLeft: 20,
    fontSize: 15,
    fontFamily: "montserrat-regular",
    color: "white",
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -6 }],
  },
  icon: {
    zIndex: 1000,
  },
});
