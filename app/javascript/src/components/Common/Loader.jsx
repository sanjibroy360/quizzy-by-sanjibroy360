import React, { useState } from "react";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#777");

  return (
    <div className="sweet-loading w-full justify-center self-center mt-24 flex space-x-8 text-lg">
      <FadeLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}
