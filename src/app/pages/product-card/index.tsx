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
        {product.discountedPrice > 0 ? (
          <flexboxLayout>
            <label>{product.price} DH</label>
            <label>{product.discountedPrice} DH</label>
          </flexboxLayout>
        ) : (
          <label className="far">{product.price}</label>
        )}
        <RatingStars data={product}></RatingStars>
        <AddItem {...product}></AddItem>
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
