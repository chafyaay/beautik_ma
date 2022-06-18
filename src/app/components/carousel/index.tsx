import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-nativescript";
import { colors } from "../../utils/app_styles";
export function Carousel({ item }) {
  const [coverIndex, setCoverIndex] = useState(0);
  const defaultImg = "res://assets/offline-image.png";

  useEffect(() => {
    console.log("============== ******** ======================");
    console.log(item);
    console.log("====================================");
  });

  const initCarousel = () => {};

  const render = () => {
    try {
      if (item) {
        console.log(item.imagesUrls);

        return (
          <>
            <image
              marginTop={20}
              width={"100%"}
              height={300}
              src={item.imagesUrls[coverIndex] || defaultImg}
            ></image>

            <scrollView
              orientation="horizontal"
              scrollBarIndicatorVisible={false}
            >
              <flexboxLayout
                height={100}
                flexDirection="row"
                justifyContent="center"
                flexWrap="wrap"
                marginTop={30}
              >
                {item.imagesUrls.map((image, index) => {
                  return (
                    <image
                      flexGrow={1}
                      width={100}
                      src={image || defaultImg}
                      margin={5}
                      borderRadius={5}
                      style={
                        coverIndex === index
                          ? styles.selected
                          : styles.thumbnails
                      }
                      onTap={() => {
                        setCoverIndex(index);
                      }}
                    ></image>
                  );
                })}
              </flexboxLayout>
            </scrollView>
          </>
        );
      } else <></>;
    } catch (error) {
      return <label color={colors.___danger} textWrap text={error}></label>;
    }
  };
  return render();
}

const styles = StyleSheet.create({
  thumbnails: {
    borderWidth: 3,
    borderColor: colors.__default,
  },
  selected: {
    borderWidth: 3,
    borderColor: colors.__primary,
  },
});
