import { getString, setString } from "@nativescript/core/application-settings";
import { ProductCardProps, Icart } from "./props.interfaces";

export function LocalStorage(product: any) {
  let cart = getItem("cart") || [];
  let cartProduct: { id: number; qnte: number };

  this.addToCart = () => {
    if (!cart || cart.length === 0) {
      cartProduct = { id: product.id, qnte: 1 };
      cart.push(cartProduct);
    } else {
      const index = cart.findIndex((obj: any) => obj.id === product.id);

      if (index < 0) {
        cartProduct = { id: product.id, qnte: 1 };
        cart.push(cartProduct);
      } else {
        cart[index].qnte += 1;
      }
    }

    setItem("cart", []);
    setItem("cart", cart);
  };

  this.removeItem = () => {
    cart.map((item: any) => {
      if (item.id === product.id) {
        item.qnte--;
      }
      return item;
    });

    setItem("cart", []);
    setItem("cart", cart);

    console.log("yassine");
    console.log(this.getCartDetails());
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
