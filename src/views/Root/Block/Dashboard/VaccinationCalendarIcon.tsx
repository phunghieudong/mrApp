import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const mainColor = "#fff";

const VaccinationCalendarIcon = () => {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_785"
            data-name="Rectangle 785"
            width="50"
            height="50"
            transform="translate(0.495 -0.505)"
            fill={mainColor}
            stroke="#707070"
            stroke-width="1"
          />
        </ClipPath>
      </Defs>
      <G
        id="Mask_Group_229"
        data-name="Mask Group 229"
        transform="translate(-0.495 0.505)"
        clip-path="url(#clip-path)"
      >
        <G
          id="baby-boy_1_"
          data-name="baby-boy (1)"
          transform="translate(0.495 1.858)"
        >
          <G id="Group_672" data-name="Group 672" transform="translate(0)">
            <Path
              id="Path_1318"
              data-name="Path 1318"
              d="M16.435,18.426a4.687,4.687,0,0,0-9.374,0H9.905a1.842,1.842,0,0,1,3.685,0Z"
              transform="translate(4.789 7.091)"
              fill={mainColor}
            />
            <Path
              id="Path_1319"
              data-name="Path 1319"
              d="M21.834,13.739a4.692,4.692,0,0,0-4.687,4.687h2.845a1.842,1.842,0,0,1,3.685,0h2.845a4.692,4.692,0,0,0-4.687-4.687Z"
              transform="translate(11.63 7.091)"
              fill={mainColor}
            />
            <Path
              id="Path_1320"
              data-name="Path 1320"
              d="M17.618,22.74a5.133,5.133,0,0,1-4.4-2.517l-2.45,1.446a7.951,7.951,0,0,0,13.7,0l-2.45-1.446A5.133,5.133,0,0,1,17.618,22.74Z"
              transform="translate(7.382 11.469)"
              fill={mainColor}
            />
            <Path
              id="Path_1321"
              data-name="Path 1321"
              d="M48.094,21.68a6.475,6.475,0,0,0-3.376-1.789A20.76,20.76,0,0,0,25,5.561h-.982a4.282,4.282,0,0,1-4.277-4.277h-2.93a7.168,7.168,0,0,0,1.411,4.277h-.928a4.282,4.282,0,0,1-4.277-4.277h-2.93a7.218,7.218,0,0,0,4.943,6.841A20.726,20.726,0,0,0,5.283,19.891a6.509,6.509,0,0,0,0,12.784,20.73,20.73,0,0,0,39.435,0A6.509,6.509,0,0,0,48.094,21.68ZM43.563,29.86l-1.1.021-.287,1.061a17.8,17.8,0,0,1-34.354,0L7.536,29.88l-1.1-.021A3.594,3.594,0,0,1,2.93,26.283a3.575,3.575,0,0,1,3.507-3.576l1.1-.021.287-1.062A17.819,17.819,0,0,1,25,8.49a4.8,4.8,0,1,1-4.8,4.8h-2.93A7.732,7.732,0,1,0,31.95,9.908,17.8,17.8,0,0,1,42.177,21.625l.287,1.062,1.1.021a3.577,3.577,0,0,1,0,7.153Z"
              transform="translate(0 -1.283)"
              fill={mainColor}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default VaccinationCalendarIcon;
