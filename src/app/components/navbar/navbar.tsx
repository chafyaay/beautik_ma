import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-nativescript";
import { getItem } from "../../helpers/localstorage";
import { AppStateContext } from "../../utils/context";
import { colors } from "../../utils/styles";
import { getCartTotalItems } from "../../utils/utils";

function Navbar() {
  const [qnte, setQnte] = useState(0);
  const { appState } = useContext(AppStateContext) as any;
  const [navbarType, setNavbarType] = useState("");

  useEffect(() => {}, []);
  useEffect(() => {
    setQnte(getCartTotalItems(getItem("cart")));
    setNavbarType(appState.navBar.type);
  });

  const template = () => {
    switch (navbarType) {
      case "s":
        return (
          <>
            <gridLayout style={styles.tab}>
              <label
                style={styles.icon}
                text="&#xe919;"
                className="icomoon"
              ></label>
            </gridLayout>
            <gridLayout style={styles.tab}>
              <label
                style={styles.icon}
                text="&#xe91a;"
                className="icomoon"
              ></label>
            </gridLayout>
            <gridLayout style={styles.tab}>
              <label
                style={styles.icon}
                text="&#xe91c;"
                className="icomoon"
              ></label>
            </gridLayout>

            <gridLayout style={styles.tab}>
              <label
                style={styles.cartValue}
                fontSize={14}
                horizontalAlignment="center"
                verticalAlignment="top"
                text={qnte?.toLocaleString()}
              ></label>
              <label
                style={styles.icon}
                text="&#xe91e;"
                className="icomoon"
              ></label>
            </gridLayout>
          </>
        );
        break;
      case "g":
        <>
          <gridLayout style={styles.tab}>
            <button
              style={styles.icon}
              text="&#xe912;"
              className="icomoon"
            ></button>
          </gridLayout>
          <gridLayout style={styles.tab}>
            <label
              style={styles.cartValue}
              fontSize={14}
              horizontalAlignment="center"
              verticalAlignment="top"
              text={qnte?.toLocaleString()}
            ></label>
            <label
              style={styles.icon}
              text="&#xe91e;"
              className="icomoon"
            ></label>
          </gridLayout>
        </>;
      default:
        return <></>;
    }
  };

  return <flexboxLayout style={styles.container}>{template()}</flexboxLayout>;
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 160,
    backgroundColor: colors.lighter,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.light,
  },
  tab: {
    width: "25%",
    height: 80,
  },
  tabLabel: {
    fontWeigh: "600",
    fontSize: 13,
    textTransform: "uppercase",
    color: colors.dark,
    textAlignment: "center",
    verticalAlignment: "bottom",
    letterSpacing: 0.04,
  },
  icon: {
    fontSize: 20,
    textTransform: "uppercase",
    color: colors.dark,
    textAlignment: "center",
    height: 60,
  },
  cartValue: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    textAlignment: "center",
    borderRadius: 20,
    color: colors.dark,
    fontWeight: "bold",
  },
});

export default Navbar;
