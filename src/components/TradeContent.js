import React from 'react';
import './css/body.css';
import './css/swap.css';
import './css/chart.css';
import {sellToken,buyToken,approveTX,USDAddress,tokenAD,changeFrame, buildChart} from "./source"

function TradeContent(props) {
  const [selected,changeSelected] = React.useState('Buy')
  const [currentBuyState,changeBuyState] = React.useState('buy-selected');
  const [currentSellState,changeSellState] = React.useState('sell');
  const [currentTimeFrame,updateTimeFrame] =React.useState('D');
  let amount = React.createRef();
  React.useEffect(()=>{
    if(tokenAD){
      buildChart();
    }
  },[])
  return (
    <div className="trade-content">
      <div className="chart-content">
        <div className="time-switch">
          <h2>{props.tokenData.name}</h2>
          <div className="time-selector">
            <div className={currentTimeFrame==="M"?"time-opt-selected":"time-opt"} onClick={()=>{
              updateTimeFrame("M");
              changeFrame("M")
            }}>1M</div>
            <div className={currentTimeFrame==="H"?"time-opt-selected":"time-opt"} onClick={()=>{
              updateTimeFrame("H");
              changeFrame("H")
            }}>1H</div>
            <div className={currentTimeFrame==="D"?"time-opt-selected":"time-opt"} onClick={()=>{
              updateTimeFrame("D");
              changeFrame("D")
            }}>1D</div>
          </div>
        </div>
        <div className="chart" id="chrt">

        </div>

      </div>
      <div className="swap-content">
        <div className="swp-main">
          <div className="buy-sell">
            <div className={currentBuyState} onClick={()=>{
              changeSelected('Buy');
              changeBuyState('buy-selected');
              changeSellState('sell');
            }}>
              Buy
            </div>
            <div className={currentSellState} onClick={()=>{
              changeSelected('Sell');
              changeBuyState('buy');
              changeSellState('sell-selected');
            }}>
              Sell
            </div>
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
          <div className="amount">
            <input style={{ width: '100%', fontSize: 'large' }} ref={amount} placeholder="Enter Amount" type="number" min="0"></input>
            <p id="bal">Balance: {selected==="Buy"?props.currentUSDBal:props.currentTokenBal}</p>
          </div>
          <button onClick={ async()=>{
            selected==="Buy"? await approveTX(USDAddress,amount.current.value,props.tokenData.Address):await approveTX(tokenAD,amount.current.value,props.tokenData.Address)
          }}>Approve</button>
          <button onClick={ async()=>{
            selected==="Buy"? await buyToken(amount.current.value):await sellToken(amount.current.value)
          }}>{selected}</button>
        </div>
      </div>
    </div>
  );
}

export default TradeContent;
