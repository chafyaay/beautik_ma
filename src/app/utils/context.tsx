import { createContext } from "react";
import { Icart } from "./props.interfaces";
const cart: Icart[] = [];

export const AppContext = createContext("") as any;
export const btnContext = createContext("") as any;
export const prdIdContext = createContext(0) as any;
export const NavBarContext = createContext("") as any;
export const ModalContext = createContext("") as any;
export const NotificationContext = createContext("") as any;
export const CartContext = createContext("") as any;
