import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { app_styles } from "../../utils/app_styles";
import { colors } from "../../utils";

type RegisterScreenProps = {
  route: RouteProp<MainStackParamList, "RegisterScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "RegisterScreen">;
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [showPassWord, SetShowPassWord] = useState(false);
  const [validator, setValidator] = useState({});

  const onTextChange = (fcn: string, value: any) => {
    let errors = {};
    let msg = "";
    let isvalid: boolean;
    switch (fcn) {
      case "email":
      case "phone":
        errors["required"] = !!value;
        errors["minlen"] = value.length > 6;
        errors["maxlen"] = value.length < 30;
        const pattern = [
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        ];
        const reg1 = new RegExp(pattern[0]);
        const reg2 = new RegExp(pattern[1]);
        const found = reg1.test(value) || reg2.test(value);
        errors["pattern"] = found;
        break;
      case "nom":
      case "prenom":
        errors["required"] = !!value;
        errors["minlen"] = value.length > 6;
        errors["maxlen"] = value.length < 30;
        errors["pattern"] = new RegExp(/^[\w-]*$/g).test(value);
        break;
      case "password":
        errors["required"] = !!value;
        errors["minlen"] = value.length >= 8;
        errors["maxlen"] = value.length < 30;

        errors["pattern"] = new RegExp(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
        ).test(value);
        break;

      default:
        break;
    }
    setValidator({ fcn, ...errors });
  };
  //--------------------------------------------//

  return (
    <gridLayout rows="*">
      <scrollView row={0}>
        <stackLayout padding={20}>
          <button
            padding={20}
            textAlignment="right"
            horizontalAlignment="right"
            fontSize={30}
            className="icomoon"
            text="&#xe902;"
            onTap={() => navigation.navigate("Home")}
          ></button>

          <label className="form-label">Email/Numéro de Téléphone </label>

          <textField
            hint="password"
            id="username"
            secure={showPassWord}
            style={app_styles.formControl}
            className="form-control"
            onTextChange={($event) => onTextChange("email", $event.value)}
          ></textField>

          <label className="form-label">Nom </label>
          <textField
            hint="password"
            style={app_styles.formControl}
            className="form-control"
            onTextChange={($event) => onTextChange("nom", $event.value)}
          ></textField>

          <label className="form-label">Prénom </label>
          <textField
            hint="password"
            style={app_styles.formControl}
            className="form-control"
            onTextChange={($event) => onTextChange("prenom", $event.value)}
          ></textField>

          <label className="form-label">Mot de passe </label>
          <textField
            hint="password"
            className="form-control"
            onTextChange={($event) => onTextChange("password", $event.value)}
            style={app_styles.formControl}
            borderColor={
              validator
                ? !validator["pattern"]
                  ? colors.__primary
                  : colors.__default
                : colors.__default
            }
          ></textField>
          <gridLayout columns="40,*" height={40}>
            <button
              horizontalAlignment="left"
              col={0}
              onTap={() => SetShowPassWord(!showPassWord)}
            >
              <formattedString>
                {showPassWord ? (
                  <span
                    fontSize={19}
                    className="icomoon"
                    text="&#xe9d1;"
                  ></span>
                ) : (
                  <span
                    fontSize={19}
                    className="icomoon"
                    text="&#xe9ce;"
                  ></span>
                )}
              </formattedString>
            </button>

            <label class="text" col={1}>
              Afficher le mot de passe
            </label>
          </gridLayout>

          <label className="link" text="Mot de passe oublié"></label>
          <button
            className="btn"
            text="Enregistrer"
            onTap={() => true}
          ></button>
          <button
            className="btn link"
            text="Se Connecter"
            onTap={() => navigation.navigate("LoginScreen")}
          ></button>
        </stackLayout>
      </scrollView>
    </gridLayout>
  );
};
