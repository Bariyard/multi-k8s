import React from "react";
import { Link } from "react-router-dom";
function OtherPageComponent() {
  return (
    <div>
      Im some other page!
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default OtherPageComponent;
