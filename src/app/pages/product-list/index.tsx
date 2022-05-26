import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "../../components/NavigationParamList";
import ProductCard from "../product-card";
import { PRODUCTS } from "../../utils/data";
import NavBar from "../../shared-ui/action-bar";

type ProductListScreenProps = {
  route: RouteProp<MainStackParamList, "ProductList">;
  navigation: FrameNavigationProp<MainStackParamList, "ProductList">;
};

export function ProductListScreen() {
  return (
    <>
      {PRODUCTS.map((product: any) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </>
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
