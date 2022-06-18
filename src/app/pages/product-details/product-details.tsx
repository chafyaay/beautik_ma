import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { Carousel } from "../../components/carousel";
import { RatingStarsComponent } from "../../components/rating-stars/rating-stars";
import { AppStateContext } from "../../utils/context";
import { IPoroduct } from "../../utils/models";
import { MainStackParamList } from "../../utils/navigations-params";
import { styles } from "../../utils/styles";
import { calculateDiscountRate } from "../../utils/utils";

const cardStyles = styles.productCard;

type ProductDetailsProps = {
  route: RouteProp<MainStackParamList, "ProductDetails">;
  navigation: FrameNavigationProp<MainStackParamList, "ProductDetails">;
};

export const ProductDetails = ({ route, navigation }: ProductDetailsProps) => {
  const [product, setProduct] = React.useState({}) as any;
  const { appState, setAppState } = React.useContext(AppStateContext);

  React.useEffect(() => {
    setProduct(route.params);
    setAppState({
      ...appState,
      pageName: "product-page",
      navBar: { show: true, type: "g" },
      navigation: navigation,
      route: route,
    });
  }, []);

  return (
    <scrollView>
      <stackLayout>
        <button
          width={100}
          height={100}
          text="go back"
          onTap={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: appState.history }],
            });
          }}
        ></button>
      </stackLayout>

      {/*     <Carousel
          item={{ cover: product.cover, imagesUrls: product.imagesUrls }}
        ></Carousel>
        <gridLayout rows="auto,auto">
          <stackLayout row={0}>
            <Carousel
              item={{ cover: product.cover, imagesUrls: product.imagesUrls }}
            ></Carousel>
          </stackLayout>

          <stackLayout row={1} padding={20}>
            {calculateDiscountRate(product) ? (
              <button
                textWrap
                row={0}
                col={0}
                style={cardStyles.promo}
                text={
                  Math.floor(calculateDiscountRate(product)).toLocaleString() +
                  "%"
                }
              ></button>
            ) : (
              <></>
            )}
            <label textWrap>
              <formattedString>
                <span fontWeight="600" text={product.brandName}></span>
                <span text={product.title}></span>
              </formattedString>
            </label>
            <flexboxLayout flexDirection="row" justifyContent="space-between">
              <stackLayout flexGrow={1}>
                <RatingStarsComponent
                  {...(product?.rating, product?.comments)}
                ></RatingStarsComponent>
              </stackLayout>
              <stackLayout flexGrow={1} paddingTop={20}>
                <label
                  fontWeight="700"
                  fontSize={20}
                  text={
                    product.discountedPrice < product.price &&
                    product.discountedPrice + " Dhs"
                  }
                ></label>
                {product.discountedPrice < product.price && (
                  <>
                    <label
                      textDecoration="line-through"
                      text={product.price + " Dhs"}
                    ></label>
                  </>
                )}
              </stackLayout>
            </flexboxLayout>
            <label text="Description"></label>
            <htmlView html={product.desc}></htmlView>
          </stackLayout>
        </gridLayout> */}
    </scrollView>
  );
};
