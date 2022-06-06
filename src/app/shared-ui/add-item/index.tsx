import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { AppContext, NotificationContext } from "../../utils/context";
import { app_styles, colors } from "../../utils/app_styles";
import { LocalStorage } from "../../utils/storage";

export default function AddItem({ options }) {
  const { appProps, setAppProps } = useContext(AppContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [qnte, setQnte] = useState(0);
  const product = options?.product || null;
  const type = options.type || "";

  const lstorage = new LocalStorage(product);

  useEffect(() => {
    const cart = lstorage.getCartDetails();
    let cartdetails;
    if (cart) cartdetails = cart.find((item: any) => item.id === product.id);
    if (cartdetails) setQnte(cartdetails.qnte);
  }, []);

  // add to cart
  const addItem = () => {
    const _appProps = { ...appProps };
    if (lstorage.getCartDetails) {
      lstorage.addToCart(1);
      const qnte = lstorage
        .getCartDetails()
        .find((item: any) => item.id === product.id)?.qnte;
      if (qnte) setQnte(qnte);
      setNotification({ show: true });

      _appProps.modal = type !== "cart";
      setAppProps(_appProps);
    }
  };

  // remove form cart
  const removeItem = () => {
    lstorage.addToCart(-1);

    /*  const _appProps = { ...appProps };
    const qnte = lstorage
      .getCartDetails()
      .find((item: any) => item.id === product.id)?.qnte;
    if (qnte >= 1) {
      alert(1);

      lstorage.addToCart(-1);
      if (qnte) setQnte(qnte);
      _appProps.modal = type !== "cart";
      setAppProps(_appProps);
    } */
  };

  return qnte <= 0 ? (
    <button
      style={{ ...app_styles.btn, ...app_styles.btn_primary }}
      onTap={() => addItem()}
      isEnabled={qnte < product.stock}
      textWrap
      text="Acheter"
    ></button>
  ) : (
    <gridLayout columns="*,*,*">
      <button
        col={0}
        style={styles.add}
        className="btn icomoon"
        onTap={() => removeItem()}
        isEnabled={qnte > 1}
        backgroundColor={qnte <= 1 ? colors.__disabled : colors.__primary}
      >
        &#xea0b;
      </button>
      <textField isEnabled={false} col={1} style={styles.input}>
        {qnte}
      </textField>
      <button
        col={2}
        style={styles.add}
        className="btn icomoon"
        onTap={() => addItem()}
        isEnabled={qnte < product.stock || qnte > 1}
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
