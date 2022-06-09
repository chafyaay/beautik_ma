import { ViewWithBottomSheetBase } from "@nativescript-community/ui-material-bottomsheet/bottomsheet-common";
import { Color, Enums, FlexboxLayout, StackLayout } from "@nativescript/core";
import * as React from "react";
import * as RNS from "react-nativescript";
import {
  AppContext,
  ModalContext,
  NotificationContext,
} from "../../utils/context";
import { app_styles } from "../../utils/app_styles";

export function TopSheetModal() {
  const [showModal, setShowModal] = React.useState(false);
  const { notification, setNotification } =
    React.useContext(NotificationContext);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const view = containerRef.current!.nativeView as ViewWithBottomSheetBase;
    view.visibility = notification.show ? "visible" : "collapse";
    try {
      if (view) {
        view.originX = 0;
        view.translateY = -200;
        view.backgroundColor = notification.bg;
        view.left = 0.1;
        view
          .animate({
            translate: { x: 0, y: 0 },
            duration: 500,
            curve: Enums.AnimationCurve.easeInOut,
          })
          .then(() => {
            view
              .animate({
                translate: { x: 0, y: -150 },
                duration: 500,
                curve: Enums.AnimationCurve.easeInOut,
                delay: 1000,
              })
              .then(() => {
                setNotification({ show: false });
                // view.visibility = "collapse";
              });
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [showModal]);
  return (
    <gridLayout
      left={0}
      top="0"
      columns="*,auto"
      ref={containerRef}
      padding={20}
      width="100%"
      height={80}
      backgroundColor={notification.bg}
    >
      <label
        verticalAlignment="middle"
        col={0}
        text={notification.msg}
        color={"white"}
      ></label>
      <label
        verticalAlignment="middle"
        col={1}
        className="icomoon"
        fontSize={30}
        text="&#xe902;"
        color={notification.color}
      ></label>
    </gridLayout>
  );
}
