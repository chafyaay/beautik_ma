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

// This is needed to keep the reconciler aware that it's the same portal on each render
const portalRoot = new RNS.NSVRoot();
const portalLabel = "bottomsheet:Unique label to describe my portal";

import { AbsoluteLayout } from "@nativescript/core";
import { set } from "react-hook-form";

// This is needed to keep the reconciler aware that it's the same portal on each render

export default function BottomSheetTest({ options }) {
  // A ref to the container
  const containerRef = React.useRef(null);

  // A ref for the react portal
  const portalRef = React.useRef(null);
  const { appProps, setAppProps } = React.useContext(AppContext) as any;

  React.useEffect(() => {
    setAppProps({ ...appProps, modal: false });
    console.log("=============== appProps =====================");
    console.log(appProps.modal);
    console.log("====================================");
    appProps.modal ? handleOpenModal() : handleCloseModal();
  });

  const handleOpenModal = () => {
    const container = containerRef.current!
      .nativeView as ViewWithBottomSheetBase;
    container.showBottomSheet({
      view: portalRef.current!.nativeView,
      context: {},
      closeCallback: (args) => {
        console.log(`Closed with args`, args);
      },
    });
  };

  const handleCloseModal = () => {
    const portalView = portalRef.current?.nativeView as any;

    portalView.closeBottomSheet({ name: "react-nativescript is king" });
  };

  return (
    <>
      <stackLayout ref={containerRef}></stackLayout>
      {/*
              This portal is not rendered below the button.
              It's rendered into a null root, effectively creating a new DOM tree.
          */}
      {RNS.createPortal(
        <stackLayout ref={portalRef}>
          <button
            className="btn"
            style={app_styles.primaryBtn}
            text="Consulter votre panier"
            onTap={() => {
              options?.navigation?.navigate("CartDetails");
              try {
                handleCloseModal();
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </stackLayout>,
        portalRoot,
        portalLabel
      )}
    </>
  );
}

export function TopSheetModal({ options }) {
  const [showModal, setShowModal] = React.useState(false);
  const { notification, setNotification } =
    React.useContext(NotificationContext);
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    const view = containerRef.current!.nativeView as ViewWithBottomSheetBase;

    console.log("============= ++++++++++ =======================");
    console.log(view);

    try {
      if (view) {
        view.originX = 0;
        view.translateY = -200;
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
              .then(() => setNotification({ show: false }));
          });
      }
    } catch (error) {
      console.log("================ err ====================", error);
    }
    console.log("====================================");
  }, [showModal]);
  return (
    <gridLayout
      columns="*,auto"
      ref={containerRef}
      backgroundColor={"red"}
      width="100%"
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
    </gridLayout>
  );
}
