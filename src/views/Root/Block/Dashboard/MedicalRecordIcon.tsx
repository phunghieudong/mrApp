import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const mainColor = "#fff";

const MedicalRecordIcon = () => {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_786"
            data-name="Rectangle 786"
            width="50"
            height="50"
            transform="translate(291 558)"
            fill={mainColor}
            stroke-width="1"
          />
        </ClipPath>
      </Defs>
      <G
        id="Mask_Group_231"
        data-name="Mask Group 231"
        transform="translate(-291 -558)"
        clip-path="url(#clip-path)"
      >
        <G id="cv_1_" data-name="cv (1)" transform="translate(295.688 558)">
          <Path
            id="Path_1323"
            data-name="Path 1323"
            d="M44.375,6.875A5.935,5.935,0,0,0,38.438.938H9.688A5.935,5.935,0,0,0,3.75,6.875V45a5.935,5.935,0,0,0,5.937,5.938h28.75A5.935,5.935,0,0,0,44.375,45ZM41.25,45a2.8,2.8,0,0,1-2.812,2.813H9.688A2.8,2.8,0,0,1,6.875,45V6.875A2.8,2.8,0,0,1,9.688,4.063h28.75A2.8,2.8,0,0,1,41.25,6.875Z"
            transform="translate(-3.75 -0.938)"
            fill={mainColor}
          />
          <Path
            id="Path_1324"
            data-name="Path 1324"
            d="M10.844,26H29.281a1.421,1.421,0,0,0,1.25-.625,1.215,1.215,0,0,0,.313-1.25A10.726,10.726,0,0,0,24.75,16a6.349,6.349,0,0,0,1.563-4.219,6.25,6.25,0,1,0-12.5,0A7.016,7.016,0,0,0,15.375,16a10.91,10.91,0,0,0-6.094,8.125,1.684,1.684,0,0,0,.312,1.25,1.421,1.421,0,0,0,1.25.625Zm6.094-14.063a3.125,3.125,0,1,1,3.125,3.125A3.134,3.134,0,0,1,16.937,11.937Zm3.125,6.25a7.9,7.9,0,0,1,7.188,4.688H12.875A7.9,7.9,0,0,1,20.062,18.188Z"
            transform="translate(-0.063 2.125)"
            fill={mainColor}
          />
          <Path
            id="Path_1325"
            data-name="Path 1325"
            d="M34.063,20.625h-25a1.563,1.563,0,0,0,0,3.125h25a1.563,1.563,0,0,0,0-3.125Z"
            transform="translate(-1.25 12.188)"
            fill={mainColor}
          />
          <Path
            id="Path_1326"
            data-name="Path 1326"
            d="M34.063,24.375h-25a1.563,1.563,0,0,0,0,3.125h25a1.563,1.563,0,0,0,0-3.125Z"
            transform="translate(-1.25 14.688)"
            fill={mainColor}
          />
        </G>
      </G>
    </Svg>
  );
};

export default MedicalRecordIcon;
