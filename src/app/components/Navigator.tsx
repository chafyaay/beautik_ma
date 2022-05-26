import * as React from "react";
import { BaseNavigationContainer } from "@react-navigation/core";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SecondaryScreen } from "./SecondaryScreen";
import { ProductListScreen } from "../pages/product-list";
import { CartContext, NavBarContext } from "../utils/context";
import { useState, useEffect, useContext } from "react";
import { Icart } from "../utils/props.interfaces";
import { getItem } from "../utils/storage";
import { CartDetails } from "../pages/cart-details";
import { RegisterScreen } from "../auth/register";
import { LoginScreen } from "../auth/login";
import { HomeScreen } from "./HomeScreen";
import { WelcomeScreen } from "./WelcomScreen";
import NavBar from "../shared-ui/action-bar";

const StackNavigator = stackNavigatorFactory();

export const mainStackNavigator = () => {
  const cartDetail: Icart[] = [];
  const navBarOptionsProps = { show: false, navigation: null };
  let [cart, setCart] = useState(cartDetail);
  let [navBarOptions, setNavBarOptions] = useState(navBarOptionsProps);

  useEffect(() => {
    const storage = getItem("cart");
    setCart(storage);
  }, []);

  return (
    <page>
      <BaseNavigationContainer>
        <CartContext.Provider value={{ cart, setCart }}>
          <NavBarContext.Provider value={{ navBarOptions, setNavBarOptions }}>
            <gridLayout rows="auto,*">
              <>
                <stackLayout row={0}>
                  {navBarOptions.show ? (
                    <NavBar options={navBarOptions.navigation}></NavBar>
                  ) : (
                    <></>
                  )}
                </stackLayout>
              </>

              <stackLayout row={1}>
                <StackNavigator.Navigator
                  initialRouteName="LoginScreen"
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
                </StackNavigator.Navigator>
              </stackLayout>
            </gridLayout>
          </NavBarContext.Provider>
        </CartContext.Provider>
      </BaseNavigationContainer>
    </page>
  );
};
