import { getString, setString } from "@nativescript/core/application-settings";
import { ProductCardProps, Icart } from "./props.interfaces";

export function CartStorage(product?: any) {
  let cart = getItem("cart") || [];
  let cartProduct: any = {};

  this.getSubTotal = () => {
    let subTotal = 0;
    if (cart) {
      if (cart.length > 0) {
        cart.forEach((element: any) => {
          const price =
            product.discountedPrice < product.price
              ? product.discountedPrice
              : product.price;
          const qnte = element.find((item: any) => item.id == product.id).qnte;
          subTotal += qnte * price;
        });
      }
    }
    return subTotal;
  };

  this.addToCart = (a?: number) => {
    let index;
    if (!cart || cart.length === 0) {
      cartProduct = {
        id: product.id,
        qnte: a,
        subTotal: this.getSubTotal(),
        data: product,
      };
      cart.push(cartProduct);
    } else {
      index = cart.findIndex((obj: any) => obj.id === product.id);

      if (index < 0) {
        cartProduct = {
          id: product.id,
          qnte: a,
          subTotal: this.getSubTotal(),
          data: product,
        };
        cart.push(cartProduct);
      } else {
        cart[index].qnte += a;
      }
    }
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
