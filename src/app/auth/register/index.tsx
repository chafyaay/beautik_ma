import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../xapp/_components/NavigationParamList";
import { app_styles, colors } from "../../xapp/_utils/app_styles";
import FormValidator, {
  ErroMessageHandler,
} from "../../xapp/_utils/form-validator";
import User from "../../xapp/_utils/user";

type RegisterScreenProps = {
  route: RouteProp<MainStackParamList, "RegisterScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "RegisterScreen">;
};

let registerformControls = {
  mobile: {
    value: "",
    label: "Numéro de Téléphone",
    hint: "0666111111",
    type: "text",
    isValid: false,
    touched: false,
    max: 10,
  },
  email: {
    value: "",
    label: "Email",
    hint: "email@company.com",
    type: "text",
    isValid: false,
    touched: false,
    max: 20,
  },
  name: {
    value: "",
    label: "Nom & Prénom",
    hint: "Jean Smith",
    type: "text",
    isValid: false,
    touched: false,
    max: 30,
  },
  password: {
    value: "",
    label: "Mot de passe",
    hint: "12AbE678",
    type: "password",
    isValid: false,
    touched: false,
    max: 16,
  },
  adress: {
    value: "",
    label: "Adresse",
    hint: "text",
    type: "textarea",
    isValid: false,
    touched: false,
    max: 80,
  },
  isFormValid: false,
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [registerForm, setRegisterForm] = useState({}) as any;

  React.useEffect(() => {
    setRegisterForm(registerformControls);
  }, []);
  React.useEffect(() => {
    createRegisterForm();
  });

  const onTextChangeHandler = (input: any) => {
    const REGISTER_FORM: any = { ...registerForm };

    REGISTER_FORM[input.input].value = input._value;

    REGISTER_FORM[input.input].isValid = FormValidator(
      input.input,
      input._value
    ).isValid;

    REGISTER_FORM[input.input].touched = input._value !== "";

    let isFormValid = true;

    for (let key in REGISTER_FORM) {
      if (key !== "isFormValid")
        isFormValid = isFormValid && REGISTER_FORM[key].isValid;
    }

    REGISTER_FORM.isFormValid = isFormValid;

    setRegisterForm(REGISTER_FORM);

    console.log("--------------->>>");
    console.log(registerForm);
    console.log("--------------->>>");
  };

  const onSubmit = () => {
    const user = new User();
    const mobile = registerForm.mobile.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    console.log({ mobile, email, password });

    user.register({ mobile, email, password });
  };

  const inputTemplate = (input: any) => {
    return (
      <stackLayout style={app_styles.form_group}>
        <label
          className="form-label"
          marginBottom={10}
          text={input.label}
        ></label>
        {input.type === "text" || input.type === "password" ? (
          <textField
            onTextChange={($event) =>
              onTextChangeHandler({ _value: $event.value, ...input })
            }
            maxLength={input.max}
            style={app_styles.formControl}
            secure={input.type === "password"}
            hint={input.hint}
          ></textField>
        ) : input.type === "textarea" ? (
          <textView
            onTextChange={($event) =>
              onTextChangeHandler({ _value: $event.value, ...input })
            }
            maxLength={input.max}
            style={app_styles.formControl}
            height={100}
            hint={input.hint}
          ></textView>
        ) : (
          <></>
        )}

        {input.touched && !input.isValid ? (
          <label color={colors.___danger} textWrap marginTop={10}>
            <formattedString>
              <span
                fontSize={14}
                fontWeight="500"
                text={ErroMessageHandler(input?.input).title}
              ></span>
              {ErroMessageHandler(input?.input).desc ? (
                <span
                  fontSize={13}
                  text={"\n" + ErroMessageHandler(input?.input).desc}
                ></span>
              ) : (
                <span></span>
              )}
            </formattedString>
          </label>
        ) : (
          <></>
        )}
      </stackLayout>
    );
  };

  const createRegisterForm = (): any[] => {
    let form = [];
    for (let input in registerForm) {
      form.push({ input: input, ...registerForm[input] });
    }
    return form;
  };

  return (
    <>
      <scrollView>
        <gridLayout rows="auto,auto,*" padding={20}>
          <button
            horizontalAlignment="right"
            row={0}
            onTap={() => {
              navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            }}
            text="&#xe911;"
            className="icomoon"
            fontSize={18}
            marginRight={20}
          ></button>
          <stackLayout row={1}>
            <label
              text="Création un compte BEAUTIK.MA"
              textWrap
              style={{
                textAlignment: "center",
                fontWeight: "700",
                fontSize: 25,
                letterSpacing: 0.06,
                marginBottom: 30,
              }}
            ></label>

            {createRegisterForm().map((input) => inputTemplate(input))}
          </stackLayout>
          <stackLayout row={2} padding={20}>
            <button
              style={
                registerForm.isFormValid
                  ? {
                      ...app_styles.btn,
                      ...app_styles.btn_primary,
                      width: "100%",
                    }
                  : {
                      ...app_styles.btn,
                      ...app_styles.btn_disabled,
                      width: "100%",
                    }
              }
              onTap={() => onSubmit()}
              text="Créer un compte"
              isEnabled={registerForm.isFormValid}
            ></button>
            <button
              style={{ ...app_styles.btn, ...app_styles.link, width: "100%" }}
              text="Se Connecter"
              onTap={() =>
                navigation.reset({
                  index: 1,
                  routes: [{ name: "LoginScreen" }],
                })
              }
            ></button>
          </stackLayout>
        </gridLayout>
      </scrollView>
    </>
  );
};
