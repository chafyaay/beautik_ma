import { hasKey } from "@nativescript/core/application-settings";
import { ICart } from "./interfaces";
import { getItem, setItem, removeItem } from "./localstorage";

export class Cart {
  public cart: ICart[] = [];
  private product: any;
  price: number;

  constructor(product: any) {
    this.product = product;
    if (this.product.discountedPrice) {
      this.price =
        this.product.discountedPrice < this.product.price
          ? this.product.discountedPrice
          : this.product.price;
    }
  }

  getCartDetails(): ICart[] {
    this.cart = [];
    if (hasKey("cart")) {
      this.cart = getItem("cart");
      return this.cart;
    }
    return [];
  }

  getIemQnte() {
    const _cart = this.cart.find((item: ICart) => item.id === this.product.id);
    if (_cart) {
      return _cart.cartQnte;
    } else return 0;
  }

  updateCart(a: number) {
    let index = 0;

    try {
      if (this.getCartDetails().length > 0) {
        index = this.cart.findIndex(
          (item: ICart) => item.id === this.product?.id
        );
        if (index >= 0) {
          this.cart[index] = {
            id: this.product?.id,
            product: "this.product",
            cartQnte: this.cart[index].cartQnte + a,
            subtotal: (this.cart[index].cartQnte + a) * this.price,
          };
        } else {
          this.cart[this.cart.length] = {
            id: this.product?.id,
            product: "this.product",
            cartQnte: a,
            subtotal: a * this.price,
          };
        }
      } else {
        this.cart[0] = {
          id: this.product?.id,
          product: "this.product",
          cartQnte: a,
          subtotal: a * this.price,
        };
      }
      removeItem("key");
      setItem("cart", this.cart);
    } catch (error) {
      console.log("============= error =======================");
      console.log(error);
      console.log("====================================");
    }
  }

  removeItem(id: any) {}
}
