import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { AppContext, NotificationContext } from "../../utils/context";
import { app_styles, colors } from "../../utils/app_styles";
import { getItem, LocalStorage } from "../../utils/storage";

export default function AddItem({ product, type }) {
  const { appProps, setAppProps } = useContext(AppContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [qnte, setQnte] = useState(0);

  const lstorage = new LocalStorage(product);

  useEffect(() => {
    updateQnte();
  }, []);

  // add to cart
  const addItem = () => {
    lstorage.addToCart(1);
    updateQnte();
    setNotification({ show: true, bg: colors.___active });

    /*     const _appProps = { ...appProps };
    if (lstorage.getCartDetails) {
      lstorage.addToCart(1);
      const qnte = lstorage
        .getCartDetails()
        .find((item: any) => item.id === product.id)?.qnte;
      if (qnte) setQnte(qnte);

      _appProps.modal = type !== "cart";
      setAppProps(_appProps);
    } */
  };

  const updateQnte = () => {
    let cartdetails;
    if (getItem("cart"))
      cartdetails = getItem("cart").find((item: any) => item.id === product.id);
    if (cartdetails) setQnte(cartdetails.qnte);
  };

  // remove form cart
  const removeItem = () => {
    lstorage.addToCart(-1);
    updateQnte();
  };

  const removeProduct = () => {
    const storage = new LocalStorage(product);
    storage.removeItem(product.id);
    updateQnte();
  };

  const render = () => (
    <flexboxLayout
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {type === "c" ? (
        <button
          onTap={() => removeProduct()}
          verticalAlignment="middle"
          class="icomoon"
          width={40}
          text="&#xe9ac;"
          style={styles.delete}
        ></button>
      ) : (
        <></>
      )}
      <stackLayout width={type === "c" ? "50%" : "100%"}>
        {qnte <= 0 ? (
          <button
            style={{ ...app_styles.btn, ...app_styles.btn_primary }}
            onTap={() => addItem()}
            isEnabled={qnte < product.stock}
            textWrap
            text="Acheter"
          ></button>
        ) : (
          <gridLayout columns="*,*,*">
            {type === "c" ? (
              <>
                <button
                  onTap={() => {}}
                  verticalAlignment="middle"
                  class="icomoon"
                  width={40}
                  text="&#xe9ac;"
                  style={styles.delete}
                ></button>
              </>
            ) : (
              <></>
            )}
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
              isEnabled={product.stock > qnte}
              backgroundColor={
                product.stock <= qnte ? colors.__disabled : colors.__primary
              }
            >
              &#xea0a;
            </button>
          </gridLayout>
        )}
      </stackLayout>
    </flexboxLayout>
  );
  return render();
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
    borderRadius: 3,
    borderWidth: 0,
  },
  input: {
    textAlignment: "center",
    color: colors.___black,
    fontSize: 18,
    borderWidth: 2,
    borderColor: colors.___black,
    borderRadius: 3,
  },
  delete: {
    textAlignment: "center",
    color: colors.___black,
    borderWidth: 2,
    borderColor: colors.___black,
    borderRadius: 3,
    width: 40,
    height: 40,
    fontSize: 16,
  },
});
