import React from 'react';
import './css/nav.css';
import {
  Link
} from "react-router-dom";
import { connectToWeb3} from './source';
export let updateFuncPhone;
export var tradeselecp,createselectp,manageselectp;

function NavbarPhone() {
  const [TradeName,updateTrade] =React.useState('nav-options-selected-p');
    const [createName,updateCreate] =React.useState('nav-options-p');
    const [manageName,updateManage] =React.useState('nav-options-p');
    const [currentConnected,setConnected] =React.useState('Connect Wallet');
    tradeselecp=updateTrade;
    createselectp=updateCreate;
    manageselectp=updateManage
    updateFuncPhone=setConnected;
    let searchVal = React.createRef();
    

  return (
    <div className="nav-phone" id="phone">
      <div className={TradeName}><Link to="/" onClick={()=>{
            updateTrade('nav-options-selected-p')
            updateCreate('nav-options-p')
            updateManage('nav-options-p')
      }}>Trade</Link></div>
      <div className={createName}><Link to="/create" onClick={()=>{
            updateTrade('nav-options-p')
            updateCreate('nav-options-selected-p')
            updateManage('nav-options-p')
      }}>Create A Token</Link></div>
      <div className={manageName}><Link to="/manage" onClick={()=>{
            updateTrade('nav-options-p')
            updateCreate('nav-options-p')
            updateManage('nav-options-selected-p')
      }}>Manage Token</Link></div>
      <div className="nav-options-btn-p" onClick={async()=>{
        await connectToWeb3();
      }}>{currentConnected}</div>
    </div>
  );
}

export default NavbarPhone;
