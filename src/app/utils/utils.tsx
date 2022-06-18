import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ICart } from "../helpers/interfaces";
import { IPoroduct } from "./models";
import { MainStackParamList } from "./navigations-params";

export const getPrice = (product: IPoroduct): { old: number; new: number } => {
  if (product.discountedPrice > 0 && product.discountedPrice < product.price)
    return { old: product.price, new: product.discountedPrice };
  return { old: null, new: product.price };
};

export const calculateDiscountRate = (product: IPoroduct): number => {
  const price = getPrice(product);
  if (price.old) {
    const diff = price.new - price.old;
    return (diff * 100) / price.old;
  }
  return 0;
};

export const getCartTotalItems = (cart: ICart[]): number => {
  if (cart.length > 0)
    return cart.reduce((a: number, b: ICart) => (a += b.cartQnte), 0);
  return 0;
};

export const navigateTo = (page: string, navigation?: any, params?: any) => {
  try {
    navigation.navigate(page, params);
  } catch (error) {
    console.log("============= NAVIGATION =======================");
    console.log(error);
    console.log("====================================");
  }
};
