import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const PaymentOnlineIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_664"
            data-name="Rectangle 664"
            width="24"
            height="24"
            transform="translate(54 621)"
            fill="#219EBC"
            stroke="#707070"
            stroke-width="1"
          />
        </ClipPath>
      </Defs>
      <G
        id="Mask_Group_179"
        data-name="Mask Group 179"
        transform="translate(-54 -621)"
        clip-path="url(#clip-path)"
      >
        <G id="Layer_1" transform="translate(53.2 620.2)">
          <G id="Group_635" data-name="Group 635">
            <Path
              id="Path_1249"
              data-name="Path 1249"
              d="M21.76,4H3.84A3.039,3.039,0,0,0,.8,7.04V18.56A3.039,3.039,0,0,0,3.84,21.6H21.76a3.039,3.039,0,0,0,3.04-3.04V7.04A3.039,3.039,0,0,0,21.76,4ZM23.2,18.56A1.444,1.444,0,0,1,21.76,20H3.84A1.444,1.444,0,0,1,2.4,18.56V7.04A1.444,1.444,0,0,1,3.84,5.6H21.76A1.444,1.444,0,0,1,23.2,7.04Z"
              fill="#219EBC"
            />
            <Path
              id="Path_1250"
              data-name="Path 1250"
              d="M8,16.8H4.8a.8.8,0,0,0,0,1.6H8a.8.8,0,1,0,0-1.6Z"
              fill="#219EBC"
            />
            <Path
              id="Path_1251"
              data-name="Path 1251"
              d="M20.8,8H4.8a.8.8,0,1,0,0,1.6h16a.8.8,0,1,0,0-1.6Z"
              fill="#219EBC"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default PaymentOnlineIcon;
