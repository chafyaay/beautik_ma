import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-nativescript";
import { colors } from "../../utils/app_styles";

function NavBar({ options }) {
  const { navigation, qnte } = options;
  const [_qnte, setQnte] = useState(0);
  useEffect(() => {});
  return (
    <flexboxLayout
      style={STYLES.header}
      flexDirection="row"
      justifyContent="space-between"
    >
      <stackLayout
        horizontalAlignment="center"
        onTap={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: "CartDetails" }],
          });
        }}
      >
        <button
          marginLeft={20}
          left={0}
          top="0"
          fontSize={30}
          col={2}
          text="&#xe903;"
          className="icomoon"
        ></button>
      </stackLayout>
      <gridLayout
        rows="*"
        style={STYLES.cartIcon}
        onTap={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: "CartDetails" }],
          });
        }}
      >
        <label
          textAlignment="center"
          borderRadius="25"
          width={25}
          height="25"
          marginTop={-35}
          marginRight={-30}
          backgroundColor={colors.__primary}
          fontSize={15}
        >
          {qnte}
        </label>
        <label
          verticalAlignment="middle"
          horizontalAlignment="center"
          fontSize={30}
          text="&#xe901;"
          className="icomoon"
        ></label>
      </gridLayout>
    </flexboxLayout>
  );
}

export default NavBar;

export const STYLES = StyleSheet.create({
  header: {
    borderBottomColor: colors.__default,
    borderBottomWidth: 1,
  },
  cartIcon: {
    width: 100,
    color: colors.__default,
    fontSize: 30,
    textAlignment: "center",
    verticalAlignment: "middle",
  },
  cartValue: {
    color: colors.___lightGray,
    backgroundColor: colors.___black,
    width: 23,
    height: 23,
    borderRadius: 50,
    fontSize: 12,
    marginTop: -30,
    marginRight: -30,
    fontWeight: "500",
    textAlignment: "center",
  },
});
