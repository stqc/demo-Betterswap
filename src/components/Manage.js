import React from 'react';
import './css/body.css';
import './css/swap.css';
import './css/chart.css';
import { requestLiquidityRemoval,addLiquidity,approveTX, USDAddress,tokenAD,createPool} from './source';
import { useParams } from 'react-router-dom';
function Manage(props) {
  const [selected,changeSelected] = React.useState('Add Liquidity')
  const [currentBuyState,changeBuyState] = React.useState('buy-selected');
  const [currentSellState,changeSellState] = React.useState('sell');
  let usdAMT = React.createRef();
  let tokenAMT= React.createRef();
  let btx=React.createRef();
  let stx=React.createRef();
  let lp=React.createRef();

  return(
    <div className="trade-content">
      <div className="chart-content" style={{ padding: '2%' }}>
        <span style={{ fontSize: '20px', padding: '2%' }}>
          Following are the required methods necessary for pool creation
          <br />
          These methods can be updated after the creation of the pool
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
        <button style={{ margin: '3%' }} onClick={()=>{
          createPool(btx.current.value,stx.current.value,lp.current.value);
        }}>{props.tokenData.toke2usd===null?"Create Pool":"Update Pool"}</button>
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
              changeSelected('Request Liquidity Removal');
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
              <div id="supply">{props.tokenData.supply}</div>
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
                }}>{selected}</button>
        </div>
        </div>
        </div>
  ) 
}
    
    
    
    
export default Manage;