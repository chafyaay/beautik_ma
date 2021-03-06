import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { CartContext, NotificationContext } from "../../utils/context";
import { app_styles, colors } from "../../utils/app_styles";
import { getItem, CartStorage } from "../../utils/storage";

export default function AddItem({ product, type }) {
  const { notification, setNotification } = useContext(NotificationContext);
  const [qnte, setQnte] = useState(0);
  const { cartContext, setCartContext } = useContext(CartContext);

  const lstorage = new CartStorage(product);

  useEffect(() => {
    getProductQnte();
  });

  // add to cart
  const addItem = () => {
    lstorage.addToCart(1);
    getProductQnte();
    setNotification({
      show: true,
      bg: colors.___active,
      msg: "Produit ajouté avec succès",
    });
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
  };

  const removeProduct = () => {
    const storage = new CartStorage(product);
    const remove = storage.removeItem(product.id);

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
      <flexboxLayout paddingTop={10} justifyContent="flex-end">
        <button
          col={0}
          style={styles.add}
          className="btn icomoon"
          onTap={() => removeItem()}
          isEnabled={(type !== "c" && qnte >= 1) || (type == "c" && qnte > 1)}
          backgroundColor={
            type == "c" && qnte <= 1 ? colors.__disabled : colors.__primary
          }
        >
          &#xea0b;
        </button>
        <textField
          isEnabled={false}
          col={1}
          style={styles.input}
          text={qnte.toLocaleString()}
        ></textField>
        <button
          col={2}
          style={styles.add}
          className="btn icomoon"
          onTap={() => addItem()}
          isEnabled={product.stock > qnte}
          backgroundColor={
            product.stock <= qnte ? colors.__disabled : colors.__primary
          }
          text="&#xea0a;"
        ></button>
      </flexboxLayout>
    );
    switch (type) {
      case "c":
        template = (
          <flexboxLayout flexDirection="row" justifyContent="space-between">
            <button
              marginTop={10}
              onTap={() => {
                removeProduct();
              }}
              verticalAlignment="middle"
              class="icomoon"
              width={40}
              text="&#xe9ac;"
              style={styles.delete}
            ></button>
            <stackLayout>{addToCarttemplate}</stackLayout>
          </flexboxLayout>
        );
        break;
      case "p":
        template = (
          <stackLayout>
            {qnte <= 0 ? (
              <>
                <button
                  style={{ ...app_styles.btn, ...app_styles.btn_primary }}
                  onTap={() => addItem()}
                  isEnabled={qnte < product.stock}
                  textWrap
                >
                  <formattedString>
                    <span className="icomoon" text="&#xe905;"></span>
                    <span fontWeight="500" text="\t Acheter"></span>
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
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    textAlignment: "center",
    color: colors.___black,
    fontSize: 18,
    borderWidth: 2,
    borderColor: colors.___black,
    borderRadius: 3,
    width: 40,
    height: 40,
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
