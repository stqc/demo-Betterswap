import React from "react";
import data from "./data.json";
import "./css/nav.css";
import { getPool,buildChart } from "./source";

export default function TokenList (props){
   var keys= Object.keys(data);   
    return (
        <div className="list-content">
            { 
                keys.map((element) => {
                    return (<div key={element} onClick={()=>{
                        props.changeScroll("none");
                        props.searc.current.value=element;
                        getPool(element);
                        buildChart();

                    }}>
                    <div className="token-Name">
                            {data[element]}
                    </div>
                    <div className="token-address">
                        {element.slice(0,20)+"..."}
                    </div>
                    </div>)
                })
            } 
        </div>
    )
}