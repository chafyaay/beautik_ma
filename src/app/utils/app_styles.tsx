import { StyleSheet } from "react-nativescript";

export const colors = {
  __primary: "#F2C230",
  __secondary: "olive",
  __default: "#D9D9D9",
  __disabled: "#D9D9D9",
  __defaultText: "#333",
  __headingText: "black",
  __link: "#1492E6",
  __active: "green",
  __error: "red",
  ___orange: "hotpink",
  ___black: "#000303",
  ___lightGray: "#F7F7F7",
  ___active: "#6CC04A",
};

export const separators = {
  __v10: 10,
  __v20: 20,
  __v30: 30,
  __v40: 40,
  __v50: 50,
};

export const app_styles = StyleSheet.create({
  cartCard: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: colors.___lightGray,
    padding: 20,
  },
  formControl: {
    borderWidth: 1,
    borderColor: "gray",
    height: 50,
    color: colors.__defaultText,
    margin: 10,
    fontSize: 18,
    borderRadius: 3,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#F1F1F1",
    letterSpacing: 1,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: "#CCC",
    borderRadius: 3,
    fontFamily: "",
    fontSize: 17,
  },
  btn: {
    padding: 10,
    margin: 10,
    marginBottom: 10,
    color: colors.___black,
    letterSpacing: 0.1,
    borderWidth: 0,
    borderRadius: 3,
    fontFamily: "",
    fontSize: 17,
    textAlignment: "center",
    alignContent: "center",
    paddingTop: 12,
    width: "100%",
    backgroundColor: colors.__default,
  },
  btn_primary: {
    backgroundColor: colors.__primary,
  },
  isEnabledBtn: {
    backgroundColor: colors.__disabled,
  },
  link: {
    backgroundColor: "transparent",
    color: colors.__link,
  },
  btntext: {
    fontWeight: "bold",
    fontSize: 18,
  },

  discountedPrice: {
    textDecoration: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "gray",
    height: 50,
    color: colors.__defaultText,
    margin: 10,
    fontSize: 18,
    borderRadius: 3,
    paddingLeft: 10,
  },
  h1: {
    fontFamily: "Montserrat-Thin",
    fontSize: 30,
    fontWeight: "600",
    margin: 10,
    marginVertical: separators.__v50,
  },
  h2: {
    fontFamily: "Montserrat-Thin",
    fontSize: 20,
    fontWeight: "600",
    margin: 10,
  },
  h3: {
    fontFamily: "Montserrat-Thin",
    fontSize: 16,
    fontWeight: "500",
    margin: 10,
  },
});
