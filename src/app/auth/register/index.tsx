import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { globalStyles } from "../../utils/globalStyles";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

type RegisterScreenProps = {
  route: RouteProp<MainStackParamList, "RegisterScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "RegisterScreen">;
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [showPassWord, SetShowPassWord] = useState(false);
  const onSubmit = (data) => {
    alert(1);
    console.log(data);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

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

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textField
                style={globalStyles.formControl}
                className="form-control"
                text="op"
              ></textField>
            )}
            name="lastName"
          />

          <label className="form-label">Mot de passe </label>
          <textField
            secure={showPassWord}
            style={globalStyles.formControl}
            className="form-control"
          ></textField>
          <gridLayout columns="40,*" height={40}>
            <button col={0} onTap={() => SetShowPassWord(!showPassWord)}>
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

          <label className="form-label">Nom </label>
          <textField
            style={globalStyles.formControl}
            className="form-control"
          ></textField>

          <label className="form-label">Prénom </label>
          <textField
            style={globalStyles.formControl}
            className="form-control"
          ></textField>

          <label className="form-label">Mot de passe </label>
          <textField
            className="form-control"
            style={globalStyles.formControl}
          ></textField>

          <label className="link" text="Mot de passe oublié"></label>
          <button
            className="btn"
            text="Enregistrer"
            onTap={() => handleSubmit(onSubmit)}
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
