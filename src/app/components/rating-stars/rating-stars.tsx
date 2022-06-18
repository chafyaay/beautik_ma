import React, { useEffect, useState } from "react";

export const RatingStarsComponent = ({ rating, comments }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth((rating * 100) / 5);
  });

  return (
    <>
      <absoluteLayout marginTop={10} width={150} horizontalAlignment="left">
        <absoluteLayout left={0} top={0} col={0} borderWidth="0">
          <image
            verticalAlignment="middle"
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
      <label marginTop={10} textWrap>
        {comments?.length ? comments?.length + "Avis clients vérifiés" : ""}{" "}
      </label>
    </>
  );
};
