import * as React from "react";
import { BaseNavigationContainer } from "@react-navigation/core";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SecondaryScreen } from "./SecondaryScreen";
import { ProductListScreen } from "../pages/product-list";
import {
  AppContext,
  CartContext,
  ModalContext,
  NavBarContext,
  NotificationContext,
} from "../utils/context";
import { useState, useEffect, useContext } from "react";
import { Icart } from "../utils/props.interfaces";
import { getItem } from "../utils/storage";
import { CartDetails } from "../pages/cart-details";
import { RegisterScreen } from "../auth/register";
import { LoginScreen } from "../auth/login";
import { HomeScreen } from "./HomeScreen";
import { WelcomeScreen } from "./WelcomScreen";
import NavBar from "../shared-ui/action-bar";
import BottomSheetTest, { TopSheetModal } from "../shared-ui/modal";
import { TopSheetModalComponent } from "../shared-ui/modal/top-modal";
import { ShipementScreen } from "../pages/order/shipement";
import { OrderDetailsScreen } from "../pages/order/order-details";
import { ProductDetailsScreen } from "../pages/product-details";

const StackNavigator = stackNavigatorFactory();

export const mainStackNavigator = () => {
  const appDataProps = {
    cart: getItem("cart"),
    modal: false,
    navBar: { show: false, navigation: null },
  };
  const notificationProps: { show: boolean; bg: any } = { show: false, bg: "" };
  let [appProps, setAppProps] = useState(appDataProps);
  let [notification, setNotification] = useState(notificationProps);
  let [cartContext, setCartContext] = useState({ cart: [] });

  return (
    <page>
      <BaseNavigationContainer>
        <CartContext.Provider value={{ cartContext, setCartContext }}>
          <NotificationContext.Provider
            value={{ notification, setNotification }}
          >
            <AppContext.Provider value={{ appProps, setAppProps }}>
              <absoluteLayout row={1}>
                <stackLayout left={0} top="0" width={"100%"} height="100%">
                  <StackNavigator.Navigator
                    initialRouteName="Welcome"
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: "black",
                      },
                      headerShown: false,
                    }}
                  >
                    <StackNavigator.Screen
                      name="Welcome"
                      component={WelcomeScreen}
                    />
                    <StackNavigator.Screen name="Home" component={HomeScreen} />
                    <StackNavigator.Screen
                      name="LoginScreen"
                      component={LoginScreen}
                    />
                    <StackNavigator.Screen
                      name="RegisterScreen"
                      component={RegisterScreen}
                    />
                    <StackNavigator.Screen
                      name="Secondary"
                      component={SecondaryScreen}
                    />
                    <StackNavigator.Screen
                      name="ProductList"
                      component={ProductListScreen}
                    />
                    <StackNavigator.Screen
                      name="CartDetails"
                      component={CartDetails}
                    />
                    <StackNavigator.Screen
                      name="ShipementScreen"
                      component={ShipementScreen}
                    />
                    <StackNavigator.Screen
                      name="OrderDetailsScreen"
                      component={OrderDetailsScreen}
                    />
                    <StackNavigator.Screen
                      name="ProductDetailsScreen"
                      component={ProductDetailsScreen}
                    />
                  </StackNavigator.Navigator>
                </stackLayout>
                <>
                  {notification.show ? <TopSheetModal></TopSheetModal> : <></>}
                </>
              </absoluteLayout>
            </AppContext.Provider>
          </NotificationContext.Provider>
        </CartContext.Provider>
      </BaseNavigationContainer>
    </page>
  );
};
