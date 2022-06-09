import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import NavBar from "../../shared-ui/action-bar";
import { RatingStars } from "../../shared-ui/rating-stars/rating-stars";
import { Carousel } from "../../utils/carousel";
import { Icart } from "../../utils/props.interfaces";
import { getItem } from "../../utils/storage";

type ProductDetailsScreenProps = {
  route: RouteProp<MainStackParamList, "ProductDetailsScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "ProductDetailsScreen">;
};

export const ProductDetailsScreen = ({
  route,
  navigation,
}: ProductDetailsScreenProps) => {
  const [qnte, setQnte] = React.useState(0);
  const [product, setProduct] = React.useState({}) as any;

  function getQnte(cart: Icart[]) {
    if (cart) {
      if (cart.length > 0) {
        return cart.reduce(
          (a: any, b: any) => {
            a.qnte += b.qnte;
            return a;
          },
          { qnte: 0 }
        ).qnte;
      }
    }

    return 0;
  }
  React.useEffect(() => {
    if (getItem("cart")) {
      setQnte(getQnte(getItem("cart")));
    }
    setProduct(route.params.product);
    console.log("====================+++++++++================");
    console.log(route.params.product);
    console.log("==================////////==================");
  });

  return (
    <>
      <NavBar
        options={{ navigation: navigation, qnte: qnte, goBack: true }}
      ></NavBar>
      <Carousel
        item={{ cover: product.cover, imagesUrls: product.imagesUrls }}
      ></Carousel>
      <RatingStars data={product}></RatingStars>
    </>
  );
};
