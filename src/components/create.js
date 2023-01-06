import React from "react";
import {approveTX,createToken,USDAddress} from './source';

export var tkchange;

function CreateToken(){

    let tkname = React.createRef();
    let tkym = React.createRef();
    let tksup =React.createRef();
    const [apprtxt,changeapprtxt]=React.useState("Approve Token Creation Fee");
    const [show,updateShow] =React.useState("none");
    const [tkad,setTkad]=React.useState("0");
    tkchange=setTkad;
    return (
        <div className="trade-content">
      <div className="chart-content">
        <h2 style={{padding:"0.5% 2%",fontFamily: "Montserrat", fontStyle: "normal",fontWeight: "400", fontSize:"40px"}}>Create A Token</h2>
        <div className="amount" style={{ margin: '2%' }}>
          <input ref={tkname}style={{ width: '100%', fontSize: 'large' }} placeholder="Enter Token Name" min="0"></input>
        </div>
        <div className="amount" style={{ margin: '2%' }}>
          <input ref={tkym}style={{ width: '100%', fontSize: 'large' }} placeholder="Enter Token Symbol" min="0"></input>
        </div>
        <div className="amount" style={{ margin: '2%' }}>
          <input ref={tksup}style={{ width: '100%', fontSize: 'large' }} placeholder="Enter Token Supply" type="number" min="0"></input>
        </div>
            <button style={{margin: "3%" }} onClick={async ()=>{
                await approveTX(USDAddress,"20","0xbf7f0d539C0eD9B39d846b5cd15f86032f2D31DA");
                changeapprtxt("USD Fee Approved")
            }}>{apprtxt}</button>
            <button style={{margin: "0.5% 3% 2% 3%" }}
            onClick={async ()=>{
              await createToken(tkname.current.value,tkym.current.value,tksup.current.value)
              changeapprtxt("Approve Token Creation Fee")
              updateShow("initial")
            }}> Create Token</button>

        </div>
        <div className="swap-content">
            <div className="swp-main">
                <div className="info-table">
                    <h3>Creating your very own token has never been this easy!</h3>
                    <ul>
                        <li>Type in your desired token name</li>
                        <li>Type in your desired token symbol</li>
                        <li>Type in the supply for your token</li>
                        <li>Approve USD for a small fee of $20 and then create your token!</li>
                        <li>Once the token is created head on over to Manage Token tab. This is where you will set your Taxes and create your pool to trade on BetterSwap!</li>
                    </ul>
                </div>    
                <button style={{display:show}} onClick={()=>{
                  window.location.href="/manage?token="+tkad
                }}>Go to Manage Token</button>            
            </div>
        </div>
    </div>
    )
}

export default CreateToken;