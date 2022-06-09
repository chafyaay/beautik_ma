import { getString, setString } from "@nativescript/core/application-settings";
import { ProductCardProps, Icart } from "./props.interfaces";

export function CartStorage(product?: any) {
  let cart = getItem("cart") || [];
  let cartProduct: any = {};

  this.getSubTotal = () => {
    let subTotal = 0;
    const price =
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;

    const prd = cart.find((item: any) => {
      return item.id == product.id;
    });

    if (prd) {
      try {
        console.log("prd---------");
        console.log(prd);
        subTotal += prd?.qnte * price;
      } catch (error) {}
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
        shippingFee: product?.shippingFee,
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
          shippingFee: product.shippingFee,
          data: product,
        };
        cart.push(cartProduct);
      } else {
        cart[index].qnte += a;
        cart[index].subTotal = this.getSubTotal();
        cart[index].shippingFee = product.shippingFee;
      }
    }
    setItem("cart", []);
    setItem("cart", cart);
  };

  this.removeItem = (prdId: any) => {
    const _cart = cart.filter((item) => item.id != prdId);
    const prev = getItem("cart");

    setItem("cart", []);
    setItem("cart", _cart);

    return {
      prev: prev,
      curr: _cart,
    };
  };

  this.detectchange = (preve?, newvalue?) => {
    return { prevValue: preve.length, currentvalue: newvalue.length };
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
