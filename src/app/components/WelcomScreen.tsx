import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { Dialogs } from "@nativescript/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";
import { useContext, useEffect } from "react";
import { AppContext, NavBarContext } from "../utils/context";

type WelcomeScreenProps = {
  route: RouteProp<MainStackParamList, "Welcome">;
  navigation: FrameNavigationProp<MainStackParamList, "Welcome">;
};

export function WelcomeScreen({ route, navigation }: WelcomeScreenProps) {
  const { appProps, setAppProps } = useContext(AppContext);

  return (
    <flexboxLayout
      onTap={() => {
        /*  setAppProps({
          ...appProps,
          navBar: { show: true, navigation: navigation },
        }); */
        /*   try {
          setNavBarOptions({ show: true, navigation: navigation });
        } catch (error) {
          console.log(error);
        } */
        navigation.navigate("Home");
      }}
      style={styles.container}
    >
      <image src={"res://assets/logo.png"} width="60%"></image>
    </flexboxLayout>
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
