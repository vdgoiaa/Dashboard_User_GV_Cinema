import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={{textAlign:"center",marginTop:"350px",height:"100vh"}}>
      <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};
export default Loading;
