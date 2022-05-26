import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { CartContext } from "../../utils/context";
import { colors } from "../../utils/globalStyles";
import { LocalStorage } from "../../utils/storage";

export default function AddItem(product: any) {
  const { cart, setCart } = useContext(CartContext);
  const [qnte, setQnte] = useState(0);
  const lstorage = new LocalStorage(product);

  useEffect(() => {
    const cart = lstorage.getCartDetails();
    let cartdetails;

    if (cart) cartdetails = cart.find((item: any) => item.id === product.id);
    if (cartdetails) setQnte(cartdetails.qnte);
  });

  // add to cart
  const addItem = (prd: any) => {
    if (lstorage.getCartDetails) {
      lstorage.addToCart();

      const qnte = lstorage
        .getCartDetails()
        .find((item: any) => item.id === product.id)?.qnte;
      if (qnte) setQnte(qnte);
      setCart(lstorage.getCartDetails());
    }
  };
  // remove form cart
  const removeItem = () => {
    const qnte = lstorage
      .getCartDetails()
      .find((item: any) => item.id === product.id)?.qnte;
    if (qnte >= 1) {
      lstorage.removeItem();
      if (qnte) setQnte(qnte);
      setCart(lstorage.getCartDetails());
    }
  };

  return qnte <= 0 ? (
    <button
      style={styles.buy}
      className="btn primary"
      onTap={() => addItem(product)}
      backgroundColor={
        qnte < product.stock ? colors.__primary : colors.__disabled
      }
      isEnabled={qnte < product.stock}
    >
      Achetez {qnte}
    </button>
  ) : (
    <gridLayout columns="*,*,*">
      <button
        col={0}
        style={styles.add}
        className="btn icomoon"
        onTap={() => removeItem()}
      >
        &#xea0b;
      </button>
      <textField isEnabled={false} col={1} style={styles.input}>
        {qnte}
      </textField>
      <button
        col={2}
        style={styles.add}
        backgroundColor={
          qnte < product.stock ? colors.__primary : colors.__disabled
        }
        className="btn icomoon"
        onTap={() => addItem(product)}
        isEnabled={qnte < product.stock}
      >
        &#xea0a;
      </button>
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  buy: {
    height: 40,
    color: "white",
    fontSize: 16,
    borderWidth: 0,
  },
  add: {
    width: 40,
    height: 40,
    color: "white",
    fontSize: 16,
    borderWidth: 0,
  },
  input: {
    textAlignment: "center",
    paddingTop: 10,
    color: colors.__default,
    fontSize: 18,
  },
});
