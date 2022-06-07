import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { Dialogs } from "@nativescript/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";
import { ProductListScreen } from "../pages/product-list";
import NavBar from "../shared-ui/action-bar";
import { PRODUCTS } from "../utils/data";
import BottomSheetTest from "../shared-ui/modal";
import { AppContext, ModalContext, NavBarContext } from "../utils/context";
import { Icart } from "../utils/props.interfaces";
import { useEffect } from "react";
import { getItem } from "../utils/storage";
import { AppCard } from "../pages/product-card";

type HomeScreenProps = {
  route: RouteProp<MainStackParamList, "Home">;
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function HomeScreen({ route, navigation }: HomeScreenProps) {
  const { appProps, setAppProps } = React.useContext(AppContext);
  const [cart, setCart] = React.useState([]);
  const data = route.params;
  const [qnte, setQnte] = React.useState(0);

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
  useEffect(() => {
    if (getItem("cart")) {
      setQnte(getQnte(getItem("cart")));
    }

    //setCart(getItem("cart"));

    /*     setAppProps({
      ...appProps,
      navBar: { show: true, navigation: navigation },
    }); */
  });
  return (
    <frame>
      <page>
        <gridLayout rows="60,*">
          <gridLayout row={0} left={0} top="0" width="100%" height={80}>
            <NavBar options={{ navigation: navigation, qnte: qnte }}></NavBar>
          </gridLayout>
          <scrollView row={1}>
            <stackLayout>
              {PRODUCTS.map((product: any) => (
                <AppCard
                  key={product.id}
                  {...{ product: product, cardType: "p" }}
                ></AppCard>
              ))}
            </stackLayout>
          </scrollView>
        </gridLayout>
      </page>
    </frame>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    textAlignment: "center",
    fontSize: 24,
    color: "black",
  },
  button: {
    fontSize: 24,
    color: "#2e6ddf",
  },
});
