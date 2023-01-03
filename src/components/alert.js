import React from "react";
import "./css/Alert.css";

export let contentChanger;
export let visibleMaker;
const Alert=()=>{
    const [NotificationContent,updateContent]=React.useState("Transaction Alert");
    const [visibility,updateVisibility] = React.useState("none")
    contentChanger=updateContent;
    visibleMaker=updateVisibility;
    return(
    <div className="alert-seq" style={{display:visibility}}>
        <div className="alert-content">
            <span>Better Notification!</span>
        <span>{NotificationContent}</span>
        <button onClick={()=>{
            updateVisibility("none");
        }}>Close</button>
        </div>
    </div>)
}

export default Alert