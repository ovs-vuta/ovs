import React from "react";

function Button({ text, btnPrimary, btnOutline, btnTransparent }) {
  return <>
     {
        (btnPrimary || text) ? <><button style={btnPrimary}>{text}</button></> : ""
     }
  </>;
}

export default Button;
