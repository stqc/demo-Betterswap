import React from 'react';
import './css/nav.css';
import {
     NavLink
   } from "react-router-dom";
import { connectToWeb3,getPool, buildChart } from './source';
import logo from "./Xgczj6_2_.svg";
import TokenList from './searchOption';
export let updateFunc
export var scroll;
function Navbar() {
    
    const [currentDisplay,updateDisplay] = React.useState('none');
    const [TradeName,updateTrade] =React.useState('nav-options-selected');
    const [createName,updateCreate] =React.useState('nav-options');
    const [manageName,updateManage] =React.useState('nav-options');
    const [currentConnected,setConnected] =React.useState('Connect Wallet');
    const [scrollBar,updateScroll] = React.useState("none");
    let searchVal = React.createRef();
    scroll=updateScroll;
    updateFunc=setConnected;
  return (
    <nav>
      <a href="https://betterswap.fi" target="_blank"><div className="logo">
        <img height="50vh" src={logo} style={{float:"left"}}></img>
        BetterSwap
      </div></a>
      <div className={TradeName}><NavLink to="/" onClick={()=>{
      
            updateTrade('nav-options-selected')
            updateCreate('nav-options')
            updateManage('nav-options')
      
      }}>Trade</NavLink></div>
      <div className={createName}><NavLink  to="/create" onClick={()=>{

            updateTrade('nav-options')
            updateCreate('nav-options-selected')
            updateManage('nav-options')
          
      }}>Create A Token</NavLink></div>
      <div className={manageName}><NavLink to="/manage" onClick={()=>{
      
            updateTrade('nav-options')
            updateCreate('nav-options')
            updateManage('nav-options-selected')
          
      }}>Manage Token</NavLink></div>
      <div className="nav-options-btn" onClick={async()=>{
        await connectToWeb3();
      }}>{currentConnected}</div>
      <div className="search">
        <input placeholder="Enter Token Address" onClick={()=>{
          updateScroll("block")
        }} ref={searchVal}></input><button onClick={async()=>{
          updateScroll("none")
            await getPool(searchVal.current.value);
            await buildChart();
        }}>Search</button>
        <div className='dropDown' style={{position:"absolute",maxWidth:"1%", display:scrollBar}}>
          <TokenList changeScroll ={updateScroll} searc={searchVal}/>
        </div>
      </div>
      
      <div className="arrow" onClick={()=>{
        currentDisplay==='none'?updateDisplay("flex"):updateDisplay("none");
        document.getElementById("phone").style.display=currentDisplay
        
      }}>
      </div>
    </nav>
  );
}

export default Navbar;
