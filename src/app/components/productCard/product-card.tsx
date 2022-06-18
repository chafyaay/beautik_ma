import React, { useContext, useEffect } from "react";
import { AppStateContext } from "../../utils/context";
import { IPoroduct } from "../../utils/models";
import { styles } from "../../utils/styles";
import { calculateDiscountRate, getPrice } from "../../utils/utils";
import AddItemToCart from "../addToCart/addToCart";
import { RatingStarsComponent } from "../rating-stars/rating-stars";

const cardStyles = styles.productCard;
export default function ProductCard({ product }) {
  const { appState, setAppState } = useContext(AppStateContext);

  useEffect(() => {
    setAppState({ ...appState, pageName: "product-card" });
  }, []);

  useEffect(() => {});
  return (
    <stackLayout style={cardStyles.card}>
      <gridLayout rows="auto" columns="auto,*">
        {/* Image */}

        <image
          style={cardStyles.cover}
          col={0}
          verticalAlignment="top"
          width={"35%"}
          src={product.cover}
        ></image>
        {calculateDiscountRate(product) ? (
          <button
            textWrap
            row={0}
            col={0}
            style={cardStyles.promo}
            text={
              Math.floor(calculateDiscountRate(product)).toLocaleString() + "%"
            }
          ></button>
        ) : (
          <></>
        )}

        {/* description */}
        <stackLayout row={0} col={1}>
          <label style={cardStyles.title} textWrap>
            <formattedString>
              <span fontWeight="bold" text={product.brandName + " ,"}></span>
              <span text={product.title}></span>
            </formattedString>
          </label>
          {/* rating star */}
          <stackLayout>
            <RatingStarsComponent {...product}></RatingStarsComponent>
          </stackLayout>
          {/* prix */}
          <label>
            <formattedString>
              {getPrice(product).old ? (
                <span
                  style={cardStyles.oldPrice}
                  text={getPrice(product).old.toLocaleString()}
                ></span>
              ) : (
                <></>
              )}
              <span
                style={cardStyles.price}
                text={"\t" + getPrice(product).new.toLocaleString()}
              ></span>
            </formattedString>
          </label>
        </stackLayout>
      </gridLayout>
      {/* add items */}
      <stackLayout>
        <AddItemToCart product={product}></AddItemToCart>
      </stackLayout>
    </stackLayout>
  );
}
