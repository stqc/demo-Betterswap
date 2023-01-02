import React from "react";
import {approveTX,createToken,USDAddress} from './source';

function CreateToken(){

    let tkname = React.createRef();
    let tkym = React.createRef();
    let tksup =React.createRef();

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
                await approveTX(USDAddress,"20","0x26C36ab5BD8fbd96Ca05146c163258c4D9EA97DC");
            }}>Approve USD</button>
            <button style={{margin: "0.5% 3% 2% 3%" }}
            onClick={()=>{
              createToken(tkname.current.value,tkym.current.value,tksup.current.value)
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
                        <li>Once the token is created head on over to Manage Token tab and create your pool to trade on BetterSwap!</li>
                    </ul>
                    <h3>You don't need to hire expensive developers anymore, BetterSwap has you covered!</h3>
                    <h4>NOTE: The total tax cannot exceed more than 30%</h4>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default CreateToken;