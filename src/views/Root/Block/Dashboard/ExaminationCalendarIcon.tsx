import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const mainColor = "#fff";

const ExaminationCalendarIcon = () => {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_787"
            data-name="Rectangle 787"
            width="50"
            height="50"
            transform="translate(212 558)"
            fill={mainColor}
            strokeWidth="1"
          />
        </ClipPath>
      </Defs>
      <G
        id="Mask_Group_230"
        data-name="Mask Group 230"
        transform="translate(-212 -558)"
        clipPath="url(#clip-path)"
      >
        <G
          id="history_1_"
          data-name="history (1)"
          transform="translate(212 558)"
        >
          <Path
            id="Path_1322"
            data-name="Path 1322"
            d="M26.953,13.477V24.191l7.11,7.11A1.953,1.953,0,1,1,31.3,34.063l-7.682-7.682A1.953,1.953,0,0,1,23.047,25V13.477a1.953,1.953,0,0,1,3.906,0ZM32.682,0H17.318A17.258,17.258,0,0,0,5.962,4.246V1.953a1.953,1.953,0,0,0-3.906,0V9.635a1.958,1.958,0,0,0,1.953,1.953h7.682a1.953,1.953,0,0,0,0-3.906H8a13.457,13.457,0,0,1,9.321-3.776H32.682A13.427,13.427,0,0,1,46.094,17.318V32.682A13.427,13.427,0,0,1,32.682,46.094H17.318A13.427,13.427,0,0,1,3.906,32.682V25A1.953,1.953,0,0,0,0,25v7.682A17.337,17.337,0,0,0,17.318,50H32.682A17.337,17.337,0,0,0,50,32.682V17.318A17.337,17.337,0,0,0,32.682,0Z"
            fill={mainColor}
          />
        </G>
      </G>
    </Svg>
  );
};

export default ExaminationCalendarIcon;
