import React from "react";

export default function TaxInput(props){

    return(
        
    <div className="amount" style={{ margin: '2%' }}>
        <input style={{ width: '100%', fontSize: 'large' }} placeholder="Enter Tax Value" type="number" min="0" ref={props.reff}></input>
        <input style={{ width: '100%', fontSize: 'large' }} placeholder="Enter Receiving Wallet" min="0" ref={props.reffWal}></input>
    </div>
  )
}