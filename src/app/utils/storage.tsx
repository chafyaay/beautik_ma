import { getString, setString } from "@nativescript/core/application-settings";
import { ProductCardProps, Icart } from "./props.interfaces";

export function LocalStorage(product?: any) {
  let cart = getItem("cart") || [];
  let cartProduct: any = {};

  this.addToCart = (a?: number) => {
    let index;
    if (!cart || cart.length === 0) {
      cartProduct = { id: product.id, qnte: a, data: product };
      cart.push(cartProduct);
    } else {
      index = cart.findIndex((obj: any) => obj.id === product.id);

      if (index < 0) {
        cartProduct = { id: product.id, qnte: a, data: product };
        cart.push(cartProduct);
      } else {
        cart[index].qnte += a;
      }
    }
    alert("index" + index);
    console.log("**************************");
    console.log("**************************");
    console.log(cart);

    console.log("*********** end ***************");
    console.log("**************************");

    setItem("cart", []);
    setItem("cart", cart);
  };

  this.removeItem = (prdId: any) => {
    const _cart = cart.filter((item) => item.id != prdId);

    setItem("cart", []);
    setItem("cart", _cart);
  };

  this.getCartDetails = () => getItem("cart");
}

export const setItem = (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    setString(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getItem = (key: string) => {
  try {
    const jsonValue = getString(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
