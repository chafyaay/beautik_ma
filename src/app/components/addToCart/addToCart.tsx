import React, { useContext, useEffect, useState } from "react";
import { Cart } from "../../helpers/cart";
import { ICart } from "../../helpers/interfaces";
import { AppStateContext } from "../../utils/context";
import NavigateTo from "../../utils/navigations-params";
import { styles } from "../../utils/styles";
import { getCartTotalItems, navigateTo } from "../../utils/utils";
const btn = styles.btn;
const addItem = styles.addItem;

function AddItemToCart({ product }) {
  const cart = new Cart(product);
  const pageName = "";
  const cartProps: ICart[] = [];
  const [_cart, setCart] = useState(cartProps);
  const [qnte, setQnte] = useState(0);
  const { appState, setAppState } = useContext(AppStateContext);

  useEffect(() => {
    setCart(cart.getCartDetails());
    getQnteValue();
  }, []);

  useEffect(() => {});

  /* get cart Qnte value */
  const getQnteValue = () => {
    setQnte(cart.getIemQnte());
    setAppState({ ...appState, cartTotalQnte: getCartTotalItems(_cart) });
  };

  /* Increment and decrement cart */
  const updateCarthandler = (a?: number) => {
    cart.updateCart(a);
    getQnteValue();
  };

  /* Remove item from the cart */
  const removeItemHandler = () => {
    cart.removeItem(product.id);
    getQnteValue();
  };

  return (
    <flexboxLayout>
      <dockLayout width="50%" stretchLastChild="true" paddingRight={20}>
        {appState.pageName === "product-page" ? (
          <button
            left={1}
            style={btn.primary}
            text="Details"
            onTap={() => {
              navigateTo("ProductDetails", appState.navigation, {
                ...product,
              });
            }}
          ></button>
        ) : (
          <button
            left={1}
            style={{ ...btn.default, ...addItem.removeItem }}
            text="&#xe908;"
            className="icomoon"
            onTap={() => {
              removeItemHandler();
            }}
          ></button>
        )}
      </dockLayout>
      <flexboxLayout
        flexDirection="row"
        justifyContent="space-between"
        width="50%"
      >
        {qnte <= 0 ? (
          <button
            text="Acheter"
            style={btn.default}
            onTap={() => updateCarthandler(1)}
          ></button>
        ) : (
          <>
            <button
              text="&#xe90f;"
              className="icomoon"
              style={{ ...btn.default, ...addItem.updateCart }}
              onTap={() => updateCarthandler(-1)}
            ></button>
            <button
              style={{ ...btn.default, ...addItem.qnteHolnder }}
              height={20}
              text={qnte + ""}
            ></button>
            <button
              style={{ ...btn.default, ...addItem.updateCart }}
              className="icomoon"
              text="&#xe910;"
              onTap={() => updateCarthandler(1)}
            ></button>
          </>
        )}
      </flexboxLayout>
    </flexboxLayout>
  );
}

export default AddItemToCart;
