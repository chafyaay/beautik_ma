import { Color } from "@nativescript/core";
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { colors } from "../../utils";
import AddItem from "../../shared-ui/add-item";
import { RatingStars } from "../../shared-ui/rating-stars/rating-stars";

function ProductCard({ product }) {
  return (
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
                color={colors.__gray}
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
        <AddItem options={{ product: product, type: "home" }}></AddItem>
      </stackLayout>
    </gridLayout>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    borderColor: new Color(colors.__gray),
    borderWidth: 1,
    borderBottomWidth: 5,
    padding: 20,
    margin: 20,
  },
});
