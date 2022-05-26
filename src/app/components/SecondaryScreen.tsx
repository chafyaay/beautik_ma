import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "./NavigationParamList";
import { StyleSheet } from "react-nativescript";
import { Color, Frame as frameModule, Page } from "@nativescript/core";

function goBack() {
  frameModule.topmost().goBack();
}

type SecondaryScreenProps = {
  route: RouteProp<MainStackParamList, "Secondary">;
  navigation: FrameNavigationProp<MainStackParamList, "Secondary">;
};

export function SecondaryScreen({ navigation }: SecondaryScreenProps) {
  React.useEffect(() => {});
  return (
    <frame actionBarVisibility="never">
      <page accessibilityHidden={true}>
        <stackLayout>
          <button onTap={() => goBack()}>hello</button>
        </stackLayout>
      </page>
    </frame>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  text: {
    textAlignment: "center",
    fontSize: 24,
    color: "black",
  },
  button: {
    fontSize: 24,
    color: "#2e6ddf",
  },
});
