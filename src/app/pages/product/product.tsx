import { RouteProp } from "@react-navigation/core";
import React, { useContext, useEffect } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import AddItemToCart from "../../components/addToCart/addToCart";
import ProductCard from "../../components/productCard/product-card";
import { Cart } from "../../helpers/cart";
import { BEAUTIK_DATA } from "../../helpers/data";
import { getItem } from "../../helpers/localstorage";
import { AppStateContext } from "../../utils/context";
import { IPoroduct } from "../../utils/models";
import { MainStackParamList } from "../../utils/navigations-params";

type ProductScreenProps = {
  route: RouteProp<MainStackParamList, "ProductScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "ProductScreen">;
};
function ProductScreen({ route, navigation }: ProductScreenProps) {
  const pageName = "ProductScreen";
  const productsList: IPoroduct[] = [...BEAUTIK_DATA];
  const { appState, setAppState } = useContext(AppStateContext);

  useEffect(() => {
    setAppState({
      ...appState,
      cart: getItem("cart"),
      pageName: "product-page",
      navBar: { show: true, type: "s" },
      navigation: navigation,
      route: route,
      history: route.name,
    });
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(appState.navBar);
    console.log("====================================");
  });

  return (
    <scrollView>
      <stackLayout>
        {productsList.map((product: any) => (
          <ProductCard product={product}></ProductCard>
        ))}
      </stackLayout>
    </scrollView>
  );
}

export default ProductScreen;
