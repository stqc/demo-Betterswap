import React from "react";
import "./css/Alert.css";

export let contentChanger;
export let visibleMaker;
const Alert=()=>{
    const [NotificationContent,updateContent]=React.useState("Transaction Alert");
    const [visibility,updateVisibility] = React.useState("none")
    contentChanger=updateContent;
    visibleMaker=updateVisibility;
    React.useEffect(()=>{
        setTimeout(()=>{
            updateVisibility("none")
        },5000)
    },)
    return(
    <div className="alert-seq" style={{display:visibility}}>
        <div className="alert-content">
                    <span>{NotificationContent}</span>
        </div>
    </div>)
}

export default Alert