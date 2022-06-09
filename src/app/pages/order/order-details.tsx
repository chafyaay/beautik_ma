import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { StyleSheet } from "react-nativescript";
import { app_styles, colors } from "../../utils/app_styles";
import {
  AnimationCurve,
  Color,
  CoreTypes,
  Enums,
  EventData,
  Label,
  StackLayout,
  Switch,
} from "@nativescript/core";
import { getItem, setItem } from "../../utils/storage";
import { ViewWithBottomSheetBase } from "@nativescript-community/ui-material-bottomsheet/bottomsheet-common";

type OrderDetailsScreenProps = {
  route: RouteProp<MainStackParamList, "OrderDetailsScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "OrderDetailsScreen">;
};

export function OrderDetailsScreen({
  route,
  navigation,
}: OrderDetailsScreenProps) {
  const cercleRef = React.useRef(null);
  const checkRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      const view = cercleRef.current!.nativeView as ViewWithBottomSheetBase;
      const view2 = checkRef.current!.nativeView as ViewWithBottomSheetBase;

      try {
        if (view && view2) {
          view.translateY = -20;
          view.opacity = 0;
          view2.opacity = 0;
          view2.translateY = 30;
          view2.opacity = 0;

          const anim1 = view.createAnimation({
            translate: { x: 0, y: 20 },
            duration: 1000,
            opacity: 1,
            curve: CoreTypes.AnimationCurve.easeInOut,
          });

          const anim2 = view2.createAnimation({
            translate: { x: 0, y: 0 },
            duration: 500,
            opacity: 1,
            curve: CoreTypes.AnimationCurve.easeInOut,
          });

          anim2
            .play()
            .then(() => {
              anim2.cancel();
            })
            .catch((e) => {
              console.log("***** anim 1*****");
              console.log(e);
            });
          anim1
            .play()
            .then(() => {
              anim1.cancel();
            })
            .catch((e) => {
              console.log("***** anim 2 *****");
              console.log(e);
            });
        }
      } catch (error) {
        console.log(error);
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    }, 1000);
  });

  const msg =
    "Merci d'avoir passé une commande sur BEAUTIK.MA ! Commande Nº 365812576";
  return (
    <gridLayout rows="*,auto,auto,*" padding={20}>
      <absoluteLayout
        horizontalAlignment="center"
        width={100}
        height={100}
        row={1}
      >
        <label
          width={"100%"}
          color={colors.___active}
          ref={cercleRef}
          fontSize={50}
          textAlignment="center"
          className="icomoon"
          text="&#xea10;"
          opacity={0}
        ></label>
        <label
          opacity={0}
          width={"100%"}
          color={colors.___active}
          ref={checkRef}
          fontSize={100}
          textAlignment="center"
          className="icomoon"
          text="&#xea56;"
        ></label>
      </absoluteLayout>
      <stackLayout row={2}>
        <label
          fontSize={18}
          fontWeight="400"
          row={2}
          marginTop={30}
          marginBottom={60}
          textAlignment="center"
          text={msg}
          textWrap
        >
          <formattedString>
            <span text="Merci d'avoir passé une commande sur BEAUTIK.MA ! Commande"></span>
            <span fontWeight="600" text="\n Nº 365812576"></span>
          </formattedString>
        </label>

        <button
          style={{ ...app_styles.btn, ...app_styles.btn_primary }}
          onTap={() => {
            navigation.reset({
              index: 1,
              routes: [{ name: "Home" }],
            });
            setItem("cart", []);
          }}
        >
          <formattedString>
            <span class="icomoon" text="&#xea40;"></span>
            <span text=" \t page d'accueil "></span>
          </formattedString>
        </button>
      </stackLayout>
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.___white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.__default,
    padding: 20,
    marginTop: 20,
  },
  activecard: {
    backgroundColor: colors.___lightGray,
    borderWidth: 3,
    borderColor: colors.__primary,
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "700",
    marginTop: 30,
  },
  h2: {
    fontSize: 18,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
    color: colors.__defaultText,
    fontWeight: "400",
  },
});
