import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-nativescript";
import { colors } from "../../xapp/_utils/app_styles";
import { CartContext, OffCanvasContext } from "../../xapp/_utils/context";

function NavBar({ options }) {
  const { navigation, qnte, goBack, cart } = options;
  const [_qnte, setQnte] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { cartContext } = React.useContext(CartContext) as any;
  const { offcanvas, setOffCanvasContext } = React.useContext(OffCanvasContext);
  const getQnte = (cart: any[]) => {
    let s = 0;
    if (cart) {
      if (cart.length > 0) {
        cart.forEach((item: any) => (s += item.qnte));
      }
    }
    setQnte(s);
  };

  const onTextChanged = () => {};

  const onSubmit = () => {
    setShowSearchBar(false);
  };

  const onClose = () => {
    setShowSearchBar(false);
  };

  useEffect(() => {
    getQnte(cartContext.cart);
  });

  return (
    <stackLayout>
      {showSearchBar && (
        <searchBar
          width={"100%"}
          hint="Search hint"
          text="searchPhrase"
          onTextChange={onTextChanged}
          onSubmit={() => onSubmit()}
          onClose={() => onClose()}
        />
      )}
      <flexboxLayout
        style={STYLES.header}
        flexDirection="row"
        justifyContent="space-between"
      >
        <stackLayout
          horizontalAlignment="center"
          onTap={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: "CartDetails" }],
            });
          }}
        >
          {!goBack ? (
            <>
              <button
                marginLeft={20}
                paddingTop={10}
                left={0}
                top="0"
                fontSize={25}
                col={2}
                onTap={() => {
                  try {
                    setOffCanvasContext({ show: !offcanvas.show, bg: "" });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                text="&#xe903;"
                className="icomoon"
              ></button>
            </>
          ) : (
            <>
              <button
                marginLeft={20}
                left={0}
                top="0"
                fontSize={25}
                col={2}
                text="&#xe904;"
                className="icomoon"
                onTap={() => {
                  navigation.reset({ index: 1, routes: [{ name: "Home" }] });
                }}
              ></button>
            </>
          )}
        </stackLayout>
        {
          <>
            <gridLayout
              columns="auto,auto"
              rows="*"
              style={STYLES.cartIcon}
              onTap={() => {
                navigation.reset({
                  index: 1,
                  routes: [{ name: "CartDetails" }],
                });
              }}
            >
              <button
                verticalAlignment="middle"
                borderRightWidth={1}
                borderRightColor={colors.__default}
                paddingRight={20}
                marginRight={20}
                marginTop={-15}
                fontSize={20}
                row={0}
                col={0}
                className="icomoon"
                text="&#xe906;"
                onTap={() => {
                  setShowSearchBar(!showSearchBar);
                }}
              ></button>
              <label
                textAlignment="center"
                borderRadius="25"
                width={25}
                height={25}
                marginTop={-35}
                marginRight={-0}
                backgroundColor={colors.__primary}
                fontSize={15}
                text={_qnte + ""}
                row={0}
                col={1}
              ></label>
              <label
                verticalAlignment="middle"
                horizontalAlignment="center"
                fontSize={30}
                text="&#xe901;"
                className="icomoon"
                row={0}
                col={1}
              ></label>
            </gridLayout>
          </>
        }
      </flexboxLayout>
    </stackLayout>
  );
}

export default NavBar;

export const STYLES = StyleSheet.create({
  header: {
    borderBottomColor: colors.__default,
    borderBottomWidth: 1,
    height: 60,
  },
  cartIcon: {
    width: 100,
    color: colors.__default,
    fontSize: 30,
    textAlignment: "center",
    verticalAlignment: "middle",
  },
  cartValue: {
    color: colors.___lightGray,
    backgroundColor: colors.___black,
    width: 23,
    height: 23,
    borderRadius: 50,
    fontSize: 12,
    marginTop: -30,
    marginRight: -30,
    fontWeight: "500",
    textAlignment: "center",
  },
});
