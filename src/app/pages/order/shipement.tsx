import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { StyleSheet } from "react-nativescript";
import { app_styles, colors } from "../../utils/app_styles";
import { Color, EventData, StackLayout, Switch } from "@nativescript/core";
import { getItem } from "../../utils/storage";

type ShipementScreenProps = {
  route: RouteProp<MainStackParamList, "ShipementScreen">;
  navigation: FrameNavigationProp<MainStackParamList, "ShipementScreen">;
};

export function ShipementScreen({ route, navigation }: ShipementScreenProps) {
  const [editAdress, setEditAdress] = React.useState(false);
  const [shippmenetMode, setShippmenetMode] = React.useState(0);
  const [paymentMode, setPaymentMode] = React.useState(0);
  const [shippingFee, setShippingFee] = React.useState(null);
  const [SubTotal, setSubTotal] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const cartDetails = getItem("cart") || [];

  const shippmentMode = [
    {
      id: 1,
      type: "adress",
      title: "Livraison à votre adresse",
      details: "Livré entre le 8 jeudi Juin 2022 et Samedi 19 Juin 2022",
    },
    {
      id: 2,
      type: "poste",
      title: "Envoi Postal à",
      details: "Livré entre le 8 jeudi Juin 2022 et Samedi 19 Juin 2022",
    },
  ];
  const payementModes = [
    {
      id: 1,
      type: "adress",
      title: "Paiement cash à la livraison",
      details: "Payez en espèces dès que vous recevez votre commande.      ",
    },
    {
      id: 2,
      type: "virment",
      title: "Virement Bancaire",
      details: "Notre compte bancaire 0193 1234 3330 6098 0198",
    },
    {
      id: 3,
      type: "Transfer",
      title: "Transfrer via une agence ",
      details:
        "Veuillez faire le dépôt au nom de BEAUTIK.MA sarl auprès d’une des agences Cash Plus ou Wafacash",
    },
  ];

  React.useEffect(() => {
    if (cartDetails) {
      getShippingFee();
      getSubTotal();
    }
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

  const getSubTotal = () => {
    const cart = getItem("cart");
    let s = 0;
    if (cart) {
      if (cart.length > 0) {
        cart.forEach((item: any) => {
          const price =
            item.data.discountedPrice < item.data.price
              ? item.data.discountedPrice
              : item.data.price;
          s += item.qnte * price;
        });
      }
    }
    setSubTotal(s);
  };

  const getShippingFee = () => {
    let s = 0;
    cartDetails.forEach((element: any) => {
      s += element.shippingFee;
    });
    setShippingFee(s);
  };

  const OnSelectShippingOption = (args: EventData, option: number) => {
    setShippmenetMode(option);
  };
  const OnSelectPayementOption = (args: EventData, option: number) => {
    setPaymentMode(option);
  };

  const renderCurrentpage = () => {
    let template = <></>;
    switch (currentPage) {
      case 1:
        template = (
          <>
            <label
              textWrap
              style={styles.title}
              text=" MODE DE LIVRAISON :"
            ></label>
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
                    backgroundColor={
                      shippmenetMode === mode.id && colors.__primary
                    }
                    horizontalAlignment="right"
                    checked={shippmenetMode === mode.id}
                  ></switch>

                  <label text={mode.title}></label>
                  <label textWrap>
                    <formattedString>
                      <span text={mode.details}></span>

                      <span
                        color={colors.___warning}
                        text="\nFrais de livraison : "
                      ></span>
                      <span text={shippingFee + "Dhs"}></span>
                      <span color={colors.___warning} text={mode.price}></span>
                    </formattedString>
                  </label>
                </stackLayout>
              );
            })}
          </>
        );
        break;

      case 2:
        template = (
          <>
            <label
              textWrap
              style={styles.title}
              text=" MODE DE PAIEMENT :"
            ></label>
            {payementModes.map((mode) => {
              return (
                <>
                  <stackLayout
                    key={mode.id}
                    onTap={($event) => OnSelectPayementOption($event, mode.id)}
                    style={{
                      ...styles.card,
                      ...(paymentMode === mode.id ? styles.activecard : null),
                    }}
                  >
                    <label text={mode.title}></label>
                    <label
                      marginTop={10}
                      borderColor={colors.___black}
                      textWrap
                      text={mode.details}
                    ></label>
                  </stackLayout>
                </>
              );
            })}
          </>
        );
        break;
      default:
        template = (
          <>
            <label text="ERREUR D'AFFICHAGE"></label>
          </>
        );
        break;
    }
    return template;
  };
  const onContinue = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <stackLayout height={"100%"}>
        <scrollView>
          <stackLayout padding="20">
            <label
              onTap={() => {
                navigation.reset({ index: 1, routes: [{ name: "Home" }] });
              }}
              text="back"
            ></label>
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

            {/*  ------  */}
            {renderCurrentpage()}
            {/* details */}

            {!!cartDetails && cartDetails.length > 0 ? (
              <gridLayout
                style={styles.card}
                rows="auto,auto,60"
                columns="auto,*,auto"
              >
                <label row={0} col={0} text="Sous-total"></label>
                <label
                  row={0}
                  col={2}
                  textAlignment="left"
                  fontWeight="300"
                  marginLeft={20}
                  horizontalAlignment="right"
                  text={SubTotal + " DHS" || "NULL"}
                ></label>
                <label row={1} col={0} text="Frais de livraison"></label>
                <label
                  row={1}
                  col={2}
                  textAlignment="left"
                  fontWeight="300"
                  marginLeft={20}
                  horizontalAlignment="right"
                  text={shippingFee + " Dhs"}
                ></label>

                <label
                  marginTop={10}
                  borderTopWidth={1}
                  borderColor={colors.__default}
                  row={2}
                  col={0}
                  text="Total TTC"
                ></label>

                <label
                  textAlignment="right"
                  marginTop={10}
                  borderTopWidth={1}
                  borderColor={colors.__default}
                  colSpan={2}
                  row={2}
                  col={1}
                  fontWeight="600"
                  marginLeft={20}
                  text={SubTotal + shippingFee + "DHS"}
                ></label>
              </gridLayout>
            ) : (
              <></>
            )}

            {currentPage === 1 ? (
              <button
                onTap={() => onContinue()}
                margin={0}
                marginTop={20}
                text={"continue"}
                backgroundColor={shippmenetMode !== 0 && colors.__primary}
                style={app_styles.btn}
                isEnabled={shippmenetMode !== 0}
              ></button>
            ) : (
              <>
                <flexboxLayout
                  flexDirection="row"
                  justifyContent="space-between"
                  flexWrap="nowrap"
                >
                  <button
                    flexGrow={1}
                    onTap={() => {
                      setCurrentPage(1);
                    }}
                    style={app_styles.btn}
                    marginTop={20}
                    marginRight={10}
                    text={"livraison"}
                  ></button>

                  <button
                    flexGrow={2}
                    onTap={() => {
                      navigation.reset({
                        index: 1,
                        routes: [{ name: "OrderDetailsScreen" }],
                      });
                    }}
                    marginTop={20}
                    marginLeft={10}
                    text={"payer"}
                    backgroundColor={paymentMode !== 0 && colors.__primary}
                    style={app_styles.btn}
                    isEnabled={paymentMode !== 0}
                  ></button>
                </flexboxLayout>
              </>
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
    backgroundColor: colors.___lightGray,
    borderWidth: 3,
    borderColor: colors.__primary,
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
