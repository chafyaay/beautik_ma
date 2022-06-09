import React, { useEffect, useState } from "react";
import { app_styles } from "../../utils/app_styles";

export const RatingStars = ({ data }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth((data.rating * 100) / 5);
  });

  return (
    <>
      <absoluteLayout marginTop={10} width={150} horizontalAlignment="left">
        <absoluteLayout left={0} top={0} col={0} borderWidth="0">
          <image
            left={0}
            top={0}
            width={150}
            src={"res://assets/stars1.png"}
          ></image>
        </absoluteLayout>

        <absoluteLayout left={0} top={0} width={width} borderWidth="0">
          <image
            left={0}
            top={0}
            width={150}
            src={"res://assets/stars2.png"}
          ></image>
        </absoluteLayout>
      </absoluteLayout>
      <label style={app_styles.link} marginTop={10} textWrap>
        {data?.comments?.length
          ? data?.comments?.length + "Avis clients vérifiés"
          : ""}{" "}
      </label>
    </>
  );
};
