import { Color } from "@nativescript/core";
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import AddItem from "../../shared-ui/add-item";
import { RatingStars } from "../../shared-ui/rating-stars/rating-stars";
import { app_styles, colors } from "../../utils/app_styles";
import { getItem } from "../../utils/storage";

export function AppCard({ product, cardType, qnte }) {
  const [_qnte, set_qnte] = React.useState(0);
  let template: any;

  React.useEffect(() => {
    const cartdetails = getItem("cart");
    if (cartdetails) {
      const prd = cartdetails.find((item) => item.id == product.id);

      if (prd) {
        set_qnte(prd.qnte);
      }
    }
    console.log("====================================");
    console.log();
    console.log("====================================");
  });

  const render = () => {
    switch (cardType) {
      case "c":
        try {
          template = CardTemplates.cart(product, _qnte);
        } catch (error) {
          template = (
            <>
              <label text={error}></label>
            </>
          );
        }
        break;
      case "p":
        template = CardTemplates.product(product, 0);
        break;
      default:
        template = (
          <>
            <label text="ERR"></label>
          </>
        );
    }
    return template;
  };

  return render();
}

const CardTemplates = {
  product: (product, qnte) => (
    <stackLayout style={styles.card}>
      <gridLayout columns="*,*">
        <image col={0} src={product.cover}></image>
        {product.discountedPrice < product.price ? (
          <button
            textWrap
            horizontalAlignment="left"
            verticalAlignment="top"
            width={40}
            height={40}
            backgroundColor={colors.___promo}
            row={0}
            col={0}
            fontSize="13"
            borderRadius={5}
            text={
              Math.floor(
                ((product.discountedPrice - product.price) * 100) /
                  product.price
              ).toLocaleString() + "%"
            }
          ></button>
        ) : (
          <></>
        )}

        <stackLayout col={1}>
          <label textWrap className="text">
            {product.brandName}
          </label>
          <flexboxLayout marginTop={10}>
            {product.discountedPrice > 0 &&
            product.discountedPrice < product.price ? (
              <>
                <label
                  marginRight={10}
                  textDecoration="line-through"
                  color={colors.__default}
                  className="price old"
                >
                  {product.price} DH
                </label>
                <label className="price">{product.discountedPrice} DH</label>
              </>
            ) : (
              <label className="price">{product.price} DH</label>
            )}
          </flexboxLayout>
          <RatingStars data={product}></RatingStars>
        </stackLayout>
      </gridLayout>

      <gridLayout padding={0} columns="*,*">
        <stackLayout col={0} paddingRight="20">
          <button
            width={"100%"}
            horizontalAlignment="left"
            marginLeft="0"
            marginRight="10"
            style={app_styles.btn}
            text="details"
          ></button>
        </stackLayout>
        <stackLayout col={1}>
          <AddItem {...{ product: product, type: "p" }}></AddItem>
        </stackLayout>
      </gridLayout>
    </stackLayout>
  ),
  cart: (product, qnte) => (
    <gridLayout style={app_styles.cartCard} rows="auto,auto" columns="auto,*">
      <image
        verticalAlignment="top"
        col={0}
        row="0"
        src={product.cover}
        width="100"
        marginRight={10}
      ></image>
      <button
        textWrap
        horizontalAlignment="left"
        verticalAlignment="top"
        width={40}
        height={40}
        backgroundColor={colors.___promo}
        row={0}
        col={0}
        fontSize="13"
        borderRadius={5}
        text={
          Math.floor(
            ((product.discountedPrice - product.price) * 100) / product.price
          ).toLocaleString() + "%"
        }
      ></button>

      <stackLayout col={1} row="0">
        <label className="text" textWrap>
          {product.brandName}
        </label>
        <flexboxLayout marginTop={10}>
          {product.discountedPrice > 0 &&
          product.discountedPrice < product.price ? (
            <>
              <label
                marginRight={10}
                textDecoration="line-through"
                color={colors.__default}
                className="price old"
              ></label>
              <label
                className="price"
                text={qnte + "x" + product.discountedPrice + "Dhs"}
              ></label>
            </>
          ) : (
            <label
              className="price"
              text={qnte + "x" + product.price + "Dhs"}
            ></label>
          )}
        </flexboxLayout>
        <stackLayout>
          <label text={product.stock <= 0 ? "Epuisé" : ""}></label>
        </stackLayout>
      </stackLayout>
      <flexboxLayout
        marginTop={10}
        row={1}
        colSpan={2}
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-between"
      >
        <stackLayout width="100%">
          <AddItem {...{ product: product, type: "c" }}></AddItem>
        </stackLayout>
      </flexboxLayout>
    </gridLayout>
  ),
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    borderColor: new Color(colors.__default),
    borderWidth: 1,
    borderBottomWidth: 5,
    padding: 20,
    margin: 20,
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
