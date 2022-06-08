import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { StyleSheet } from "react-nativescript";
import { colors } from "../../utils/app_styles";
import { Color, EventData, StackLayout, Switch } from "@nativescript/core";
import { getItem } from "../../utils/storage";

type ShipementScreenProps = {
  route: RouteProp<MainStackParamList, "ShipementScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "ShipementScreen">;
};

export function ShipementScreen({ route, navigation }: ShipementScreenProps) {
  const [editAdress, setEditAdress] = React.useState(false);
  const [checkedMode, setCheckedMode] = React.useState(false);
  const [shippmenetMode, setShippmenetMode] = React.useState(1);
  const [lastSelected, setLastSelected] = React.useState(null);
  const [subTotal, setSubtotal] = React.useState(null);
  const cartDetails = getItem("cart") || [];

  const shippmentMode = [
    {
      id: 1,
      type: "adress",
      title: "Livraison à votre adresse",
      details: "Livré entre le 8 jeudi Juin 2022 et Samedi 19 Juin 2022",
      price: "23 Dhs",
    },
    {
      id: 2,
      type: "poste",
      title: "Envoi Postal à",
      details: "Livré entre le 8 jeudi Juin 2022 et Samedi 19 Juin 2022",
      price: "23 Dhs",
    },
  ];

  React.useEffect(() => {
    console.log("====================================");
    console.log(cartDetails.subTotal);
    console.log("====================================");
  });
  const userData: any = {
    fname: "yassine",
    lname: "chafyeey",
    email: null,
    adress: "Dyar Dakhama 02 , Imm 9, Etage 04, Appt 19",
    region: "Grand Casablanca",
    city: "BOUSKOURA",
    phone: "+212668769384",
  };
  const shippmentData: any = {};

  const onCheckedChange = (args: EventData, s) => {
    setCheckedMode(false);
    let sw = args.object as Switch;
    let isChecked = sw.checked; // boolean

    if (s == 1) {
      sw.checked = true;
    }
  };

  const OnSelectShippingOption = (args: EventData, option: number) => {
    setShippmenetMode(option);
  };

  return (
    <>
      <stackLayout height={"100%"}>
        <scrollView>
          <stackLayout padding="20">
            <stackLayout style={styles.card}>
              <flexboxLayout flexDirection="row" justifyContent="space-between">
                <label style={styles.title} text="adress"></label>
                <button
                  style={styles.title}
                  color={colors.__primary}
                  text="Modifier"
                ></button>
              </flexboxLayout>
              <stackLayout>
                <label
                  style={styles.h2}
                  text={userData.fname + " " + userData.fname}
                ></label>

                <textView editable={editAdress}>
                  <formattedString>
                    <span style={styles.text} text={`${userData.adress} \n`} />
                    <span
                      style={styles.text}
                      text={`${userData.region} - ${userData.city} \n`}
                    />
                    <span style={styles.phone} text={`${userData.phone}  \n`} />
                  </formattedString>
                </textView>
              </stackLayout>
            </stackLayout>
            {/* CHOISISSEZ VOTRE MODE DE LIVRAISON : */}
            <label
              textWrap
              style={styles.title}
              text=" MODE DE LIVRAISON :"
            ></label>
            {/*  ------  */}
            {/*  ------  */}
            {/*  ------  */}
            {shippmentMode.map((mode: any) => {
              return (
                <stackLayout
                  key={mode.id}
                  onTap={($event) => OnSelectShippingOption($event, mode.id)}
                  style={{
                    ...styles.card,
                    ...(shippmenetMode === mode.id ? styles.activecard : null),
                  }}
                >
                  <switch
                    horizontalAlignment="right"
                    checked={shippmenetMode === mode.id}
                  ></switch>

                  <label text={mode.title}></label>
                  <label textWrap>
                    <formattedString>
                      <span
                        text={`Livré entre le ${shippmentData.date1} et le ${shippmentData.date2}.`}
                      ></span>

                      <span
                        color={colors.___warning}
                        text="\nFrais de livraison : "
                      ></span>
                      <span color={colors.___warning} text={mode.price}></span>
                    </formattedString>
                  </label>
                </stackLayout>
              );
            })}

            {/* ------  --------*/}
            {/* details */}

            {!!cartDetails && cartDetails.length > 0 ? (
              <gridLayout
                style={styles.card}
                rows="auto,auto,auto"
                columns="auto,*,auto"
              >
                <label row={0} col={0} text="Sous-total"></label>
                <label
                  row={0}
                  col={2}
                  textAlignment="left"
                  fontWeight="600"
                  marginLeft={20}
                  horizontalAlignment="right"
                  text={cartDetails.subTotal}
                ></label>
                <label row={1} col={0} text="Frais de livraison"></label>
                <label
                  row={1}
                  col={2}
                  textAlignment="left"
                  fontWeight="600"
                  marginLeft={20}
                  horizontalAlignment="right"
                  text={shippmentData.total || 100}
                ></label>
                <label row={2} col={0} text="Total TTC"></label>

                <label
                  row={2}
                  col={2}
                  textAlignment="left"
                  fontWeight="600"
                  marginLeft={20}
                  horizontalAlignment="right"
                  text={shippmentData.shipementPrice || 100}
                ></label>
              </gridLayout>
            ) : (
              <></>
            )}
          </stackLayout>
        </scrollView>
      </stackLayout>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.___white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.__default,
    padding: 20,
    marginTop: 20,
  },
  activecard: {
    backgroundColor: colors.__default,
    borderWidth: 3,
    borderColor: colors.___active,
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "700",
    marginTop: 30,
  },
  h2: {
    fontSize: 18,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
  },
  phone: {
    fontSize: 16,
    color: colors.__defaultText,
    fontWeight: "400",
  },
});
