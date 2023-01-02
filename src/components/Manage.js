import React from 'react';
import './css/body.css';
import './css/swap.css';
import './css/chart.css';
import { requestLiquidityRemoval,addLiquidity,approveTX, USDAddress,tokenAD,createPool,updatePoolTax,voteNo,voteYes} from './source';

export let updateYes;
export let updateNo;

function Manage(props) {
  const [selected,changeSelected] = React.useState('Add Liquidity')
  const [currentBuyState,changeBuyState] = React.useState('buy-selected');
  const [currentSellState,changeSellState] = React.useState('sell');
  const [yesVotes,updateYesvotes] = React.useState(0);
  const [noVotes,updateNoVotes] = React.useState(0);

  let usdAMT = React.createRef();
  let tokenAMT= React.createRef();
  let btx=React.createRef();
  let stx=React.createRef();
  let lp=React.createRef();
  let thresh=React.createRef();
  updateNo=updateNoVotes;
  updateYes=updateYesvotes;

  return(
    <div className="trade-content">
      <div className="chart-content" style={{ padding: '2%' }}>
        {props.tokenData.trading?<>
        <span style={{ fontSize: '20px', padding: '2%' }}>
          Following are the required methods necessary for pool creation
          <br />
          These methods can be updated after the creation of the pool
          <br/> <h5>Incase of creating a new pool please search for your token by pasting the token address in the search bar from the menu<br/>Once the pool is created go ahead and add the liquidity as required</h5>
        </span>
        <div className="amount" style={{ margin: '2%' }}>
          <input
            style={{ width: '100%', fontSize: 'large' }}
            placeholder="Enter Buy Tax (type 0 for none)"
            type="number"
            min="0" ref={btx}
          />
        </div>
        <div className="amount" style={{ margin: '2%' }}>
          <input
            style={{ width: '100%', fontSize: 'large' }}
            placeholder="Enter Sell Tax (type 0 for none)"
            type="number"
            min="0" ref={stx}
          />
        </div>
        <div className="amount" style={{ margin: '2%' }}>
          <input ref={lp}
            style={{ width: '100%', fontSize: 'large' }}
            placeholder="Enter AutoLP Tax (type 0 for none)"
            type="number"
            min="0"
          /> 
        </div>
        <div className="amount" style={{ margin: '2%' }}>
          <input ref={thresh}
            style={{ width: '100%', fontSize: 'large' }}
            placeholder="Enter Threshold to obtain a DAO token"
            type="number"
            min="0"
          /> 
        </div>
        <button style={{ margin: '3%' }} onClick={()=>{
          props.tokenData.Address==="0x0000000000000000000000000000000000000000"?createPool(btx.current.value,stx.current.value,lp.current.value,thresh.current.value):updatePoolTax(btx.current.value,stx.current.value,lp.current.value);
        }}>{props.tokenData.Address==="0x0000000000000000000000000000000000000000"?"Create Pool":"Update Pool"}</button></>:
        <><span style={{ fontSize: '20px', padding: '2%' }}>
        Trading has been disabled for liquidity removal vote,
        <br />
        If you happen to hold DAO token for this project please cast your vote below..
        <br/><br/>NOTE: You can only vote once
        <br/><br/>Current Votes in Favour: {yesVotes}
        <br/><br/>Current Votes Against: {noVotes}
      </span>
        <button onClick={()=>{
          voteYes();
        }}style={{margin:"2%"}}>Vote in Favour</button>
        <button onClick={()=>{
          voteNo();
        }}style={{margin:"2%"}}>Vote Against</button>
        </>
        }
      </div>
      <div className="swap-content">
        <div className="swp-main">
          <div className="buy-sell">
            <div className={currentBuyState} onClick={()=>{
              changeSelected('Add Liquidity');
              changeBuyState('buy-selected');
              changeSellState('sell');
            }}>Add Liquidity</div>
            <div className={currentSellState} onClick={()=>{
              changeSelected('Request Liquidity Removal Vote');
              changeBuyState('buy');
              changeSellState('sell-selected');
            }}>Remove Liquidity</div>
          </div>
          <div className="info-table">
          <div>
              <div>Token Name:</div>
              <div id="name">{props.tokenData.name}</div>
            </div>
            <div>
              <div>Supply:</div>
              <div id="supply" style={{overflow:"hidden"}}>{props.tokenData.supply}</div>
            </div>
            <div>
              <div>Token/USD:</div>
              <div id="token2usd">{props.tokenData.token2usd}</div>
            </div>
            <div>
              <div>USD/Token:</div>
              <div id="usd2token">{props.tokenData.usd2token}</div>
            </div>
            <div>
              <div>Buy Tax:</div>
              <div id="buytax">{props.tokenData.buytax}</div>
            </div>
            <div>
              <div>Sell Tax:</div>
              <div id="selltax">{props.tokenData.saletax}</div>
            </div>
            <div>
              <div>USD in Pool:</div>
              <div id="usdin">{props.tokenData.usdinpool}</div>
            </div>
            <div>
              <div>Token in Pool:</div>
              <div id="tokenin">{props.tokenData.tokeninpool}</div>
            </div>
          </div>
          
                { selected==="Add Liquidity" &&
                  <>
                    <div className="amount">
                        <input ref={usdAMT}style={{width: "100%", fontSize: "large", paddingTop:"0.5%"}} placeholder="Enter USD Amount" type="number" min="0"></input>
                        <p id="bal">Balance: {props.currentUSDBal}</p>
                    </div>
                    <div className="amount">
                        <input ref={tokenAMT}style={{width: "100%", fontSize: "large"}} placeholder="Enter Token Amount" type="number" min="0"></input>
					              <p id="bal">Balance: {props.currentTokenBal}</p>
                    </div>
                    <button onClick={()=>{
                      approveTX(USDAddress,usdAMT.current.value,props.tokenData.Address);
                    }}>Approve USD</button>
                    <button onClick={()=>{
                      approveTX(tokenAD,tokenAMT.current.value,props.tokenData.Address);
                    }}>Approve Token</button>
                  </>
                }
                <button onClick={()=>{
                    selected==="Add Liquidity"?addLiquidity(usdAMT.current.value,tokenAMT.current.value):requestLiquidityRemoval();
                }}>{props.tokenData.trading?selected:"Remove Liquidity"}</button>
        </div>
        </div>
        </div>
  ) 
}
    
    
    
    
export default Manage;