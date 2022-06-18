import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../xapp/_components/NavigationParamList";
import { app_styles, colors } from "../../xapp/_utils/app_styles";
import { getItem, setItem } from "../../xapp/_utils/localstorage";
import User from "../../xapp/_utils/user";

type LoginScreenProps = {
  route: RouteProp<MainStackParamList, "LoginScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "LoginScreen">;
};
export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [userData, setUserData] = React.useState({}) as any;
  const [loginMsgErr, setloginMsgErr] = React.useState("") as any;

  const isValid = false;

  React.useEffect(() => {
    setItem("user", {
      mobile: "0667776679",
      email: "Yassine@gma.com",
      password: "AZER2343",
      name: "yassine chafyaay",
      adresse: "dyar dakhama, bouskoura",
    });
  });

  const loginHandler = () => {
    let _user = { ...userData };
    _user["username"] = "0667776677";
    _user["password"] = "AZER2343";
    setUserData(_user);

    try {
      const user = new User();
      user.login(userData);
      console.log(user.isLogged);

      if (!user.isLogged)
        setloginMsgErr(
          "Merci d'entrer un nom d'utilistaeur et un mont de passe valide !"
        );
      else {
        navigation.goBack();
        setloginMsgErr("");
      }
    } catch (error) {
      console.log(error);
      navigation.navigate("Home");
    }
  };

  const onTextChangeHandler = (value: any, fcn: string) => {
    let user = { ...userData };
    user[fcn] = value;
    setUserData(user);
    console.log(getItem("user"));
  };

  return (
    <gridLayout rows="*,auto,*">
      <button
        horizontalAlignment="right"
        row={0}
        onTap={() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }}
        text="&#xe911;"
        className="icomoon"
        fontSize={20}
        marginRight={20}
      ></button>
      <stackLayout row={1} padding={40}>
        <label
          text="Connexion à BEAUTIK.MA"
          textWrap
          style={{
            textAlignment: "center",
            fontWeight: "700",
            fontSize: 30,
            letterSpacing: 0.06,
            marginBottom: 30,
          }}
        ></label>
        {loginMsgErr ? (
          <label color={colors.___danger} text={loginMsgErr}></label>
        ) : (
          <></>
        )}

        <label
          textWrap
          marginBottom={10}
          className="form-label"
          text="Email/Numéro de Téléphone "
        ></label>
        <textField
          text="0667776677"
          onTextChange={($event) =>
            onTextChangeHandler($event.value, "username")
          }
          style={app_styles.formControl}
          className="form-control"
        ></textField>

        <label
          marginBottom={10}
          className="form-label"
          text="Mot de passe"
        ></label>
        <textField
          text="AZER2343"
          onTextChange={($event) =>
            onTextChangeHandler($event.value, "password")
          }
          className="form-control"
          style={app_styles.formControl}
          secure
        ></textField>

        <label
          marginBottom={30}
          textAlignment="right"
          style={{ ...app_styles.link, width: "100%" }}
          text="Mot de passe oublié"
          onTap={() => {}}
        ></label>

        <button
          marginTop={30}
          style={
            userData.usrname !== "" && userData.password !== ""
              ? { ...app_styles.btn, ...app_styles.btn_primary, width: "100%" }
              : { ...app_styles.btn, ...app_styles.btn_disabled, width: "100%" }
          }
          isEnabled={userData.usrname !== "" && userData.password !== ""}
          text="se connecter"
          onTap={() => loginHandler()}
        ></button>
        <button
          style={{ ...app_styles.btn, ...app_styles.link, width: "100%" }}
          text="Créer un compte"
          onTap={() =>
            navigation.reset({ index: 1, routes: [{ name: "RegisterScreen" }] })
          }
        ></button>
      </stackLayout>
    </gridLayout>
  );
};
