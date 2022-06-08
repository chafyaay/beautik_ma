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

var phone = require("nativescript-phone");

type CartDetailsProps = {
  route: RouteProp<MainStackParamList, "CartDetails">;
  navigation: FrameNavigationProp<MainStackParamList, "CartDetails">;
};

export const CartDetails = ({ route, navigation }: CartDetailsProps) => {
  const { appProps, setAppProps } = useContext(AppContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const [subTotal, setSubTotal] = React.useState(0);
  const [qnte, setQnte] = React.useState(0);
  const rout = route.params;

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
    getSubTotal(getItem("cart"));
  }, []);

  const cartEmptytemplate = () => (
    <stackLayout padding={20}>
      <label text="Votre panier est vide"></label>
      <button
        onTap={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: "Home" }],
          });
        }}
        text="Page d'accuil "
      ></button>
    </stackLayout>
  );

  {
    /*      <button
                    onTap={() => {
                      //  navigation.navigate("Home", { cart: getItem("cart") });
                      navigation.reset({
                        index: 1,
                        routes: [{ name: "Home" }],
                      });
                    }}
                    text="Page d'accuil "
                  ></button> */
  }

  return (
    <gridLayout width={"100%"} rows="auto,*,auto" style={styles.body}>
      <flexboxLayout row={0} paddingLeft="20">
        <button
          onTap={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: "Home" }],
            });
          }}
          className="icomoon"
          text="&#xea40;"
        ></button>
      </flexboxLayout>
      <flexboxLayout row={2} style={styles.order} background="transparent">
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
          text={`Commandez ( ${subTotal} Dhs) `}
          textWrap
        ></button>
      </flexboxLayout>

      {!!cartContext ? (
        cartContext.length <= 0 ? (
          <>{cartEmptytemplate()}</>
        ) : (
          <scrollView row={1} height="100%">
            <stackLayout padding={20}>
              {cartContext.cart.map((_item) => {
                return (
                  <>
                    <AppCard
                      {...{
                        product: _item.data,
                        cardType: "c",
                        qnte: _item.qnte,
                      }}
                    ></AppCard>
                  </>
                );
              })}
            </stackLayout>
          </scrollView>
        )
      ) : (
        <>{cartEmptytemplate()}</>
      )}
    </gridLayout>
  );
};

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

/* 
function xxxxx(navigation) {
  const { appProps, setAppProps } = useContext(AppContext);
  const [subTotal, setSubTotal] = React.useState(0);
  const [qnte, setQnte] = React.useState(0);
  const [cart, setCart] = React.useState([]);
  const [template, setTemplate] = React.useState(<></>);

  const render = () => {
    if (!!Cart) {
      if (Cart.length <= 0) return cartEmptytemplate();
      else
        return (
          <>
            <gridLayout rows="auto,*,auto">
              <gridLayout
                height={100}
                rows="auto,auto"
                columns="*,auto"
                row={0}
              >
                <label
                  row={0}
                  padding="0 20"
                  text="Resumé Panier"
                  textWrap
                ></label>

                <flexboxLayout
                  row={1}
                  col={0}
                  padding="0 20"
                  flexWrap="wrap"
                  flexDirection="row"
                  justifyContent="flex-start"
                >
                  <label text="Sous-Total: " textWrap></label>
                  <label
                    fontWeight="500"
                    text={`${subTotal} Dhs`}
                    textWrap
                  ></label>
                </flexboxLayout>

                <button
                  padding={20}
                  textAlignment="right"
                  horizontalAlignment="right"
                  fontSize={30}
                  className="icomoon"
                  text="&#xe902;"
                  onTap={() => {
                    navigation.navigate("Home");
                    setAppProps({
                      ...appProps,
                      navBar: { show: true, navigation: navigation },
                    });
                  }}
                ></button>
              </gridLayout>

              <scrollView row={1}>
                <stackLayout padding={20}>
                  {Cart.map((_item) => (
                    <>
                      <CartDetailsCardtemplate
                        product={_item.data}
                        navigation={navigation}
                      ></CartDetailsCardtemplate>
                    </>
                  ))}
                </stackLayout>
              </scrollView>
            </gridLayout>
          </>
        );
    } else return cartEmptytemplate();
  };

  useEffect(() => {
    if (cart)
      if (cart.length <= 0) {
        setCart(getItem("cart"));
        getSubTotal(getItem("cart"));
        setAppProps({
          cart: getItem("cart") || [],
          modal: false,
          navBar: { show: false, navigation: navigation },
        });
        setTemplate(render());
      }
  });

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

  const render = () => {
    if (cart) {
      if (cart.length <= 0)
        return (
          <stackLayout padding={20}>
            <label text="Votre panier est vide"></label>
            <button
              onTap={() => navigation.navigate("Home")}
              text="Page d'accuil "
            ></button>
          </stackLayout>
        );
      else
        return (
          <stackLayout padding={20}>
            <scrollView row={1}>
              <stackLayout>
                {appProps.cart.map((item) => (
                  <CartDetailsCardtemplate
                    product={item.data}
                  ></CartDetailsCardtemplate>
                ))}
              </stackLayout>
            </scrollView>
            <flexboxLayout padding={10} flexDirection="row">
              <button
                width={160}
                marginRight="20"
                class="btn icomoon"
                text="&#xe942;"
              ></button>
              <button
                class="btn"
                text={`Commandez ( ${subTotal} Dhs) `}
              ></button>
            </flexboxLayout>
          </stackLayout>
        );
    }
  };
  return <>{template}</>;
}
 */
