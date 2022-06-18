import {
  setString,
  getString,
  remove,
} from "@nativescript/core/application-settings";

export const removeItem = (key: string) => {
  try {
    remove(key);
  } catch (e) {}
};
export const setItem = (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    setString(key, jsonValue);
  } catch (e) {}
};

export const getItem = (key: string) => {
  try {
    const jsonValue = getString(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};
