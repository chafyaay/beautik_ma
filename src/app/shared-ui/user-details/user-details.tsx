import React, { useContext, useEffect, useState } from "react";
import { app_styles, colors } from "../../_utils/app_styles";
import { AppNavigationContext, OffCanvasContext } from "../../_utils/context";
import { getItem } from "../../_utils/localstorage";
import User from "../../_utils/user";

export const UserDetails = ({ navigation }) => {
  const [user, SetUser] = useState({}) as any;
  const [isLogged, SetIsLogged] = useState(false);
  const { offcanvas, setOffCanvasContext } = useContext(OffCanvasContext);

  useEffect(() => {
    SetUser(getItem("user-info") || {});
    SetIsLogged(!!getItem("user-info"));
  }, []);

  return (
    <stackLayout>
      {isLogged ? (
        <stackLayout paddingLeft={20}>
          <label textTransform="uppercase" textWrap textAlignment="left">
            <formattedString>
              <span text="Bonjour "></span>
              {user.name ? <span text={user.name + " !"}></span> : <></>}
            </formattedString>
          </label>
          <label
            textWrap
            style={app_styles.link}
            fontSize={13}
            padding={0}
            margin={0}
            fontWeight={"bold"}
            letterSpacing={0.02}
            textTransform="uppercase"
            onTap={() => {
              const _user = new User();
              _user.logout();
              setOffCanvasContext({ show: false });
            }}
            text="Se déconnecter"
          ></label>
        </stackLayout>
      ) : (
        <flexboxLayout
          flexDirection="column"
          justifyContent="flex-start"
          marginLeft={1}
        >
          <button
            textWrap
            style={app_styles.link}
            textTransform="uppercase"
            fontWeight={"bold"}
            letterSpacing={0.02}
            onTap={() => {
              try {
                setOffCanvasContext({ show: false });
                navigation.navigate("LoginScreen");
              } catch (error) {
                console.log(error);
              }
            }}
            textAlignment="left"
            text="Se connecter"
          ></button>
          <button
            textWrap
            style={app_styles.link}
            padding={0}
            margin={0}
            fontWeight={"bold"}
            letterSpacing={0.02}
            textTransform="uppercase"
            textAlignment="left"
            text="Créer un compte"
            onTap={() => {
              try {
                setOffCanvasContext({ show: false });
                navigation.navigate("RegisterScreen");
              } catch (error) {
                console.log(error);
              }
            }}
          ></button>
        </flexboxLayout>
      )}
    </stackLayout>
  );
};
