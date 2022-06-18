import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { app_styles, colors } from "../../xapp/_utils/app_styles";
import { CartContext, NotificationContext } from "../../xapp/_utils/context";
import { getItem } from "../../xapp/_utils/localstorage";
import { CartStorage } from "../../xapp/_utils/storage";

export default function AddItem({ product, type }) {
  const { notification, setNotification } = useContext(NotificationContext);
  const [qnte, setQnte] = useState(0);
  const { cartContext, setCartContext } = useContext(CartContext);

  const lstorage = new CartStorage(product);

  useEffect(() => {
    getProductQnte();
  }, []);

  useEffect(() => {}, [cartContext]);

  // add to cart
  const addItem = () => {
    lstorage.addToCart(1);

    getProductQnte();

    setNotification({
      show: true,
      bg: colors.___active,
      msg: "Produit ajouté avec succès",
    });

    setCartContext({ cart: getItem("cart") });
  };

  const getProductQnte = () => {
    let cartdetails = getItem("cart") || [];
    if (cartdetails)
      cartdetails = cartdetails.find((item: any) => item.id === product.id);
    if (cartdetails) {
      setQnte(cartdetails.qnte);
      return cartdetails.qnte;
    } else setQnte(0);
  };

  // remove form cart
  const removeItem = () => {
    lstorage.addToCart(-1);
    getProductQnte();

    if (getProductQnte() <= 0) {
      const storage = new CartStorage(product);

      storage.removeItem(product.id);
    }
    setNotification({
      show: true,
      bg: colors.___active,
      msg: "La quantité d'articles a été mise à jour",
    });
    setCartContext({ cart: getItem("cart") });
  };

  const removeProduct = () => {
    const storage = new CartStorage(product);
    storage.removeItem(product.id);

    setCartContext({ cart: getItem("cart") });
    setNotification({
      show: true,
      bg: colors.___active,
      msg: "Le Produit a été retiré du panier avec succès",
    });
  };

  const render = () => {
    let template = <></>;
    const addToCarttemplate = (
      <flexboxLayout
        width={"100%"}
        flexDirection="row"
        justifyContent="space-between"
      >
        {type === "c" ? (
          <button
            onTap={() => {
              removeProduct();
            }}
            style={{
              ...app_styles.btn,
              ...app_styles.btn_default,
            }}
            text="&#xe908;"
            className="icomoon"
            textWrap
          ></button>
        ) : (
          <></>
        )}
        <stackLayout orientation="horizontal">
          <button
            onTap={() => removeItem()}
            isEnabled={(type !== "c" && qnte >= 1) || (type == "c" && qnte > 1)}
            backgroundColor={
              type == "c" && qnte <= 1 ? colors.__disabled : colors.__primary
            }
            style={{ ...app_styles.btn, ...app_styles.btn_primary }}
            text="&#xe90f;"
            className="icomoon"
          ></button>
          <button
            isEnabled={false}
            col={1}
            style={{
              ...app_styles.btn,
              ...app_styles.btn_text,
            }}
            text={qnte.toLocaleString()}
          ></button>
          <button
            col={2}
            style={{ ...app_styles.btn, ...app_styles.btn_primary }}
            className="icomoon"
            text="&#xe910;"
            onTap={() => addItem()}
            isEnabled={product.stock > qnte}
            backgroundColor={
              product.stock <= qnte ? colors.__disabled : colors.__primary
            }
          ></button>
        </stackLayout>
      </flexboxLayout>
    );
    switch (type) {
      case "c":
        template = addToCarttemplate;
        break;
      case "p":
        template = (
          <stackLayout marginTop={20}>
            {qnte <= 0 ? (
              <>
                <button
                  style={{
                    ...app_styles.btn,
                    ...app_styles.btn_primary,
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  onTap={() => addItem()}
                  isEnabled={qnte < product.stock}
                  textWrap
                >
                  <formattedString>
                    <span
                      color={colors.___white}
                      className="icomoon"
                      text="&#xe914;"
                    ></span>
                    <span text="  Acheter"></span>
                  </formattedString>
                </button>
              </>
            ) : (
              addToCarttemplate
            )}
          </stackLayout>
        );
    }
    return template;
  };
  return render();
}

const styles = StyleSheet.create({
  buy: {
    height: 50,
    color: "white",
    fontSize: 16,
    borderWidth: 0,
  },
  add: {
    color: "white",
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 0,
  },
  input: {
    color: colors.___black,
    fontSize: 18,
  },
  delete: {
    textAlignment: "center",
    color: colors.___black,
    borderWidth: 2,
    borderColor: colors.___black,
    borderRadius: 3,

    fontSize: 16,
  },
});
