import * as React from "react";
import { BaseNavigationContainer } from "@react-navigation/core";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { WelcomeScreen } from "./WelcomScreen";
import ProductScreen from "../pages/product/product";
import { AppStateContext } from "../utils/context";
import { colors } from "../utils/styles";
import { ICart } from "../helpers/interfaces";
import Navbar from "../components/navbar/navbar";
import { ProductDetails } from "../pages/product-details/product-details";
const StackNavigator = stackNavigatorFactory() as any;

export interface IAppStateProps {
  pageName?: string;
  cart?: ICart[];
  cartTotalQnte?: number;
  notoficationBar?: {
    show: boolean;
    bg?: string;
    color?: string;
    msg?: string;
  };
  _navBar?: { show: boolean; goback?: boolean; serach?: boolean };
  navBar?: { show: boolean; type?: string };
  navigation?: any;
  route?: any;
  history?: any;
}
const appStateProps: IAppStateProps = {
  navBar: { show: false, type: "s" },
};

export const mainStackNavigator = () => {
  const [appState, setAppState] = React.useState(appStateProps);
  return (
    <BaseNavigationContainer>
      <AppStateContext.Provider value={{ appState, setAppState }}>
        <flexboxLayout
          flexDirection="column-reverse"
          justifyContent="space-around"
          alignItems="stretch"
        >
          {appState.navBar.show ? (
            <stackLayout alignSelf="stretch" width={"100%"}>
              <Navbar></Navbar>
            </stackLayout>
          ) : (
            <></>
          )}

          <stackLayout alignSelf="center" width={"100%"}>
            <StackNavigator.Navigator
              initialRouteName="ProductScreen"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "black",
                },
                headerShown: false,
              }}
            >
              <StackNavigator.Screen name="welcome" component={WelcomeScreen} />
              <StackNavigator.Screen
                name="ProductScreen"
                component={ProductScreen}
              />
              <StackNavigator.Screen
                name="ProductDetails"
                component={ProductDetails}
              />
            </StackNavigator.Navigator>
          </stackLayout>
        </flexboxLayout>
      </AppStateContext.Provider>
    </BaseNavigationContainer>
  );
};
