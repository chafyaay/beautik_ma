import { ViewWithBottomSheetBase } from "@nativescript-community/ui-material-bottomsheet/bottomsheet-common";
import { Button, CoreTypes, EventData } from "@nativescript/core";
import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../xapp/_components/NavigationParamList";
import { app_styles } from "../../xapp/_utils/app_styles";
import {
  AppNavigationContext,
  AppStateProps,
  APP_STATE_CONTEXT,
  NotificationContext,
  OffCanvasContext,
} from "../../xapp/_utils/context";
import { UserDetails } from "../user-details/user-details";
import User from "../../xapp/_utils/user";

type OffCanvasProps = {
  route: RouteProp<MainStackParamList, "Home">;
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};
export function OffCanvas(value) {
  React.useContext(NotificationContext);
  const { offcanvas, setOffCanvasContext } = React.useContext(
    OffCanvasContext
  ) as any;
  const [categories, setCategories] = React.useState([]) as any[];
  const { navigationOptions, setNavigation } =
    React.useContext(AppNavigationContext);
  const { appState, setAppState } = React.useContext(APP_STATE_CONTEXT) as any;

  const _user = new User();

  React.useEffect(() => {
    setCategories([
      { id: 1, label: "Maison & Cuisine", icon: "918;" },
      { id: 2, label: "Beauté & Santé", icon: "917;" },
      { id: 3, label: "Accessoires Mode", icon: "916;" },
    ]);
  }, []);

  const onLoadCanvas = (args: EventData) => {
    const view = args.object as ViewWithBottomSheetBase;
    const close = view.getViewById("closeBtn") as Button;

    view.translateX = -100;
    view.style.paddingLeft = "auto";
    const anim = view.createAnimation({
      translate: { x: 20, y: 0 },

      duration: 500,
      curve: CoreTypes.AnimationCurve.easeInOut,
    });

    anim
      .play()
      .then(() => {})
      .catch(() => {});

    /* 
                  close.addEventListener("tap", () => {
                    view
                      .createAnimation({
                        translate: { x: -1000, y: 0 },
                        duration: 1500,
                        curve: CoreTypes.AnimationCurve.easeOut,
                      })
                      .play()
                      .then(() => {
                        setOffCanvasContext({ show: false });
                      });
                  });
              
                  view.addEventListener("tap", () => {
                    view
                      .createAnimation({
                        translate: { x: -1000, y: 0 },
                        duration: 1500,
                        curve: CoreTypes.AnimationCurve.easeOut,
                      })
                      .play()
                      .then(() => {
                        setOffCanvasContext({ show: false });
                      });
                  }); */
  };

  return (
    <>
      {offcanvas.show ? (
        <gridLayout
          marginTop={0}
          onLoaded={($event) => onLoadCanvas($event)}
          height={"100%"}
          width="100%"
          backgroundColor={"rgba(0,0,0,.7)"}
        >
          <gridLayout
            rows="auto,*,*"
            backgroundColor={"white"}
            width="100%"
            height={"100%"}
            padding={20}
          >
            <gridLayout
              rows="auto,*"
              columns="auto,*"
              row={1}
              height={"100%"}
              width={"90%"}
            >
              <button
                col={1}
                horizontalAlignment="right"
                row={0}
                onTap={() => {
                  setOffCanvasContext({ show: false });
                  // navigationOptions._navigation.navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                }}
                text="&#xe911;"
                className="icomoon"
                fontSize={18}
                marginRight={20}
              ></button>

              <label
                row={0}
                col={0}
                textAlignment="left"
                fontWeight="600"
                letterSpacing={0.05}
                marginBottom={10}
                textWrap
                fontSize={22}
                paddingTop={10}
                text={"Tout les catégories" + appState.cart_qnte}
              ></label>

              <stackLayout row={1} col={0} colSpan={2} marginTop={30}>
                {categories.map((item) => (
                  <button
                    textAlignment="left"
                    textWrap
                    width={"100%"}
                    style={{ ...app_styles.btn_category, marginLeft: 0 }}
                    marginBottom={10}
                    verticalAlignment="middle"
                  >
                    <formattedString>
                      {item.id === 1 && (
                        <span
                          className="icomoon"
                          fontSize={30}
                          text="&#xe918;"
                        ></span>
                      )}
                      {item.id === 2 && (
                        <span
                          className="icomoon"
                          fontSize={30}
                          text="&#xe917;"
                        ></span>
                      )}
                      {item.id === 3 && (
                        <span
                          className="icomoon"
                          fontSize={30}
                          text="&#xe916;"
                        ></span>
                      )}
                      <span text={"\t" + item.label}></span>
                    </formattedString>
                  </button>
                ))}
              </stackLayout>
            </gridLayout>
          </gridLayout>
        </gridLayout>
      ) : (
        <></>
      )}
    </>
  );
}
