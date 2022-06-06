import * as React from "react";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";

const snackbar = new SnackBar();

export const SnackBarTest = React.forwardRef((props, ref: any) => {
  function showSimpleSnackbar() {
    const view = ref.current?.nativeView;

    snackbar
      .action({
        actionText: `I'm a simple snackbar`,
        message: "This is a snack",
        view,
      })
      .then((result) => console.log("Simple Snackbar:", result));
  }

  return <button text="Show Snack" onTap={showSimpleSnackbar} />;
});
