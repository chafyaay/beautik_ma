import { Color } from "@nativescript/core";
import { StyleSheet } from "react-nativescript";
export const colors = {
  default: new Color("#323E40"),
  primary: new Color("#FDB846"),
  sky: new Color("#69B7BF"),
  dark: new Color("#40373C"),
  lighter: new Color("#F1F1F1"),
  light: new Color("#CCC"),
  active: new Color("#29AD5D"),
  text: new Color("#747E7E"),
  textInverse: new Color("white"),
};
const btnComunStyles = {
  padding: 10,
  fontSize: 16,
  textTransform: "uppercase",
  letterSpacing: 0.05,
  fontWeight: "500",
  borderRadius: 3,
  marginTop: 10,
  marginBottom: 10,
};
export const styles = {
  btn: StyleSheet.create({
    default: {
      ...btnComunStyles,
      backgroundColor: colors.primary,
      color: colors.dark,
    },
    primary: {
      ...btnComunStyles,
      backgroundColor: colors.default,
      color: colors.textInverse,
    },
    disabled: {
      ...btnComunStyles,
      backgroundColor: colors.default,
      color: colors.dark,
    },
  }),
  addItem: StyleSheet.create({
    buy: {},
    updateCart: {
      width: "40",
      height: 40,
    },
    removeItem: {
      width: "33,33%",
      height: 50,
      color: colors.default,
      horizontalAlignment: "left",
    },
    qnteHolnder: {
      width: 40,
      borderColor: colors.dark,
      borderWidth: 2,
      textAlignment: "center",
      fontSize: 16,
      borderRadius: 3,
      backgroundColor: colors.lighter,
    },
  }),
  productCard: StyleSheet.create({
    card: {
      padding: 10,
      margin: 10,
      backgroundColor: "",
      letterSpacing: 1,
      borderWidth: 1,
      borderBottomWidth: 5,
      borderColor: colors.lighter,
      borderRadius: 3,
      fontFamily: "",
      fontSize: 17,
    },
    cover: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.light,
      marginRight: 20,
    },
    title: {
      color: colors.dark,
      fontSize: 16,
    },
    price: {
      color: colors.dark,
      fontSize: 25,
      fontWeight: "bold",
    },
    oldPrice: {
      color: colors.light,
      fontSize: 25,
      textDecoration: "line-through",
      fontWeight: "bold",
    },
    promo: {
      backgroundColor: colors.primary,
      color: colors.lighter,
      horizontalAlignment: "left",
      verticalAlignment: "top",
      fontWeight: "bold",
      borderRadius: 3,
      width: 50,
      height: 50,
    },
  }),
};
