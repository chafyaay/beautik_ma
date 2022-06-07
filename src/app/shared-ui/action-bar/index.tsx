import { Frame } from "@nativescript/core";
import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { AppContext } from "../../utils/context";
import { colors, app_styles } from "../../utils/app_styles";
import { Icart } from "../../utils/props.interfaces";
import { getItem } from "../../utils/storage";

function NavBar({ options }) {
  const { navigation, qnte } = options;
  const [_qnte, setQnte] = useState(0);
  useEffect(() => {});
  return (
    <gridLayout
      columns="auto,*,80"
      onTap={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate("CartDetails", {
          itemId: 86,
          otherParam: "anything you want here",
        });
      }}
    >
      <label
        width={80}
        height="80"
        fontSize={30}
        col={2}
        text="&#xe901;"
        className="icomoon"
      ></label>
      <label
        textAlignment="center"
        col={2}
        borderRadius="30"
        width={30}
        height="30"
        marginTop={-30}
        marginRight="-30"
        backgroundColor={colors.__primary}
      >
        {qnte}
      </label>
    </gridLayout>
  );
}

function getQnte(cart: Icart[]) {
  if (cart) {
    if (cart.length > 0) {
      return cart.reduce(
        (a: any, b: any) => {
          a.qnte += b.qnte;
          return a;
        },
        { qnte: 0 }
      ).qnte;
    }
  }

  return 0;
}

function ____({ options }) {
  const appData = useContext(AppContext) as any;
  const [qnte, setQnte] = useState(0);

  const getQnte = (cart: Icart[]) => {
    if (cart) {
      if (cart.length > 0) {
        return cart.reduce(
          (a: any, b: any) => {
            a.qnte += b.qnte;
            return a;
          },
          { qnte: 0 }
        ).qnte;
      }
    }

    return 0;
  };

  useEffect(() => {
    if (options.cart) {
      setQnte(getQnte(options.cart));
    }
  });

  const isLoged = false;

  return (
    <gridLayout
      backgroundColor={colors.__primary}
      columns="60,*,auto"
      height={80}
      width="100%"
    >
      <button className="no-font icomoon" onTap={() => Frame.goBack()} col={0}>
        &#xea40;
      </button>
      <textField style={app_styles.formControl} col={1}></textField>
      <gridLayout
        width={80}
        rows="*,*,*"
        col={2}
        onTap={() => {
          options.navigate(isLoged ? "CartDetails" : "LoginScreen");
        }}
      >
        <label row={1} style={STYLES.cartIcon} className="icomoon">
          &#xe901;
        </label>
        <label row={1} style={STYLES.cartValue} className="cart-container">
          {qnte}
        </label>
      </gridLayout>
    </gridLayout>
  );
}

export default NavBar;

export const STYLES = StyleSheet.create({
  cartIcon: {
    color: colors.__default,
    fontSize: 30,
    textAlignment: "center",
  },
  cartValue: {
    color: colors.___lightGray,
    backgroundColor: colors.___black,
    width: 23,
    height: 23,
    borderRadius: 50,
    fontSize: 12,
    marginTop: -30,
    marginRight: -30,
    fontWeight: "500",
    textAlignment: "center",
  },
});
