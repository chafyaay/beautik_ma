import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState, useEffect } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../components/NavigationParamList";
import { Icart } from "../../utils/props.interfaces";
import { getItem, LocalStorage } from "../../utils/storage";
import ProductCard from "../product-card";

type CartDetailsProps = {
  route: RouteProp<MainStackParamList, "CartDetails">;
  navigation: FrameNavigationProp<MainStackParamList, "CartDetails">;
};

export const CartDetails = ({ navigation }: CartDetailsProps) => {
  return (
    <flexboxLayout>
      <label>hello ....</label>
    </flexboxLayout>
  );
};
