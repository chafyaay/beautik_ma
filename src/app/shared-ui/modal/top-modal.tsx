import { ViewWithBottomSheetBase } from "@nativescript-community/ui-material-bottomsheet";
import { Color, Enums, EventData, StackLayout } from "@nativescript/core";
import React from "react";
import { NotificationContext } from "../../utils/context";

export function TopSheetModalComponent({ options }) {
  const { notification, setNotification } =
    React.useContext(NotificationContext);
  const containerRef = React.useRef(null);

  const onloadhandler = (args: EventData) => {
    const view = args.object as StackLayout;

    if (view) {
      view.originX = 0;
      view.translateY = -200;
      view.style.backgroundColor = new Color("green");
      view
        .animate({
          translate: { x: 0, y: 0 },
          duration: 500,
          width: 100 + "%",
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
              //view.visibility = "collapse";
            });
        });
    }
  };
  return (
    <flexboxLayout
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width={"100%"}
      height="80"
      onLoaded={($event) => onloadhandler($event)}
    >
      <button text="hello"></button>
      <button text="X"></button>
    </flexboxLayout>
  );
}
/*     <gridLayout
      left={0}
      top="0"
      columns="*,auto"
      ref={containerRef}
      padding={20}
    >
      <label
        verticalAlignment="middle"
        col={0}
        text="hello"
        color={"white"}
      ></label>
      <label
        verticalAlignment="middle"
        col={1}
        className="icomoon"
        fontSize={30}
        text="&#xe902;"
        color={"white"}
      ></label>
    </gridLayout> */
