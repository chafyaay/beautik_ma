import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { app_styles } from "../../utils/app_styles";

type LoginScreenProps = {
  route: RouteProp<MainStackParamList, "LoginScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "LoginScreen">;
};
export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  return (
    <>
      <stackLayout padding={20}>
        <label className="form-label">Email/Numéro de Téléphone </label>
        <textField
          style={app_styles.formControl}
          className="form-control"
          formattedText={""}
        ></textField>
        <label className="form-label">Mot de passe </label>
        <textField
          className="form-control"
          style={app_styles.formControl}
          formattedText={""}
        ></textField>
        <label className="link" text="Mot de passe oublié"></label>
        <button className="btn" text="Login"></button>
        <button
          className="btn link"
          text="Créer un compte"
          onTap={() => navigation.navigate("RegisterScreen")}
        ></button>
      </stackLayout>
    </>
  );
};
