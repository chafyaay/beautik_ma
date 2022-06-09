import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useEffect, useContext } from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import AddItem from "../../shared-ui/add-item";
import { SnackBarTest } from "../../shared-ui/modal/snack";
import { AppContext, CartContext } from "../../utils/context";
import { colors, app_styles } from "../../utils/app_styles";
import { getItem, CartStorage } from "../../utils/storage";
import { AppCard } from "../product-card";
import NavBar from "../../shared-ui/action-bar";

var phone = require("nativescript-phone");

type CartDetailsProps = {
  route: RouteProp<MainStackParamList, "CartDetails">;
  navigation: FrameNavigationProp<MainStackParamList, "CartDetails">;
};

export const CartDetails = ({ route, navigation }: CartDetailsProps) => {
  const { appProps, setAppProps } = useContext(AppContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const [qnte, setQnte] = React.useState(0);
  const [SubTotal, setSubTotal] = React.useState(null);

  const getSubTotal = (cart: any[]) => {
    let subtotal = 0;
    if (cart)
      cart.forEach((item: any) => {
        const price =
          item.data.discountedPrice > 0 ||
          item.data.discountedPrice < item.data.price
            ? item.data.discountedPrice
            : appProps.cart.data.price;
        subtotal += price * item.qnte;
        setQnte(item.qnte);
      });
    setSubTotal(subtotal);
  };

  React.useEffect(() => {
    setCartContext({ cart: getItem("cart") });
  }, []);

  useEffect(() => {
    getSubTotal(getItem("cart"));
  });

  const ___EMPTY_CART = () => (
    <gridLayout padding={20} rows="*,auto,*">
      <stackLayout row={1}>
        <label
          horizontalAlignment="center"
          textAlignment="center"
          fontSize={100}
          text="&#xe901;"
          className="icomoon"
        ></label>
        <label
          horizontalAlignment="center"
          textAlignment="center"
          fontSize={40}
          fontWeight="800"
          text="Panier est vide :("
          textWrap
          marginBottom={60}
        ></label>
        <button
          style={{ ...app_styles.btn, ...app_styles.btn_primary }}
          onTap={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: "Home" }],
            });
          }}
        >
          <formattedString>
            <span class="icomoon" text="&#xea40;"></span>
            <span text=" \t page d'accueil "></span>
          </formattedString>
        </button>
      </stackLayout>
    </gridLayout>
  );

  const ___CART_DETAILS = () => {
    let template = ___EMPTY_CART();
    if (cartContext.cart) {
      if (cartContext.cart.length > 0) {
        template = (
          <>
            <gridLayout rows="auto,*,auto">
              <stackLayout row={0}>
                <NavBar
                  options={{ navigation: navigation, qnte: qnte, goBack: true }}
                ></NavBar>
              </stackLayout>
              <scrollView row={1} height={"100%"}>
                <stackLayout>
                  {cartContext.cart.map((_item: any) => {
                    return (
                      <AppCard
                        key={_item.id}
                        {...{
                          navigation: navigation,
                          product: _item.data,
                          cardType: "c",
                          qnte: _item.qnte,
                        }}
                      ></AppCard>
                    );
                  })}
                </stackLayout>
              </scrollView>
              <flexboxLayout
                row={2}
                style={styles.order}
                background="transparent"
              >
                <button
                  style={styles.call}
                  marginRight="20"
                  class="icomoon"
                  text="&#xe942;"
                  onTap={() => {
                    phone.dial("+212 6 61 42 01 92", false);
                  }}
                ></button>
                <button
                  onTap={() => {
                    navigation.reset({
                      index: 2,
                      routes: [{ name: "ShipementScreen" }],
                    });
                  }}
                  style={styles.orderbtn}
                  text={`Commandez ( ${SubTotal} Dhs) `}
                  textWrap
                ></button>
              </flexboxLayout>
            </gridLayout>
          </>
        );
      }
    }
    return template;
  };
  return ___CART_DETAILS();
};
/* -------------------------------------------------- */
/* -------------------------------------------------- */
/* -------------------------------------------------- */
/* -------------------------------------------------- */
const styles = StyleSheet.create({
  body: { height: "100%", backgroundColor: colors.___lightGray },
  brief: {
    backgroundColor: colors.__default,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  order: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    background: "linear-gradient(to top, rgba(0,0,0,0), white)",
  },
  call: {
    ...app_styles.btn_primary,
    height: 50,
    width: "20%",
    color: colors.___lightGray,
    borderRadius: 4,
    fontSize: 30,
  },
  orderbtn: {
    ...app_styles.btn_primary,
    padding: 0,
    height: 50,
    color: colors.___lightGray,
    borderRadius: 4,
    fontWeight: "700",
    textTransform: "uppercase",
    width: "80%",
    fontSize: 18,
    letterSpacing: 0.04,
  },
  gohome: {
    ...app_styles.btn_primary,
    padding: 0,
    height: 50,
    color: colors.___lightGray,
    borderRadius: 4,
    fontWeight: "700",
    textTransform: "uppercase",
    width: "80%",
    fontSize: 18,
    letterSpacing: 0.04,
  },
});
