import { Color } from "@nativescript/core";
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import AddItem from "../../shared-ui/add-item";
import { RatingStars } from "../../shared-ui/rating-stars/rating-stars";
import { app_styles, colors } from "../../utils/app_styles";
import { LocalStorage, getItem } from "../../utils/storage";

export function AppCard({ product, cardType }) {
  let template: any;
  switch (cardType) {
    case "c":
      try {
        console.log("====================================");
        console.log(cardType);
        console.log("====================================");

        template = CardTemplates.cart(product);
      } catch (error) {
        template = (
          <>
            <label text={error}></label>
          </>
        );
      }
      break;
    case "p":
      template = CardTemplates.product(product);
      break;
    default:
      template = (
        <>
          <label text="ERR"></label>
        </>
      );
  }
  return template;
}

const CardTemplates = {
  product: (product) => (
    <gridLayout style={styles.card} columns="*,*">
      <image col={0} src={product.cover}></image>
      <stackLayout col={1}>
        <label className="text">{product.brandName}</label>
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
        <AddItem {...{ product: product, type: "p" }}></AddItem>
      </stackLayout>
    </gridLayout>
  ),
  cart: (product) => (
    <gridLayout style={app_styles.cartCard} rows="auto,auto" columns="auto,*">
      <image
        verticalAlignment="top"
        col={0}
        row="0"
        src={product.cover}
        width="100"
        marginRight={10}
      ></image>
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
              >
                {product.price} DH
              </label>
              <label className="price">{product.discountedPrice} DH</label>
            </>
          ) : (
            <label className="price">{product.price} DH</label>
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
