import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { Dialogs } from "@nativescript/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";
import { ProductListScreen } from "../pages/product-list";
import NavBar from "../shared-ui/action-bar";
import ProductCard from "../pages/product-card";
import { PRODUCTS } from "../utils/data";

type HomeScreenProps = {
  route: RouteProp<MainStackParamList, "Home">;
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <frame>
      <page>
        <gridLayout rows="60,*">
          <scrollView row={1}>
            <stackLayout>
              {PRODUCTS.map((product: any) => (
                <ProductCard key={product.id} product={product}></ProductCard>
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
