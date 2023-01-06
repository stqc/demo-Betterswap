import React from "react";
import "./css/Loading.css";
import loadingLogo from "./787.gif";

export let visibleMakerL;
const Loading=()=>{
    const [visibility,updateVisibility] = React.useState("none")

    visibleMakerL=updateVisibility;
    return(
    <div className="Load-seq" style={{display:visibility}}>
        <div className="Load-content">
            <span><img src={loadingLogo}/></span>
        <span>Loading..</span>
        </div>
    </div>)
}

export default Loading;